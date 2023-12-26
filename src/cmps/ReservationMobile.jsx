import React from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { AirbnbBtn } from './AirbnbBtn'
import { StayDate } from './StayDate'

export function ReservationMobile({ stay, stayId }) {

    const [dateSelection, setIsDateOpen] = useState(false)
    const navigate = useNavigate()

    const order = useSelector(store => store.orderModule.order)

    function onOpenDateModal() {
        setIsDateOpen(!dateSelection)
    }

    function onReservePage() {
        if (!order.endDate || !order.startDate) {
            setIsDateOpen(!dateSelection)
            return
        }
        return navigate(`/stay/${stayId}/reserve`)
    }

    return (
        <section className="reservation-mobile flex space-between">

            <div>
                <article className='price'>
                    <span>${stay.price}</span>
                    <span> night</span>
                </article>

                <div className='date' onClick={() => onOpenDateModal()}>Nov 18-23</div>
            </div>

            {dateSelection &&
                <div className='check-out-modal'>
                    <StayDate />
                </div>}

            <AirbnbBtn id={stay._id} txt={'Reserve'} callBackFunction={onReservePage} />

        </section>
    )
}