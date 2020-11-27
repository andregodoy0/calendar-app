import { Moment } from "moment"
import { ReminderData } from "types/reminders"


export function addReminder(dayOfMonth: Moment, reminder: ReminderData) {
    return {
        type: 'addReminder' as 'addReminder',
        dayOfMonth,
        reminder,
    }
}

export type RemindersActions = 
    ReturnType<typeof addReminder>