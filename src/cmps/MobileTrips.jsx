import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { SOCKET_EVENT_UPDATE_ORDER, socketService } from "../services/socket.service"
import { useEffect } from "react"
import { AppHeader } from "./AppHeader"


export function MobileTrips({ filterByToEdit, setIsModalActive, setFilterByToEdit, fetchOrderByBuyer, orders }) {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
        fetchOrderByBuyer()
        socketService.on(SOCKET_EVENT_UPDATE_ORDER, (order) => {
            fetchOrderByBuyer()
        })
        return () => {
            socketService.off(SOCKET_EVENT_UPDATE_ORDER, (order) => {
                fetchOrderByBuyer()
            })
        }
    }, [loggedInUser])

    function handleClick(orderId) {
        navigate(`/stay/${orderId}`)
    }

    if (!orders) return <Loader />
    return (
        <>
            <section className="trips-page-container">
                <AppHeader filterByToEdit={filterByToEdit} setIsModalActive={setIsModalActive} setFilterByToEdit={setFilterByToEdit} />
                <section className="mobile-trips-container">
                    {orders && orders.map((order, idx) => (
                        <div key={idx} onClick={() => handleClick(order.stay._id)} className="mobile-trip">
                            <section className="mobile-destination">
                                <img src={order.stay.imgUrls[0]} alt="Stay Image" />
                                <section className="reservation-info">

                                    <div className="reservation-header">
                                        <div className="stay-name">{order.stay.name}</div>
                                        <div className="trips-host-name">Hosted by {order.stay.hostFullname}</div>
                                    </div>

                                    <section className="reservation-footer">
                                        <section className="reservation-date">
                                            <div className="trips-start-date">{order.startDate}</div>
                                            <div className="trips-end-date">{order.endDate}</div>
                                        </section>
                                        <section className="trips-location">
                                            <div className="trips-city">{order.stay.city}</div>
                                            <div className="trips-country">{order.stay.country}</div>
                                        </section>
                                        <section className="trips-status">
                                            <div className={order.status}>{order.status}</div>
                                            <div className="trips-price">${order.totalPrice}</div>

                                        </section>
                                    </section>
                                </section>
                            </section>

                        </div>
                    ))}

                </section>
            </section >
        </>

    );
}
