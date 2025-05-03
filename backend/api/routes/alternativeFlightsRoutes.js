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
        if (!rawFlightInfo) {
            return res.status(400).json({ error: 'Missing flightInfo' });
        }
        const flightInfo = JSON.parse(rawFlightInfo);
        //if (data not in db) { // need to edit
            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });
    
            const response = await openai.responses.create({
                model: "gpt-4o",
                tools: [{ type: "web_search_preview" }],
                input:`Find 5 upcoming flights with prices and flight classes from ${flightInfo.departure} to ${flightInfo.arrival} that depart around ${flightInfo.departureTime}. Time should follow ISO format and duration should #h #m format.`,
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
            console.log(altFlights.flights);
            // put the response in db
        //}
        // return array of alt flights 
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to fetch alternative flight lists' });
    }
});

module.exports = router;