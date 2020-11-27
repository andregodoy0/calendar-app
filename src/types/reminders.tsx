export interface ReminderData {
    id: string
    content: string
    time: string
    color: string 
    city: string
}

export interface ReminderMap {
    [dayOfMonth: string]: ReminderData[]

}