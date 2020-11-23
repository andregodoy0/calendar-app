import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import classnames from 'classnames'

import './Calendar.scss';
import { Grid, Card, CardHeader, CardContent, Modal, DialogContent} from '@material-ui/core'
import ReminderList from './ReminderList';
// import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

function Calendar() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [newReminderDay, setReminderDay] = useState(moment())

    const handleClose = () => {
        setModalOpen(false)
    }
    const createNewTask = (day: Moment) => {
        console.log(day)
        setModalOpen(true)
        setReminderDay(day)
    }
    
    const renderCalendarHeader = () => {
        const columns = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return columns.map(dayOfWeek => (
            <Card variant='outlined' className='header calendar-day' key={ dayOfWeek }>
                <CardHeader title={ dayOfWeek } fontSize='small' />
            </Card>
        ))
    }
    const createCalendarDay = (calendarDay: Moment) => {
        const dayOfWeek = calendarDay.day()
        return (
            <Card
                variant="outlined" 
                square 
                className={ classnames(
                    'calendar-day', 
                    {'grayed-out': !calendarDay.isSame(moment(), 'month') || dayOfWeek === 0 || dayOfWeek === 6}
                ) } 
                key={ calendarDay.format('YYYYMMDD') }
            >
                <CardHeader
                    onClick={() => createNewTask(calendarDay)}
                    subheader={ calendarDay.date() }
                />
                <CardContent
                    onClick={() => createNewTask(calendarDay)}
                >
                </CardContent>
                    {/* <IconButton aria-label="Create new task">
                        <AddCircleRoundedIcon />K
                    </IconButton> */}
            </Card>
        )
    }
    const renderCurrentMonth = () => {
        const numberOfDaysPreviousMonth = moment().subtract(1, 'month').daysInMonth()
        const numberOfDaysCurrentMonth = moment().daysInMonth()
        const cells = []
        for (let i = 0; i < numberOfDaysCurrentMonth; i++) {
            cells.push(createCalendarDay(moment().date(i + 1)))
        }
        // Append calendar days for previous month at the begining of the array
        const dayOfWeekFirstDayOfMonth = moment().startOf('month').day()
        if (dayOfWeekFirstDayOfMonth) {
            for (let i = dayOfWeekFirstDayOfMonth; i >= 0; i--) {
                cells.unshift(createCalendarDay(moment().subtract(1, 'month').date(numberOfDaysPreviousMonth - i)))
            }
        }
        const dayOfWeekLastDayOfMonth = moment().endOf('month').day()
        // Append calendar days for noxt month at the end of the array
        if (dayOfWeekLastDayOfMonth !== 6) {
            for (let i = 0; i < (6 - dayOfWeekLastDayOfMonth); i++) {
                cells.push(createCalendarDay(moment().add(1, 'month').date(i + 1)))
            }
        }
        return cells
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="new-reminder"
                aria-describedby="add-new-reminder"
            >
                <DialogContent>
                    <ReminderList
                        dayOfMonth={newReminderDay}
                    />
                </DialogContent>
            </Modal>
            <div>We are in {moment().format('MMMM')}</div>
            <div className='calendar'>
                <Grid container>
                    { renderCalendarHeader() }
                    { renderCurrentMonth() }
                </Grid>
            </div>
        </div>
    )
}

export default Calendar