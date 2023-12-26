import React, { useEffect, useState } from 'react'
import { addDays, isBefore, isSameDay } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { useSelector } from 'react-redux'
import 'react-day-picker/dist/style.css'
import { updateOrderDetails } from '../store/order.actions'



const pastMonth = new Date()

export function StayDate({ setSelectedFilterBox }) {
  const [numberOfMonths, setNumberOfMonths] = useState(window.innerWidth >= 850 ? 2 : 1)
  const order = useSelector(store => store.orderModule.order)
  const [range, setRange] = useState()

  useEffect(() => {
    function handleResize() {
      setNumberOfMonths(window.innerWidth >= 885 ? 2 : 1);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  }

  function setDateRange(range) {
    setRange(range)
    const date = {
      from: convertDateFormat(range.from),
      to: convertDateFormat(range.to)
    }
    onSetDate(date)
  }

  function onSetDate(date) {
    order.startDate = date.from
    order.endDate = date.to
    updateOrderDetails(order)
  }

  function isDateDisabled(date) {
    return isBefore(date, new Date()) && !isSameDay(date, new Date())
  }

  function convertDateFormat(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are 0-based
    const year = dateObj.getFullYear();
    console.log(day);
    if (day === 'NaN') return
    return `${day}/${month}/${year}`;
  }

  return (
    <section className='date-picker'>
      <DayPicker
        firstDayOfWeek={1}
        disabled={isDateDisabled}
        id='test'
        mode='range'
        defaultMonth={pastMonth}
        numberOfMonths={numberOfMonths}
        selected={range}
        onSelect={setDateRange}
      />
    </section>
  )
}
