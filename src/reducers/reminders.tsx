import _ from 'lodash'
import { RemindersActions } from "actions/reminders"
import { ReminderMap } from "types/reminders"

interface _RemindersState {
    reminderList: ReminderMap
}

export type RemindersState = Readonly<_RemindersState>

const initialState: RemindersState = {
    reminderList: {},
}

export default function reminders(state: RemindersState = initialState, action: RemindersActions): RemindersState {
    switch (action.type) {
        case 'addReminder': {
            const remindersForDay = [...(state.reminderList[action.dayOfMonth.format('YYYYMMDD')] || [])]
            if (remindersForDay.length) {
                const index = _.sortedIndexBy(remindersForDay, action.reminder, reminder => reminder.time)
                remindersForDay.splice(index, 0, action.reminder)
            } else {
                remindersForDay.push(action.reminder)
            }
            return {
                reminderList: {
                    ...state.reminderList,
                    [action.dayOfMonth.format('YYYYMMDD')]: remindersForDay
                }
            }
        }
        case 'updateReminder': {
            const remindersForDay = [...state.reminderList[action.dayOfMonth.format('YYYYMMDD')]]
            const index = _.findIndex(remindersForDay, {id: action.reminder.id})
            remindersForDay.splice(index, 1, {
                ...action.reminder,
                forecast: action.forecast,
                // create new id to force new render
                id: _.uniqueId('reminder')
            })
            return {
                reminderList: {
                    ...state.reminderList,
                    [action.dayOfMonth.format('YYYYMMDD')]: remindersForDay
                }
            }
        }
        default:
            return state
    }
}
