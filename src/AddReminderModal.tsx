import React, { useState } from 'react'
import { Moment } from 'moment'
import _ from 'lodash'
import { Button, Paper, TextField } from '@material-ui/core'
import { CirclePicker } from 'react-color'

import 'AddReminderModal.scss'
import { ReminderData } from 'types/reminders'
import { colorSet } from 'utils'

interface AddReminderModalProps {
    dayOfMonth: Moment,
    onSubmit: (dayOfMonth: Moment, reminderData: ReminderData) => void,
}

const AddReminderModal: React.FunctionComponent<AddReminderModalProps> = ({ dayOfMonth, onSubmit }) => {
    const [reminderData, setReminderData] = useState({
        id: _.uniqueId('reminder'),
        color: colorSet[0],
        time: dayOfMonth.format("HH:MM")
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
        onSubmit(dayOfMonth, reminderData)
    }
    return (
        <Paper>
            <h2>Create new reminder:</h2>
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
                <TextField
                    id='time'
                    label='When?'
                    type="time"
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
                    width='600px'
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={submitForm}
                >
                    Add
                </Button>
            </form>

        </Paper>
    )
}

export default AddReminderModal
