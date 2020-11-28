import { Moment } from "moment";

export interface ReminderData {
    id: string
    content: string
    datetime: Moment
    color: string 
    city: string
    forecast?: WeatherData
}

export interface ReminderMap {
    [dayOfMonth: string]: ReminderData[]

}

export interface WeatherData {
    city: string
    icon: string
    condition: string
    maxTemp: number
    minTemp: number
}