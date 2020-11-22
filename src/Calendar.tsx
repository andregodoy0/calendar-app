import React from 'react'
import moment from 'moment'

import './Calendar.scss';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';

function Calendar() {
    const now = moment()
    const numberOfDaysLastMonth = now.daysInMonth()
    const dayOfWeekFirstDayOfMonth = now.startOf('month').day()
    // const dayOfWeek = now.day()
    // const dayOfMonth = now.date()

    const renderFirstMonth = () => {
        const cells = []
        for (let i=0; i<numberOfDaysLastMonth; i++) {
            cells.push(
                <Card variant="outlined" square className='cell' key={i}>
                    <CardHeader title={i+1} />
                    <CardContent>
                        Add your tasks!
                    </CardContent>
                </Card>
            )
        }
        return (
            cells
        )
    }
    const getColumns = () => {
        const columns = ['Sunday', 'Monday', 'Tuesday', 'wWdnsday', 'Thursday', 'Friday', 'Saturday']
        return columns.map(day => ({
            field: day,
            headerName: day,
        }))
    }
    const getRows = () => {
        const cells = []
        for (let i=0; i<numberOfDaysLastMonth; i++) {
            cells.push(
                <Grid xs className='cell' key={i}>
                    {i+1}
                </Grid>
            )
        }
        return 
    }
    return (
        <div>
            <div>Hello from calendar!</div>
            <div className='calendar'>
                <Grid
                    container
                >

                    {renderFirstMonth()}
                </Grid>
            </div>
        </div>

    )
}

export default Calendar