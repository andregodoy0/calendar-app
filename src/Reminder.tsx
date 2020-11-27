import React, { useState } from 'react'
import { ReminderData } from 'types/reminders'
import classnames from 'classnames'

import 'Reminder.scss'
import { colorMap } from 'utils'
import ReminderModal from 'ReminderModal'
import { useDispatch } from 'react-redux'
import { updateReminder } from 'actions/reminders'
import { Moment } from 'moment'
import { DialogContent, Modal } from '@material-ui/core'

interface ReminderProps {
    calendarDay: Moment,
    data: ReminderData,
}

const Reminder: React.FunctionComponent<ReminderProps> = ({ calendarDay, data }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()
    const handleModalClose = () => {
        setModalOpen(false)
    }
    const { content, time, color, city, forecast } = data
    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setModalOpen(true)
        event.stopPropagation()
    }
    const onSubmit = (dayOfMonth: Moment, reminderData: ReminderData) => {
        setModalOpen(false)
        dispatch(updateReminder(dayOfMonth, reminderData))
    }
    return (
        <div
            className={classnames('reminder-data', `color-${colorMap[color]}`)}
            onClick={onClick}
        >
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                className='edit-reminder-modal'
                aria-labelledby="edit-reminder"
                aria-describedby="edit-existing-reminder"
            >
                <DialogContent>
                    <ReminderModal
                        existingReminder={data}
                        calendarDay={calendarDay}
                        onSubmit={onSubmit}
                    />
                </DialogContent>
            </Modal>
            <div className='time'>{time}</div>
            <div className='content'>{content}</div>
            {forecast &&
                <img
                    className='forecast' 
                    src={forecast.icon}
                    alt={`${forecast.condition} with max ${forecast.maxTemp} and min ${forecast.minTemp} in ${city}`}
                />
            }
        </div>
    )
}

export default Reminder
