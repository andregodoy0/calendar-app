import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import _ from 'lodash'
import { Button, Paper, TextField } from '@material-ui/core'
import { CirclePicker } from 'react-color'

import { ReminderData } from 'types/reminders'
import { colorSet } from 'utils'

interface ReminderModalProps {
    calendarDay: Moment,
    onSubmit: (dayOfMonth: Moment, reminderData: ReminderData) => void,
    existingReminder?: ReminderData,
}

const ReminderModal: React.FunctionComponent<ReminderModalProps> = ({ calendarDay, onSubmit, existingReminder }) => {
    const [reminderDay, setReminderDay] = useState((existingReminder?.datetime || calendarDay).format('YYYY-MM-DD'))
    const [reminderTime, setReminderTime] = useState((existingReminder?.datetime ||calendarDay).format('HH:mm'))
    const [reminderData, setReminderData] = useState(existingReminder || {
        id: _.uniqueId('reminder'),
        city: '',
        content: '',
        color: colorSet[0],
        datetime: calendarDay,
    } as ReminderData)
    const [validationError, setValidationError] = useState(false)
    const updateStateReminder = (updatedData: Partial<ReminderData>) => {
        setReminderData({
            ...reminderData,
            ...updatedData,
        })
    }
    const isFormValid = () => {
        setValidationError(!reminderData.content.length || reminderData.content.length > 30)
        return validationError
    }
    const submitForm = () => {
        if (isFormValid()) {
            return
        }
        const [hour, minute] = reminderTime.split(':')
        const newDatetime = moment(reminderDay).hour(parseInt(hour)).minute(parseInt(minute))
        onSubmit(calendarDay, {...reminderData, datetime: newDatetime})
    }
    return (
        <Paper>
            <h2>{existingReminder ? 'Edit reminder:' : 'Create new reminder:'}</h2>
            <form noValidate autoComplete="off">
                <TextField
                    autoFocus
                    required
                    error={validationError}
                    onBlur={() => isFormValid()}
                    fullWidth
                    type='text'
                    value={reminderData.content}
                    helperText='Must be less than 30 characters and not be empty'
                    label='Remind me to'
                    onChange={event => updateStateReminder({ content: event.target.value })}
                />
                <TextField
                    required
                    id='date'
                    label='On'
                    type='date'
                    value={reminderDay}
                    onChange={event => setReminderDay(event.target.value)}
                />
                <TextField
                    required
                    id='time'
                    label='When?'
                    type='time'
                    value={reminderTime}
                    onChange={event => setReminderTime(event.target.value)}
                    inputProps={{
                        step: 1500, // 15 min
                    }}
                />
                <TextField
                    fullWidth
                    type='text'
                    label='Where?'
                    value={reminderData.city}
                    helperText='Get weather forecast if the event is within the next three days'
                    onChange={event => updateStateReminder({ city: event.target.value })}
                />
                <CirclePicker
                    colors={colorSet}
                    color={reminderData.color}
                    onChangeComplete={({ hex }) => updateStateReminder({ color: hex })}
                    width='400px'
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitForm}
                >
                    {existingReminder ? 'Edit' : 'Add'}
                </Button>
            </form>

        </Paper>
    )
}

export default ReminderModal
