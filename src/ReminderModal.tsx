import React, { useState } from 'react'
import { Moment } from 'moment'
import _ from 'lodash'
import { Button, Paper, TextField } from '@material-ui/core'
import { CirclePicker } from 'react-color'

import 'ReminderModal.scss'
import { ReminderData } from 'types/reminders'
import { colorSet } from 'utils'

interface ReminderModalProps {
    calendarDay: Moment,
    onSubmit: (dayOfMonth: Moment, reminderData: ReminderData) => void,
    existingReminder?: ReminderData,
}

const ReminderModal: React.FunctionComponent<ReminderModalProps> = ({ calendarDay, onSubmit, existingReminder }) => {
    const [reminderData, setReminderData] = useState(existingReminder || {
        id: _.uniqueId('reminder'),
        color: colorSet[0],
        time: calendarDay.format("HH:MM")
    } as ReminderData)
    const [validationError, setValidationError] = useState(false)
    const updateReminder = (updatedData: Partial<ReminderData>) => {
        setReminderData({
            ...reminderData,
            ...updatedData,
        })
    }
    const validateForm = () => {
        setValidationError(!reminderData.content)
        return validationError
    }
    const submitForm = () => {
        if (validateForm()) {
            return;
        }
        onSubmit(calendarDay, reminderData)
    }
    return (
        <Paper>
            <h2>{existingReminder ? 'Edit reminder:' : 'Create new reminder:'}</h2>
            <form noValidate autoComplete="off">
                <TextField
                    autoFocus
                    required
                    error={validationError}
                    onBlur={() => validateForm()}
                    fullWidth
                    type='text'
                    value={reminderData.content}
                    helperText='Must not be empty'
                    label='Remind me to'
                    onChange={event => updateReminder({ content: event.target.value })}
                />
                {/* {TODO: NEED TO EDIT DATE} */}
                <TextField
                    id='time'
                    label='When?'
                    type='time'
                    value={reminderData.time}
                    onChange={event => updateReminder({ time: event.target.value })}
                    inputProps={{
                        step: 1500, // 15 min
                    }}
                />
                <TextField
                    fullWidth
                    type='text'
                    label='Where?'
                    defaultValue='New York'
                    value={reminderData.city}
                    onChange={event => updateReminder({ city: event.target.value })}
                />
                <CirclePicker
                    colors={colorSet}
                    color={reminderData.color}
                    onChangeComplete={({ hex }) => updateReminder({ color: hex })}
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
