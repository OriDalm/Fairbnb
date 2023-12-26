import { orderService } from "../services/order.service"

export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const UNDO_REMOVE_ORDER = 'UNDO_REMOVE_ORDER'

export const SET_STATS = 'SET_STATS'
export const UPDATE_STATS = 'UPDATE_STATS'

const initialState = {
    orders: [],
    stats: [],
    order: orderService.getEmptyOrder(),
    lastRemovedOrder: null
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    var stats
    switch (action.type) {
        case SET_ORDER:
            newState = { ...state, order: { ...action.order } }
            console.log(newState.order);
            break
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case SET_STATS:
            newState = { ...state, stats: action.stats }
            break
        case REMOVE_ORDER:
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        case UPDATE_STATS:
            // stats = state.stats
            // newState = { ...state.stats, stats }
            newState = { ...state, stats: { ...state.stats, ...action.stats } }
            break
        case UNDO_REMOVE_ORDER:
            if (state.lastRemovedOrder) {
                newState = { ...state, orders: [...state.orders, state.lastRemovedOrder], lastRemovedOrder: null }
            }
            break
        default:
    }
    return newState
}
