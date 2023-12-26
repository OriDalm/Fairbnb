
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'order'
_createOrders()

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    getReservationStats,
    addOrderMsg
}
window.cs = orderService


function _createOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY)
    if (!orders || !orders.length) {
        orders = [
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u101',
                    fullname: 'Mira',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '06/09/2023',
                endDate: '14/09/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h102',
                    name: 'Smoky Mountain Retreat',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u102',
                    fullname: 'Trent',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '20/07/2023',
                endDate: '02/08/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h103',
                    name: 'Cherry Treesort',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u103',
                    fullname: 'Nick',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '01/01/2024',
                endDate: '10/01/2024',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h104',
                    name: 'Thimble Rock Point',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u104',
                    fullname: 'Mark',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '30/11/2022',
                endDate: '06/12/2022',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h105',
                    name: 'Beachfront Home',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u105',
                    fullname: 'Sean',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '20/02/2023',
                endDate: '28/02/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h106',
                    name: 'Alpine Zen Estate',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u106',
                    fullname: 'Kinnettles',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '10/05/2023',
                endDate: '20/05/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h107',
                    name: 'Kinnettles Mansion',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u107',
                    fullname: 'Debra',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '30/03/2023',
                endDate: '06/04/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h108',
                    name: 'Winderdome Resort',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u108',
                    fullname: 'Rob',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '15/10/2022',
                endDate: '21/10/2022',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h109',
                    name: 'Lakeview home pool',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u109',
                    fullname: 'Adam',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '01/06/2022',
                endDate: '07/06/2022',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h110',
                    name: 'Hemlock Valley',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u110',
                    fullname: 'Julie',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '14/10/2023',
                endDate: '20/10/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h111',
                    name: 'Farmstays',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u111',
                    fullname: 'Aiden',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '24/08/2023',
                endDate: '01/09/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h112',
                    name: 'The Roost in Reinfeld',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u112',
                    fullname: 'Jenny',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '17/01/2023',
                endDate: '21/01/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h113',
                    name: 'Beachfront House',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u113',
                    fullname: 'Christine',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '02/03/2023',
                endDate: '10/03/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h114',
                    name: 'Lakeside Maisonette',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
            {
                _id: utilService.makeId(),
                hostId: 'u102',
                buyer: {
                    _id: 'u114',
                    fullname: 'Otera',
                },
                totalPrice: utilService.getRandomIntInclusive(50, 550),
                startDate: '04/09/2023',
                endDate: '08/09/2023',
                guests: {
                    adults: 1,
                    children: 2,
                },
                stay: {
                    _id: 'h115',
                    name: 'temple hotel',
                    price: 80.0,
                },
                msgs: [],
                status: 'pending', // approved, rejected
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, orders)
    }
}

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

async function query(filterBy = { txt: '', price: 0 }) {
    var orders = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(order => regex.test(order.vendor) || regex.test(order.description))
    }
    if (filterBy.price) {
        orders = orders.filter(order => order.price <= filterBy.price)
    }
    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        order.owner = userService.getLoggedinUser()
        savedOrder = await storageService.post(STORAGE_KEY, order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function getEmptyOrder() {
    return {
        hostId: 'u102',
        buyer: {
            _id: 'u101',
            fullname: 'User 1',
        },
        // startDate: 'Select',
        // endDate: 'Select',
        guests: {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        },
        status: 'pending'
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




