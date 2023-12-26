// import logo from '../assets/img/Airbnb-logo.png'
import userIcon from '../assets/img/user.svg'
import { OPEN_EXPANDED_HEADER, OPEN_EXPANDED_HEADER_MODAL, SET_FOCUSED_MODAL } from '../store/system.reducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterExpanded } from './FilterExpanded'
import { Link } from 'react-router-dom'
import { UserModal } from './UserModal'
import { useClickOutside } from '../customHooks/useCloseModule'

export function DesktopHeader({ onSetFilter, setFilterByToEdit, filterByToEdit, setIsModalActive }) {
  const [selectedFilterBox, setSelectedFilterBox] = useState('where')
  const isFilterExpanded = useSelector((storeState) => storeState.systemModule.isFilterExpanded)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const dropdownRef = useClickOutside(onDropdownClickOutside)
  const user = useSelector((storeState) => storeState.userModule.user)


  const dispatch = useDispatch()
  function toggleDropdown(ev) {
    ev.preventDefault()
    setIsDropdownActive((prevDropdown) => !prevDropdown)
  }

  function onDropdownClickOutside() {
    setIsDropdownActive(false)
  }

  function onExpandedFilter(ev) {
    ev.preventDefault()
    dispatch({ type: OPEN_EXPANDED_HEADER })
    dispatch({ type: SET_FOCUSED_MODAL })
  }

  function onSetSelectedFilterBox(ev) {
    ev.preventDefault()
    dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
    const field = ev.currentTarget.getAttribute('name')
    if (selectedFilterBox !== field) setSelectedFilterBox(field)
  }

  return (
    <>
      <header className='app-header'>
        <Link to={'/'} className='logo-container'>
          <img className='logo' src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218793/Airbnb-logo_rofejj.png' style={{ maxWidth: '100px' }} />
          <p>Fairbnb</p>
        </Link>
        {!isFilterExpanded && (
          <section className='any-container' onClick={onExpandedFilter}>
            <button>
              <div className='search-txt anywhere'>Anywhere</div>
              <div className='separator'></div>
              <div className='search-txt any-week'>Any week</div>
              <div className='separator'></div>
              <div className='guests search-txt'>Add guests </div>
              <div className='search-container'>
                <div className='btn-search'>
                  <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/search_aptykj.svg' />
                </div>
              </div>
            </button>
          </section>
        )}
        {isFilterExpanded && (
          <section className='searchbar'>

            <span className='experiences'>Search your next trip!</span>

          </section>
        )}
        {/* <LoginSignup /> */}
        <section className='user-container' onClick={(ev) => toggleDropdown(ev)} ref={dropdownRef}>
          <button className='user-btn'>
            <img className='hamburger' src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218783/hamburger_gzxzmt.svg' />
            {user && <img className='user-icon' src={user.imgUrl} />}
            {!user && <img className='user-icon' src={userIcon} />}
          </button>
          {isDropdownActive && <UserModal setIsModalActive={setIsModalActive} setIsDropdownActive={setIsDropdownActive} />}
        </section>
      </header>

      <FilterExpanded
        onSetFilter={onSetFilter}
        isFilterExpanded={isFilterExpanded}
        selectedFilterBox={selectedFilterBox}
        setSelectedFilterBox={setSelectedFilterBox}
        onSetSelectedFilterBox={onSetSelectedFilterBox}
        filterByToEdit={filterByToEdit}
        setFilterByToEdit={setFilterByToEdit}
      />
    </>
  )
}
