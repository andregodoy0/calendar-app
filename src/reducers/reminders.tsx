import { RemindersActions } from "actions/reminders"
import { Reminder } from "types/reminders"

interface _RemindersState {
    reminderList: Reminder[]
}

export type RemindersState = Readonly<_RemindersState>

const initialState: RemindersState = {
    reminderList: [],
}

export default function reminders(state: RemindersState = initialState, action: RemindersActions): RemindersState {
    switch (action.type) {
        case 'addReminder':
            return {
                reminderList: [
                    ...state.reminderList,
                    action.reminder
                ]
            }
        default:
            return state
    }
}
