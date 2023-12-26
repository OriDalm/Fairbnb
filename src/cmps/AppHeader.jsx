import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { SET_FILTER_BY } from '../store/stay.reducer'
import { DesktopHeader } from './DesktopHeader'
import { UserMsg } from './UserMsg'
import { MobileHeader } from './MobileHeader.jsx'
import useIsMobile from '../customHooks/useIsMobile.js'


export function AppHeader({ filterByToEdit, setFilterByToEdit, setIsModalActive }) {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.user)
  const isMobile = useIsMobile()


  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      console.log('signup 2');
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  return (
    <div className='app-header-container'>
      {/* <UserMsg /> */}
      {!isMobile && <DesktopHeader setIsModalActive={setIsModalActive} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} onSetFilter={onSetFilter} />
      }
      {isMobile && <MobileHeader setIsModalActive={setIsModalActive} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} onSetFilter={onSetFilter} />
      }
    </div>
  )
}
