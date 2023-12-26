import React from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { AirbnbBtn } from './AirbnbBtn'
import { StayGusts } from './StayGuests'
import { StayDate } from './StayDate'
import { utilService } from '../services/util.service'

export function Reservation({ stay, stayId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [dateSelection, setIsDateOpen] = useState(false)
    const navigate = useNavigate()

    const order = useSelector(store => store.orderModule.order)

    function onOpenModal() {
        setIsOpen(!isOpen)
    }

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
        <div className="reservation-section">
            <div className="reservation-container">

                <div className="reservation-details">

                    <div className="reservation-header flex space-between">
                        <div className='price'>
                            <span>${stay.price}</span>
                            <span> night</span>
                        </div>

                        <div className='rating'>
                            <span>{stay.rating || '5.0'} •</span>
                            <span>{stay.reviews.length} reviews</span>
                        </div>
                    </div>

                    <div className="reservation-selection">
                        <div className="date">
                            <div className='check-in' onClick={() => onOpenDateModal()}>
                                <div>CHECK IN</div>
                                <div>
                                    {order.startDate || 'Add Dates'}</div>
                                {/* <input type="text" /> */}
                            </div>
                            <div className='check-out' onClick={() => onOpenDateModal()}>
                                <div>CHECK OUT</div>
                                <div>{order.endDate || 'Add Dates'}</div>
                            </div>
                        </div>

                        <div className='guest-container flex space-between' onClick={() => onOpenModal()}>
                            <div className='guest'>
                                <div>GUESTS</div>
                                <div>{order.guests.adults + order.guests.children + order.guests.infants} {order.guests.adults + order.guests.children + order.guests.infants > 1 ? 'guests' : 'guest'}</div>
                            </div>
                            <div>
                                {!isOpen && <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218783/arrow-down_kcazn4.svg' alt="" />}
                                {isOpen && <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218784/arrow-up_sna2sl.svg' alt="" />}
                            </div>
                        </div>
                    </div>

                    {isOpen &&
                        <div className='guest-list'>
                            <StayGusts width={281} />
                        </div>}

                    {dateSelection &&
                        <div className='check-out-modal'>
                            <StayDate />
                        </div>}
                    <AirbnbBtn id={stay._id} txt={'Reserve'} callBackFunction={onReservePage} />

                </div>


                {order.endDate && <section>
                    <div className="reservation-notice">
                        You won't be charged yet
                    </div>

                    <div className='summery flex space-between'>
                        <span>${stay.price} x {utilService.calculateNights(order.startDate, order.endDate)} {utilService.calculateNights(order.startDate, order.endDate) > 1 ? 'nights' : 'night'}</span>
                        <span>${new Intl.NumberFormat('he-IL').format(stay.price * utilService.calculateNights(order.startDate, order.endDate))}</span>
                    </div>

                    <div className='summery flex space-between'>
                        <span>Airbnb service fee</span>
                        <span>${new Intl.NumberFormat('he-IL').format(stay.price * 0.2)}</span>
                    </div>

                    <div className='total flex space-between'>
                        <div>Total</div>
                        <div>${new Intl.NumberFormat('he-IL').format(stay.price * utilService.calculateNights(order.startDate, order.endDate) + stay.price * 0.2)}</div>
                    </div>
                </section>}

            </div>
        </div>
    )
}