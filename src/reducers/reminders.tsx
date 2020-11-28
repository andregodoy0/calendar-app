import _ from 'lodash'
import { RemindersActions } from "actions/reminders"
import { ReminderMap, ReminderData } from "types/reminders"

interface _RemindersState {
    reminderList: ReminderMap
}

export type RemindersState = Readonly<_RemindersState>

const initialState: RemindersState = {
    reminderList: {},
}

const addReminder = (remindersForDay: ReminderData[], reminder: ReminderData) => {
    if (remindersForDay.length) {
        const index = _.sortedIndexBy(remindersForDay, reminder, reminder => reminder.datetime.unix())
        remindersForDay.splice(index, 0, reminder)
    } else {
        remindersForDay.push(reminder)
    }
    return remindersForDay
}

export default function reminders(state: RemindersState = initialState, action: RemindersActions): RemindersState {
    switch (action.type) {
        case 'addReminder': {
            const remindersForDay = [...(state.reminderList[action.dayOfMonth.format('YYYYMMDD')] || [])]
            return {
                reminderList: {
                    ...state.reminderList,
                    [action.dayOfMonth.format('YYYYMMDD')]: addReminder(remindersForDay, action.reminder)
                }
            }
        }
        case 'updateReminder': {
            const remindersForDay = [...(state.reminderList[action.reminder.datetime.format('YYYYMMDD')] || [])]
            const index = _.findIndex(remindersForDay, { id: action.reminder.id })
            if (index < 0) {
                // reminder has moved to another day, remove original
                const remindersForOriginalDay = [...(state.reminderList[action.dayOfMonth.format('YYYYMMDD')] || [])]
                const originalIndex = _.findIndex(remindersForDay, { id: action.reminder.id })
                remindersForOriginalDay.splice(originalIndex, 1)
                return {
                    reminderList: {
                        ...state.reminderList,
                        [action.dayOfMonth.format('YYYYMMDD')]: remindersForOriginalDay,
                        [action.reminder.datetime.format('YYYYMMDD')]: addReminder(remindersForDay, action.reminder),
                    }
                }
            }
            // Remove old
            remindersForDay.splice(index, 1)
            const updateReminder: ReminderData = {
                ...action.reminder,
                forecast: action.forecast,
                // create new id to force new render
                id: _.uniqueId('reminder')
            }
            return {
                reminderList: {
                    ...state.reminderList,
                    [action.dayOfMonth.format('YYYYMMDD')]: addReminder(remindersForDay, updateReminder)
                }
            }
        }
        default:
            return state
    }
}
