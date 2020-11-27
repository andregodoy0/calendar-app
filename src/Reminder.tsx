import React, { useState } from 'react'
import { ReminderData } from 'types/reminders'
import classnames from 'classnames'

import 'Reminder.scss'
import { colorMap } from 'utils'
import ReminderModal from 'ReminderModal'
import { useDispatch } from 'react-redux'
import { fetchWeatherForecast } from 'actions/reminders'
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
        // fetchWeatherForecast also updates the reminder even if forecast is not necessary
        dispatch(fetchWeatherForecast(dayOfMonth, reminderData))
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
            <div className='content' title={content}>{content}</div>
            {forecast &&
                <img
                    className='forecast' 
                    src={forecast.icon}
                    alt={`${forecast.condition} with max ${forecast.maxTemp}&deg; and min ${forecast.minTemp}&deg; in ${city}`}
                    title={`${forecast.condition} with max ${forecast.maxTemp}&deg; and min ${forecast.minTemp}&deg; in ${city}`}
                />
            }
        </div>
    )
}

export default Reminder
