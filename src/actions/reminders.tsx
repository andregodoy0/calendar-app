import { Moment } from "moment"
import { Reminder } from "types/reminders"


export function addReminder(dayOfMonth: Moment, reminder: Reminder) {
    return {
        type: 'addReminder' as 'addReminder',
        dayOfMonth,
        reminder,
    }
}

export type RemindersActions = 
    ReturnType<typeof addReminder>