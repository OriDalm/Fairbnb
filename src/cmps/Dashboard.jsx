
import { PieChart } from './PieChart';
import { BarChart } from './BarChart';
import { OrderList } from './OrderList';
import { StayChart } from './StayChart';

import { useSelector } from 'react-redux';
import { updateOrder, loadReserveStats, updateReserveStats } from '../store/order.actions';
import { orderService } from '../services/order.service';
import { Fragment, useEffect, useState } from 'react';

import userIcon from '../assets/img/user.svg'
import { DoughnutChart } from './DoughnutChart';
import { DashboardNav } from './DashboardNav';
import { SOCKET_EVENT_ADD_ORDER, SOCKET_EVENT_UPDATE_ORDER, socketService } from '../services/socket.service';
import { showUserMsg } from '../services/event-bus.service';

export function Dashboard() {

    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const reserveStats = useSelector((storeState) => storeState.orderModule.stats)
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)

    const [hostOrders, setHostOrders] = useState([])
    const [ordersStatus, setOrdersStatus] = useState([])
    const [userRevenue, setUserRevenue] = useState(new Array(12).fill(0))


    useEffect(() => {
        fetchOrderByHost()
        socketService.on(SOCKET_EVENT_ADD_ORDER, (order) => {
            fetchOrderByHost()
        })
        socketService.on('order-status-updated', (order) => {
            fetchOrderByHost()
        })
        // loadReserveStats()
        return () => {
            socketService.off(SOCKET_EVENT_ADD_ORDER, (order) => {
                fetchOrderByHost()
            })
        }
    }, [])

    async function fetchOrderByHost() {
        try {
            const userOrders = await orderService.getOrderByHost(loggedInUser._id)
            setHostOrders(userOrders)
            const revenue = calculateMonthlyTotals(userOrders)
            console.log(revenue);
            setUserRevenue(revenue)
            const currOrderStatus = [countStatus(userOrders, 'pending'), countStatus(userOrders, 'approved'), countStatus(userOrders, 'rejected')]
            setOrdersStatus(currOrderStatus)
        }
        catch (err) {
            console.log('Error fetching user', err);
        }
    }


    async function onChangeStatus(order, status) {
        order.status = status
        updateOrder(order)
    }


    function countStatus(array, status) {
        return array.filter(obj => obj.status === status).length;
    }

    function calculateMonthlyTotals(inputArray) {
        const monthlyTotals = new Array(12).fill(0);

        for (const item of inputArray) {

            const dateParts = item.endDate.split('/'); // Split the date into parts
            if (dateParts.length === 3) {
                const day = parseInt(dateParts[0], 10);
                const month = parseInt(dateParts[1], 10) - 1; // Adjust month to be 0-based
                const year = parseInt(dateParts[2], 10);

                if (!isNaN(day) && !isNaN(month) && !isNaN(year) && item.status === 'approved') {
                    const endDate = new Date(year, month, day);

                    monthlyTotals[month] += item.totalPrice;

                }
            }

        }

        return monthlyTotals;
    }


    // if (!reserveStats) return <div>Loading...</div>
    return (
        <Fragment>
            <section className='dashboard'>

                {/* <div className='dashboard-nav'>
                    <h1>Home</h1>
                </div> */}

                <div className='dashboard-header flex space-between'>
                    <h1>Dashboard</h1>
                    <img src={loggedInUser.imgUrl} />
                </div>
                <DashboardNav />
                <div className='dashboard-container full'>

                    {/* <p className='order-count'>{orders.length} reservations</p> */}
                    <div>
                        {/* <StayChart /> */}
                        <OrderList hostOrders={hostOrders} onChangeStatus={onChangeStatus} />
                    </div>

                    <div>
                        {/* <PieChart /> */}
                        <DoughnutChart ordersStatus={ordersStatus} />
                        <BarChart nums={userRevenue} />
                    </div>

                </div>

            </section>
        </Fragment>
    )
}
