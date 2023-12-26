import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP, SET_NAV_DASHBOARD, SET_NAV_TRIPS, SET_NAV_WISHLIST } from '../store/system.reducer'
import { logout } from '../store/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import useIsMobile from '../customHooks/useIsMobile'

export function UserModal({ setIsDropdownActive, setIsModalActive }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const appModal = useSelector((storeState) => storeState.userModule.appModal)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dashNav = useSelector((storeState) => storeState.systemModule.dashNav)
  const isMobile = useIsMobile()


  function onOpenModal(ev, modalType) {
    console.log(modalType);
    ev.preventDefault()
    ev.stopPropagation()
    setIsDropdownActive(false)
    dispatch({ type: modalType })
    setIsModalActive((prevModal) => !prevModal)
    document.body.classList.add('modal-open')
  }

  function onDashboard() {
    return navigate(`/dashboard`)
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <section className='dropdown-modal flex'>
      {loggedInUser ? (
        <>
          {!isMobile && <Link to={'/trips'} className='dropdown-option' onClick={() => dispatch({ type: SET_NAV_TRIPS })}>
            <span>Trips</span>
          </Link>
          }
          {!isMobile && <Link className='dropdown-option' onClick={() => dispatch({ type: SET_NAV_WISHLIST })} >
            <span>Wishlist</span>
          </Link>
          }
          <Link to={`/dashboard`} className='dropdown-option' onClick={() => dispatch({ type: SET_NAV_DASHBOARD })}>
            <span>Dashboard</span>
          </Link>
          <section onClick={onLogout} className='dropdown-option'>
            <span>Logout</span>
          </section>
        </>
      ) : (
        <>
          <article className='dropdown-option' onClick={(ev) => onOpenModal(ev, SET_APP_MODAL_LOGIN)}>
            <span>Log in</span>
          </article>
          <article className='dropdown-option' onClick={(ev) => onOpenModal(ev, SET_APP_MODAL_SIGNUP)}>
            <span>Sign up</span>
          </article>
        </>
      )}
    </section>
  )
}
