import React from 'react'
import moment from 'moment'
import classnames from 'classnames'

import './Calendar.scss';
import { Grid, Card, CardHeader, CardContent, IconButton } from '@material-ui/core'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

function Calendar() {
    
    const renderCalendarHeader = () => {
        const columns = ['Sunday', 'Monday', 'Tuesday', 'Wdnsday', 'Thursday', 'Friday', 'Saturday']
        return columns.map(dayOfWeek => (
            <Card variant='outlined' className='header cell' key={ dayOfWeek }>
                <CardHeader title={ dayOfWeek } />
            </Card>
        ))
    }
    const createCalendarDay = (day: number, shouldGrayout: boolean) => {
        return (
            <Card variant="outlined" square className={classnames('calendar-day', {'grayed-out': shouldGrayout})} key={ day }>
                <CardHeader title={ day } />
                <CardContent>
                </CardContent>
                    <IconButton aria-label="Create new task">
                        <AddCircleRoundedIcon />
                    </IconButton>
            </Card>
        )
    }
    const renderCurrentMonth = () => {
        const numberOfDaysPreviousMonth = moment().subtract(1, 'month').daysInMonth()
        const numberOfDaysCurrentMonth = moment().daysInMonth()
        const cells = []
        for (let i = 0; i < numberOfDaysCurrentMonth; i++) {
            cells.push(createCalendarDay(i + 1, true))
        }
        // Append calendar days for previous month at the begining of the array
        const dayOfWeekFirstDayOfMonth = moment().startOf('month').day()
        if (dayOfWeekFirstDayOfMonth) {
            for (let i = dayOfWeekFirstDayOfMonth; i >= 0; i--) {
                cells.unshift(createCalendarDay(numberOfDaysPreviousMonth - i, false))
            }
        }
        const dayOfWeekLastDayOfMonth = moment().endOf('month').day()
        // Append calendar days for noxt month at the end of the array
        if (dayOfWeekLastDayOfMonth !== 6) {
            for (let i = 0; i < (6 - dayOfWeekLastDayOfMonth); i++) {
                cells.push(createCalendarDay(i + 1, false))
            }
        }
        return cells
    }

    return (
        <div>
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