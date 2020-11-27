import React, { useState } from 'react'
import { Moment } from 'moment'
import _ from 'lodash'
import { Button, Paper, TextField } from '@material-ui/core'
import { CirclePicker } from 'react-color'

import './AddReminderModal.scss'
import { ReminderData } from 'types/reminders'
import { Dispatch } from 'reducers'
import { addReminder } from 'actions/reminders'

interface AddReminderModalProps {
    dayOfMonth: Moment,
    dispatch: Dispatch
}

const AddReminderModal: React.FunctionComponent<AddReminderModalProps> = ({ dayOfMonth, dispatch }) => {
    const [reminderData, setReminderData] = useState({
        id: _.uniqueId('reminder'),
        color: '#008B02',
        time: dayOfMonth.format("HH:MM")
    } as ReminderData)
    const updateReminder = (updatedData: Partial<ReminderData>) => {
        setReminderData({
            ...reminderData,
            ...updatedData,
        })
    }
    const submitForm = () => {
        console.log(reminderData)
        dispatch(addReminder(dayOfMonth, reminderData))
    }
    return (
        <Paper>
            <h2>Create new reminder:</h2>
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    type='text'
                    value={reminderData.content}
                    label='Remind me to'
                    onChange={event => updateReminder({ content: event.target.value })}
                />
                <label></label>
                <TextField
                    id='time'
                    label={`on ${dayOfMonth.format('MMM DD')} at`}
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
                    label='City'
                    value={reminderData.city}
                    onChange={event => updateReminder({ city: event.target.value })}
                />
                <CirclePicker
                    colors={['#ef9a9a', '#ce93d8', '#9fa8da', '#81d4fa', '#80cbc4', '#c5e1a5', '#fff59d', '#ffcc80']}
                    color={reminderData.color}
                    onChangeComplete={({ hex }) => updateReminder({ color: hex })}
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
