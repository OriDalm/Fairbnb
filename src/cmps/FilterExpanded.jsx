import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_EXPANDED_HEADER_MODAL, OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer'
import { useClickOutside } from '../customHooks/useCloseModule'
import { StayDate } from './StayDate'
import { StayLocation } from './StayLocation'
import { StayGusts } from './StayGuests'
import { CountryFilter } from './CountryFilter'
import { updateFilterBy } from '../store/stay.actions'
import { utilService } from '../services/util.service'
import { AirbnbBtn } from './AirbnbBtn'

export function FilterExpanded({ filterByToEdit, setFilterByToEdit, onSetFilter, filterBy, isFilterExpanded, selectedFilterBox, onSetSelectedFilterBox, setSelectedFilterBox }) {
  const isExpandedModalOpen = useSelector((storeState) => storeState.systemModule.isExpandedModalOpen)
  const order = useSelector(store => store.orderModule.order)

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  const isFirstTimeExpandedRef = useRef(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFilterExpanded) isFirstTimeExpandedRef.current = true
  }, [isFilterExpanded])
  const modalContainerRef = useRef(null)

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      case 'select-multiple':
        const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
        value = selectedOptions
        break

      default:
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

  }

  function handleItemClick(item) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, country: item }))
  }

  function onClickModal() {
    if (isFilterExpanded) {
      if (!isFirstTimeExpandedRef.current) {
        dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
        setSelectedFilterBox('all')
      } else {
        dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
      }
      isFirstTimeExpandedRef.current = false
    }
  }

  function onSubmit(ev) {
    ev.preventDefault()
    updateFilterBy(filterByToEdit)
  }

  const dropdownRef = useClickOutside(() => {
    if (modalContainerRef.current && modalContainerRef.current.contains(event.target)) {
      return
    }
    onClickModal()
  })

  const { country = '' } = filterByToEdit


  return (
    <section className={`filter-expanded-container full ${isFilterExpanded ? '' : 'folded'}`}>
      <section className={`filter-expanded ${selectedFilterBox === 'all' ? ' all' : ''}`} ref={dropdownRef}>
        <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name='where' onClick={onSetSelectedFilterBox}>
          <section className='where'>
            <h3>Where</h3>
            <input type='text' value={country} name='country' id='country' onChange={handleChange} placeholder='Search destinations' />

          </section>
        </article>

        <article
          className={`check-in-container${selectedFilterBox === 'check-in' ? ' active' : ''}`}
          name='check-in'
          onClick={onSetSelectedFilterBox}
        >
          <section className='check-in'>
            <h3>Check in</h3>
            <span>{order.startDate || 'Add date'}</span>
          </section>
        </article>

        <article
          className={`check-out-container${selectedFilterBox === 'check-out' ? ' active' : ''}`}
          name='check-out'
          onClick={onSetSelectedFilterBox}
        >
          <section className='check-out'>
            <h3>Check out</h3>
            <span>{order.endDate || 'Add date'}</span>
          </section>
        </article>

        <article className={`who-container${selectedFilterBox === 'who' ? ' active' : ''}`} name='who' onClick={onSetSelectedFilterBox}>
          <section className='who-search'>
            <section className='who'>
              <h3>Who</h3>
              <span>
                {order.guests.adults + order.guests.children + order.guests.infants > 1 ? order.guests.adults + order.guests.children + order.guests.infants : ''} {order.guests.adults + order.guests.children + order.guests.infants > 1 ? 'guests' : 'Add guests'}
              </span>
            </section>
            <section className='btn-search-container'>
              <AirbnbBtn callBackFunction={(ev) => onSubmit(ev)}>
                <section className='btn-search-content'>
                  <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/search-filter_gjckwb.svg' />
                  <span className='search-txt'>Search</span>
                </section>
              </AirbnbBtn>
              <button onClick={(ev) => onSubmit(ev)} className='btn-filter'>
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/search-filter_gjckwb.svg' />
              </button>
            </section>
          </section>
        </article>

        <div className='size-less'>
          {isExpandedModalOpen && selectedFilterBox !== 'all' && (
            <div className={`modal ${`${selectedFilterBox}-modal`}`}>
              {selectedFilterBox === 'where' && (
                <>
                  <CountryFilter handleItemClick={handleItemClick} /> <StayLocation handleItemClick={handleItemClick} />
                </>
              )}
              {(selectedFilterBox === 'check-in' || selectedFilterBox === 'check-out') && <StayDate setSelectedFilterBox={setSelectedFilterBox} />}
              {selectedFilterBox === 'who' && <StayGusts />}
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
