import { combineReducers } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { RemindersActions } from 'actions/reminders'

import reminders, { RemindersState } from 'reducers/reminders'

export interface State {
    reminders: RemindersState
}

type AppState = Readonly<ReturnType<typeof reminders>>

type AppActions = RemindersActions

export type Dispatch = ThunkDispatch<AppState, {}, AppActions>

const rootReducer = combineReducers({
    reminders,
})

export default rootReducer