import { useSelector } from "react-redux"
import useIsMobile from "../customHooks/useIsMobile"
import { Link } from "react-router-dom"
import { UserModal } from "./UserModal"
import { useClickOutside } from "../customHooks/useCloseModule"

export function MobileFooter({ toggleDropdown, setIsModalActive, setIsDropdownActive, isDropdownActive }) {
    const isMobile = useIsMobile()
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const dropdownRef = useClickOutside(onDropdownClickOutside)

    function onDropdownClickOutside() {
        setIsDropdownActive(false)
    }

    return (
        <>
            {isDropdownActive && isMobile && <section className={loggedInUser ? 'footer-user-modal' : 'footer-user-big'}>
                <UserModal setIsModalActive={setIsModalActive} setIsDropdownActive={setIsDropdownActive} />
            </section>
            }
            {isMobile && <footer className='mobile-footer'>

                <Link className='footer-search footer-options' to={'/'}>
                    <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699388931/footer-search_usghb6.svg' />
                    <span>Explore</span>
                </Link>

                <section className='footer-wishlist footer-options'>
                    <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699388919/footer-wishlist_penqoe.svg' />
                    <span>Wishlists</span>
                </section>

                <Link to={'/trips'} className='footer-trips footer-options'>
                    <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699388938/footer-trips_lvf3go.svg' />
                    <span>Trips</span>
                </Link>

                <section onClick={(ev) => toggleDropdown(ev)} className='footer-profile footer-options' ref={dropdownRef}>
                    <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699388925/footer-profile_eqe6vs.svg' />
                    <span>Profile</span>
                </section>

            </footer>
            }
        </>
    )
}