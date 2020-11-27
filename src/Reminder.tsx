import React from 'react'
import { ReminderData } from 'types/reminders'
import classnames from 'classnames'

import 'Reminder.scss'
import { colorMap } from 'utils'

interface ReminderProps {
    data: ReminderData
}

const Reminder: React.FunctionComponent<ReminderProps> = ({ data }) => {
    const { content, time, color, city } = data
    return (
        <div className={classnames('reminder-data', `color-${colorMap[color]}`)}>
            <div className='time'>{time}</div>
            <div className='content'>{content}</div>
            <div className='city'>{city}</div>
        </div>
    )
}

export default Reminder
