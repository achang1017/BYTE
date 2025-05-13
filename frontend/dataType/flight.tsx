export type FlightInfo = {
    date: string;
    flightNumber: string;
    gate: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    status: string;
};

export type AltFlightInfo = {
    flightNumber: string;
    departureTime: String;
    arrivalTime: String;
    duration: string;
    changeFee: number;
    isRecommended: boolean;
    meetingConflicts: number;
    departure: string;
    arrival: string;
    seat: string;
    layover: number;
}