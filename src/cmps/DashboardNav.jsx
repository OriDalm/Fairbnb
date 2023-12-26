import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/user.actions"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SET_NAV_DASHBOARD, SET_NAV_HOMEPAGE, SET_NAV_TRIPS, SET_NAV_WISHLIST } from "../store/system.reducer"
export function DashboardNav() {
    const [selectedExperience, setSelectedExperience] = useState('')
    const dashNav = useSelector((storeState) => storeState.systemModule.dashNav)
    const dispatch = useDispatch()
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function toggleSelected(ev, navType) {
        ev.preventDefault()
        const field = ev.currentTarget.getAttribute('name')
        const value = ev.currentTarget.getAttribute('class')
        if (value === selectedExperience) {
            setSelectedExperience(null)
        } else {

            dispatch({ type: navType })

        }
    }

    return (
        <nav className="dashboard-nav">
            <section className='nav-options'>
                <article className={dashNav === SET_NAV_HOMEPAGE ? 'selected' : ''} name='stays' onClick={() => dispatch({ type: SET_NAV_HOMEPAGE })}>
                    <Link to={'/'}>

                        {/* <img src={homePage} /> */}
                        <svg viewBox="0 0 576 512">

                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                        </svg>
                        <span>Homepage</span>
                    </Link>
                </article>

                <article className={dashNav === SET_NAV_DASHBOARD ? 'selected' : ''} name='dashboard' onClick={() => dispatch({ type: SET_NAV_DASHBOARD })}>
                    <Link to={'/dashboard'}>
                        {/* <img src={chart} /> */}
                        <svg viewBox="0 0 448 512">
                            <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
                        </svg>
                        <span>Dashboard</span>
                    </Link>
                </article>

                <article className={dashNav === SET_NAV_WISHLIST ? 'selected' : ''} name='wishlist' onClick={() => dispatch({ type: SET_NAV_WISHLIST })}>
                    {/* <img src={wishlist} /> */}
                    <Link>
                        <svg viewBox="0 0 512 512">
                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                        <span>Wishlist</span>
                    </Link>
                </article>

                <article className={dashNav === SET_NAV_TRIPS ? 'selected' : ''} name='trips' onClick={() => dispatch({ type: SET_NAV_TRIPS })}>
                    <Link to={'/trips'}>
                        {/* <img src={trips} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" /></svg>

                        <span>Trips</span>
                    </Link>
                </article>
            </section>
            <article className="nav-logout" onClick={onLogout}>
                <Link to={'/'}>
                    <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699391244/nav-logout_jptwao.svg' />
                    <span>Logout</span>
                </Link>
            </article>


        </nav>
    )

}