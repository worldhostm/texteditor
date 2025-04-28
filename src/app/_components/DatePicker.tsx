'use client'

import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes, getHours, getMinutes } from 'date-fns'
import DatePicker from 'react-datepicker';
import styles from './datepicker.module.css';


export default function SeparateDateTimePicker() {
  const [date, setDate] = useState<Date | null>(null)   // 날짜만
  const [time, setTime] = useState<Date | null>(null)   // 시간만

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate)
  }

  const handleTimeChange = (selectedTime: Date | null) => {
    setTime(selectedTime)
  }

  const getCombinedDateTime = () => {
    if (!date || !time) return null

    const combined = setHours(setMinutes(date, getMinutes(time)), getHours(time))
    return combined
  }

  return (
    <div className={`${styles.container}`}>
      {/* 날짜 선택 */}
        <DatePicker
            className='pretendard-regular date_bodyS'
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜 선택"
          showTimeSelect={false}
        />

      {/* 시간 선택 */}
        <DatePicker
          className='pretendard-regular date_bodyS'
          selected={time}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          timeCaption="시간"
          dateFormat="h:mm aa"
          placeholderText="시간 선택"
        />
      {/* 결과 보여주기 */}
      {/* <div className="mt-4">
        <p>{getCombinedDateTime()?.toLocaleString() || '선택되지 않음'}</p>
      </div> */}
    </div>
  )
}
