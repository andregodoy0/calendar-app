import moment, { Moment } from "moment"
import { Dispatch } from "reducers"
import { API_KEY, API_MAXIMUM_FORECAST } from "utils"
import { ReminderData, WeatherData } from "types/reminders"


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

export function receiveWeatherForecast(dayOfMonth: Moment, reminder: ReminderData, forecast: WeatherData) {
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
        if (!API_KEY || !reminderData.city || forecastDays < 0 || forecastDays >= API_MAXIMUM_FORECAST) {
            return
        }
        try {
            // Inner await is for headers, second for actual body
            const response: any = await (await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${reminderData.city}&days=${forecastDays}`,
                { method: 'GET' }
            )).json()
            const forecast = response.forecast.forecastday[forecastDays-1].day
            const data: WeatherData = {
                city: response.location.name,
                icon: forecast.condition.icon,
                condition: forecast.condition.text,
                maxTemp: forecast.maxtemp_c,
                minTemp: forecast.mintemp_c,
            }
            console.log(forecast)
            dispatch(receiveWeatherForecast(dayOfMonth, reminderData, data))
        } catch (error) {
            console.log('Could not get forecast', error)
        }
    }
}
