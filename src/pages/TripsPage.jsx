import { useSelector } from "react-redux"
import { MobileTrips } from "../cmps/MobileTrips"
import useIsMobile from "../customHooks/useIsMobile"
import { orderService } from "../services/order.service"
import { DesktopTrips } from "./DesktopTrips"
import { useState } from "react"
import { MobileFooter } from "../cmps/MobileFooter"

export function TripsPage({ filterByToEdit, setFilterByToEdit, toggleDropdown, isDropdownActive, setIsModalActive, setIsDropdownActive }) {
    const isMobile = useIsMobile()
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState([])


    async function fetchOrderByBuyer() {
        try {
            const userOrders = await orderService.getOrderByBuyer(loggedInUser._id)
            setOrders(userOrders)
        }
        catch (err) {
            console.log('Error fetching user', err);
        }
    }


    return (
        <>
            {isMobile && <MobileTrips filterByToEdit={filterByToEdit} orders={orders} fetchOrderByBuyer={fetchOrderByBuyer} setFilterByToEdit={setFilterByToEdit} />}
            {!isMobile && <DesktopTrips filterByToEdit={filterByToEdit} orders={orders} fetchOrderByBuyer={fetchOrderByBuyer} setFilterByToEdit={setFilterByToEdit} />}
            <MobileFooter toggleDropdown={toggleDropdown} isDropdownActive={isDropdownActive} setIsModalActive={setIsModalActive} setIsDropdownActive={setIsDropdownActive} />

        </>
    )
}