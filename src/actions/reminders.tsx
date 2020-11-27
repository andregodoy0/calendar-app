import moment, { Moment } from "moment"
import { Dispatch } from "reducers"
import { API_KEY, API_MAXIMUM_FORECAST } from "utils"
import { ReminderData } from "types/reminders"


export function addReminder(dayOfMonth: Moment, reminder: ReminderData) {
    return {
        type: 'addReminder' as 'addReminder',
        dayOfMonth,
        reminder,
    }
}

export function updateReminder(dayOfMonth: Moment, reminder: ReminderData) {
    return {
        type: 'updateReminder' as 'updateReminder',
        dayOfMonth,
        reminder,
    }
}

export function receiveWeatherForecast(dayOfMonth: Moment, reminder: ReminderData, forecast: any) {
    return {
        type: 'receiveWeatherForecast' as 'receiveWeatherForecast',
        dayOfMonth,
        reminder,
        forecast,
    }
}

export type RemindersActions = (
    ReturnType<typeof addReminder> |
    ReturnType<typeof updateReminder> |
    ReturnType<typeof receiveWeatherForecast>
)

export const fetchWeatherForecast = (dayOfMonth: Moment, reminderData: ReminderData) => {
    return async (dispatch: Dispatch) => {
        const forecastDays = dayOfMonth.startOf('day').diff(moment().startOf('day'), 'days')
        console.log(API_KEY, API_MAXIMUM_FORECAST, forecastDays)
        if (!API_KEY || !reminderData.city || forecastDays < 0 || forecastDays >= API_MAXIMUM_FORECAST) {
            return
        }
        try {
            const forecast = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${reminderData.city}&days=${forecastDays}`,
                { method: 'GET' },
            )
            console.log(forecast)
            dispatch(receiveWeatherForecast(dayOfMonth, reminderData, forecast))
        } catch (error) {
            console.log('Could not get forecast', error)
        }
    }
}
