import React from 'react';
import { Moment } from 'moment'
import { Paper, TextField } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker'

interface AddReminderModalProps {
    dayOfMonth: Moment
}
const AddReminderModal: React.FunctionComponent<AddReminderModalProps> = ({dayOfMonth}) => {
    return (
        <Paper>
            <h2>Create new reminder:</h2>
            <form noValidate autoComplete="off">
                <TextField
                    fullWidth
                    type='text'
                    label='Remind me to'
                />
                <label>on {dayOfMonth.format('MMM DD')} at</label>
                <TextField
                    id='time'
                    label='time'
                    type="time"
                    defaultValue={dayOfMonth.format("HH:MM")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 1500, // 15 min
                    }}
                />
                <TextField
                    fullWidth
                    type='text'
                    label='City'
                />
                <ColorPicker
                    name='color'
                    defaultValue='#000'
                    // value={this.state.color} - for controlled component
                    onChange={color => console.log(color)}

                />
            </form>
            
        </Paper>
    )
}

export default AddReminderModal
