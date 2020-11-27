export interface Reminder {
    reminder: string
    time: string
    color: string 
    city: string
}

export interface ReminderMap {
    [dayOfMonth: string]: Reminder[]

}