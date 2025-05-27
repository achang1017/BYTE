const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const { OpenAI } = require('openai');
const router = express.Router();
require('dotenv').config();

const ALT_FLIGHTS_SCHEMA = {
    type: "object",
    properties: {
        flights: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    airline: { type: "string"},
                    flightNumber: { type: "string" },
                    departureTime: { type: "string" },
                    arrivalTime: { type: "string" },
                    duration: { type: "string" },
                    price: { type: "number" },
                    departure: { type: "string" },
                    arrival: { type: "string" },
                    seat: { type: "string" },
                    layover: { type: "number" },
                    isLayover: { type: "boolean" },
                    isStopover: { type: "boolean" },
                },
                required: [
                    "airline",
                    "flightNumber",
                    "departureTime",
                    "arrivalTime",
                    "duration",
                    "price",
                    "departure",
                    "arrival",
                    "seat",
                    "layover",
                    "isLayover",
                    "isStopover",
                ],
                additionalProperties: false,
            }
        }
    },
    required: ["flights"],
    additionalProperties: false,
};

router.get('/', async (req, res) => {
    try {
        const rawFlightInfo = req.query.flightInfo;
        const userEmail = req.query.email; 
        const accessToken = req.query.accessToken;

        if (!rawFlightInfo) {
            return res.status(400).json({ error: 'Missing flightInfo' });
        }
        if (!userEmail) {
            return res.status(400).json({ error: 'Missing user email' });
        }
        if (!accessToken) {
            return res.status(400).json({ error: 'Missing Google access token' });
        }
        const flightInfo = JSON.parse(rawFlightInfo);

        let preferredClass = undefined;
        try {
            const userDoc = await db.collection('users').doc(userEmail).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData && userData.preferences && userData.preferences.preferredClass) {
                    preferredClass = userData.preferences.preferredClass;
                }
            }
        } catch (err) {
            console.error('Error fetching user preferences:', err);
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });


        let prompt = `Find a list of flights from real flight apis for at least 5 upcoming flights from ${flightInfo.departure} to ${flightInfo.arrival}. Include details such as airline, flight number, departure and arrival times (ISO format), duration (e.g., 2h 30m), price, seat class, layover time, and two boolean fields: isLayover (true if the flight has a layover, false otherwise) and isStopover (true if the flight has a stopover, false otherwise). Ensure the data is accurate and formatted as JSON.`;
        if (preferredClass) {
            prompt += ` At least 2 flights must be ${preferredClass} class if available. Only include flights with class: ${preferredClass} if possible.`;
        }
        if (typeof flightInfo.isLayover === 'boolean' && flightInfo.isLayover === true) {
            prompt += ` Only include flights where isLayover is false (i.e., direct flights with no layover).`;
        }

        const response = await openai.responses.create({
            model: "gpt-4o",
            tools: [{ type: "web_search_preview" }],
            input: prompt,
            text: {
                "format": {
                    "type": "json_schema",
                    "name": "alternativeFlights",
                    "schema": ALT_FLIGHTS_SCHEMA,
                    "strict": true
                }
            },
        });

        const altFlights = JSON.parse(response.output_text);

        // Filter flights based on layover preference: show only flights without layovers if isLayover is true
        let filteredFlights = altFlights.flights;
        if (typeof flightInfo.isLayover === 'boolean' && flightInfo.isLayover === true) {
            filteredFlights = altFlights.flights.filter(flight => !flight.isLayover && (!flight.layover || flight.layover === 0));
        }

        const checkConflicts = async (flight) => {
            const departureISO = new Date(flight.departureTime).toISOString();
            const arrivalISO = new Date(flight.arrivalTime).toISOString();
            const calendarRes = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${departureISO}&timeMax=${arrivalISO}&singleEvents=true`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await calendarRes.json();
            return (data.items && Array.isArray(data.items)) ? data.items.length : 0;
        };

        const flightsWithConflicts = await Promise.all(filteredFlights.map(async (flight) => {
            const conflicts = await checkConflicts(flight);
            return { ...flight, meetingConflicts: conflicts };
        }));

        res.status(200).json(flightsWithConflicts);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to fetch alternative flight lists' });
    }
});

module.exports = router;