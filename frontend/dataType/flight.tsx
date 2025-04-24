
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
    altID: string;
    tripID: string;
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: string;
    changeFee: number;
    isRecommended: boolean;
    meetingConflicts: number;
    riskLevel: string;
    departure: string;
    arrival: string;
    seat: string;
    layover: number;
}