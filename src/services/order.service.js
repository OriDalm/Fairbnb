
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { SOCKET_EMIT_ADD_ORDER, SOCKET_EMIT_UPDATE_ORDER, socketService } from './socket.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    save,
    getEmptyOrder,
    getReservationStats,
    getOrderByBuyer,
    getOrderByHost
}
window.cs = orderService

async function getReservationStats() {
    let statsCount = [0, 0, 0]
    let orders = await storageService.query(STORAGE_KEY)
    orders.map(order => {
        if (order.status === 'pending') statsCount[0]++
        else if (order.status === 'approved') statsCount[1]++
        else statsCount[2]++
    })
    return statsCount
}

async function query(filterBy = {}) {
    console.log(filterBy);
    return httpService.get(STORAGE_KEY, filterBy)
}

async function add(orderToAdd) {
    socketService.emit(SOCKET_EMIT_ADD_ORDER, orderToAdd)
    return httpService.post(STORAGE_KEY, orderToAdd)
}

async function update(orderToUpdate) {
    socketService.emit(SOCKET_EMIT_UPDATE_ORDER, orderToUpdate)
    return httpService.put(STORAGE_KEY, orderToUpdate)
}

async function save(order) {
    console.log(order);
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(STORAGE_KEY, order)
        socketService.emit(SOCKET_EMIT_UPDATE_ORDER,savedOrder)
    } else {
        savedOrder = await httpService.post(STORAGE_KEY, order)
        socketService.emit(SOCKET_EMIT_ADD_ORDER,savedOrder)
    }
    // socketService.emit(SOCKET_EMIT_ADD_ORDER,savedOrder)
    return savedOrder
}

async function getOrderByBuyer(buyerId) {
    try {
        const buyer = {buyer: buyerId}
        const orders = await query(buyer)
        return orders.filter(order => order.buyer._id === buyerId)
    }
    catch (err) {
        console.log('Cant get order by buyer',err);
    }
}

async function getOrderByHost(hostId) {
    console.log(hostId);
    try {
        const host = {host: hostId}
        const orders = await query(host)
        return orders.filter(order => order.hostId === hostId)
    }
    catch (err) {
        console.log('Cant get order by host',err);
    }
}

function getEmptyOrder() {
    return {
        // hostId: '',
        // buyerId: '',
        buyer: {
            _id: 'u101',
            fullname: 'User 1',
        },
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        status: 'pending'
    }
}
