import React from 'react';
import { Moment } from 'moment'
import { Input, Paper, TextField } from '@material-ui/core';

interface ReminderListProps {
    dayOfMonth: Moment
}
const ReminderList: React.FunctionComponent<ReminderListProps> = ({dayOfMonth}) => {
    return (
        <Paper>
            <h2>Create new reminder for {dayOfMonth.format('MMM DD')}:</h2>
            <form noValidate autoComplete="off">
                <label>Reminder:</label><TextField fullWidth type='text' />
                <label>Color:</label><Input type='text' />
                <label>City:</label><Input type='text' />
            </form>
            
        </Paper>
    )
}

export default ReminderList