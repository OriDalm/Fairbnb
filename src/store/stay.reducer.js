import { stayService } from '../services/stay.service'

export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN'
export const UPDATE_FILTER_BY = 'UPDATE_FILTER_BY'
const initialState = {
  stays: [],
  lastRemovedStay: null,
  filterBy: stayService.getDefaultFilter(),
  isModalOpen: false,
}

export function stayReducer(state = initialState, action) {
  var newState = state
  var stays
  var cart
  switch (action.type) {
    case SET_STAYS:
      newState = { ...state, stays: action.stays }
      break

    case REMOVE_STAY:
      const lastRemovedStay = state.stays.find((stay) => stay._id === action.stayId)
      stays = state.stays.filter((stay) => stay._id !== action.stayId)
      newState = { ...state, stays, lastRemovedStay }
      break

    case ADD_STAY:
      newState = { ...state, stays: [...state.stays, action.stay] }
      break

    case UPDATE_STAY:
      stays = state.stays.map((stay) => (stay._id === action.stay._id ? action.stay : stay))
      newState = { ...state, stays }
      break

    case UNDO_REMOVE_STAY:
      if (state.lastRemovedStay) {
        newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
      }
      break
      
    case SET_FILTER_BY:
      return { ...state, filterBy: { ...action.filterBy } }

    case UPDATE_FILTER_BY:
        newState = { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        break

    case SET_MODAL_OPEN:
      newState = { ...state, isModalOpen: action.isModalOpen }
      break

    default:
  }
  return newState
}
