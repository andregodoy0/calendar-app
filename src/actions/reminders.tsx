import { Reminder } from "types/reminders"


export function addReminder(reminder: Reminder) {
    return {
        type: 'addReminder' as 'addReminder',
        reminder,
    }
}

export type RemindersActions = 
    ReturnType<typeof addReminder>