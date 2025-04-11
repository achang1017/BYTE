import { FlightInfo } from './flight';

export enum AlertType {
    FlightInteruption = 'Flight Interruption',
    MeetingConflict = 'Meeting Conflict'
}


export type Alert = {
    id: number;
    type: AlertType;
    flightInfo: FlightInfo | null;
};