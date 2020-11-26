import React, { useState } from 'react'
import { Moment } from 'moment'
import { Button, Paper, TextField } from '@material-ui/core'
import { GithubPicker } from 'react-color'

import './AddReminderModal.scss'

interface AddReminderModalProps {
    dayOfMonth: Moment
}
interface Reminder {
    reminder: string
    time: string
    color: string 
    city: string
}

const AddReminderModal: React.FunctionComponent<AddReminderModalProps> = ({dayOfMonth}) => {
    const [reminderData, setReminderData] = useState({
        color: '#008B02',
        time: dayOfMonth.format("HH:MM")
    } as Reminder)
    const updateReminder = (updatedData: Partial<Reminder>) => {
        setReminderData({
            ...reminderData,
            ...updatedData,
        })
    }
    const submitForm = () => {
        console.log(reminderData)
    }
    return (
        <Paper>
            <h2>Create new reminder:</h2>
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    type='text'
                    value={reminderData.reminder}
                    label='Remind me to'
                    onChange={event => updateReminder({reminder: event.target.value})}
                />
                <label></label>
                <TextField
                    id='time'
                    label={`on ${dayOfMonth.format('MMM DD')} at`}
                    type="time"
                    value={reminderData.time}
                    onChange={event => updateReminder({time: event.target.value})}
                    inputProps={{
                        step: 1500, // 15 min
                    }}
                />
                <TextField
                    fullWidth
                    type='text'
                    label='City'
                    value={reminderData.city}
                    onChange={event => updateReminder({city: event.target.value})}
                />
                <GithubPicker
                    triangle='hide'
                    color={reminderData.color}
                    onChangeComplete={({hex}) => updateReminder({color: hex})}
                />
                <Button
                    variant='contained' 
                    color='primary'
                    onClick={ submitForm }
                >
                    Add
                </Button>
            </form>
            
        </Paper>
    )
}

export default AddReminderModal
