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
        if (!rawFlightInfo) {
            return res.status(400).json({ error: 'Missing flightInfo' });
        }
        if (!userEmail) {
            return res.status(400).json({ error: 'Missing user email' });
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

        let prompt = `Generate a list of at least 5 upcoming flights from ${flightInfo.departure} to ${flightInfo.arrival}. Include details such as airline, flight number, departure and arrival times (ISO format), duration (e.g., 2h 30m), price, seat class, and layover time. Ensure the data is accurate and formatted as JSON.`;
        if (preferredClass) {
            prompt += ` At least 2 flights must be ${preferredClass} class if available. Only include flights with class: ${preferredClass} if possible.`;
        }
        console.log('Final OpenAI prompt:', prompt);

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

        // Store the response in Firestore
        const batch = db.batch();
        altFlights.flights.forEach((flight) => {
            const flightRef = db.collection('alternativeFlights').doc(flight.flightNumber);
            batch.set(flightRef, flight);
        });
        await batch.commit();

        res.status(200).json(altFlights.flights);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to fetch alternative flight lists' });
    }
});

module.exports = router;