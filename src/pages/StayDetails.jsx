import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { Reservation } from '../cmps/Reservation.jsx'
import { ReviewPreview } from '../cmps/ReviewPreview.jsx'
import { WishlistIcon } from '../cmps/WishlistIcon.jsx'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_FOCUSED_MODAL, SET_APP_MODAL_ABOUT, SET_APP_MODAL_AMENITIES, SET_APP_MODAL_REVIEWS, SET_FOCUSED_MODAL } from '../store/system.reducer.js'
import { Modal } from '../cmps/Modal.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx'
import useIsMobile from '../customHooks/useIsMobile.js'
import { ReservationMobile } from '../cmps/ReservationMobile.jsx'
import { DetailsHeaderMobile } from '../cmps/DetailsHeaderMobile.jsx'
import { Loader } from '../cmps/Loader.jsx'

export function StayDetails({ filterByToEdit, setFilterByToEdit }) {
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const [isModalActive, setIsModalActive] = useState(false)
  const isMobile = useIsMobile()
  console.log(isMobile);
  const dispatch = useDispatch()
  useEffect(() => {
    function handleScroll() {
      dispatch({ type: CLOSE_EXPANDED_HEADER })
      dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
      dispatch({ type: REMOVE_FOCUSED_MODAL })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [stay, setStay] = useState(null)
  const [clr, setClr] = useState('#00000080')
  const [btnTxt, setBtnTxt] = useState('Save')
  const { stayId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadStay()
  }, [stayId])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Had issues in stay details', err)
      showErrorMsg('Cannot load stay')
      navigate('/stay')
    }
  }

  function onWishlistIcon() {
    if (clr === '#00000080') {
      setClr('#ff385c')
      setBtnTxt('Saved')
    } else {
      setClr('#00000080')
      setBtnTxt('Save')
    }
  }

  function handleShowMore(modalType) {
    dispatch({ type: modalType })
    setIsModalActive((prevModal) => !prevModal)
    document.body.classList.add('modal-open')
  }

  let firstEightAmenities
  if (stay) {
    firstEightAmenities = stay.amenities.slice(0, 8)
  }

  myArray: [
    { number: 1, title: 'Users', image: '../../../assets/images/website/homepage/users.png' },
    { number: 2, title: 'Clients', image: '../../../assets/images/website/homepage/clients.png' },
    { number: 3, title: 'Admin', image: '../../../assets/images/website/homepage/admins.png' },
  ]

  if (!stay) return <Loader />

  return (
    <>
      <section className='detail-container'>
        {appModal &&
          <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive} modalType={appModal} stay={stay} />}
        {!isMobile && <AppHeader filterByToEdit={filterByToEdit} setIsModalActive={setIsModalActive} setFilterByToEdit={setFilterByToEdit} />}
        {isMobile && <DetailsHeaderMobile onWishlistIcon={onWishlistIcon} setClr={clr} />}

        {isMobile &&
          <div className='detail-gallery-mobile'>
            <img src={stay.imgUrls[0]} alt='' />
          </div>}

        <section className={isMobile ? 'detail-title border-bottom detail-padding-bottom' : 'detail-title'}>
          <h1>{stay.name}</h1>

          <div className='flex space-between'>
            <div className='detail-subtitle'>
              <div className='stay-rating'>
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/star_pjyvxm.svg' />
                <span className='stay-rating-num'>{stay.rating} •</span>
              </div>
              <div onClick={() => handleShowMore(SET_APP_MODAL_REVIEWS)}>
                <p className='stay-review'  >{stay.reviews.length} reviews</p>
              </div>
              <span className='rating-dot'>•</span>
              <p className='stay-loc'>
                {stay.loc.city}, {stay.loc.country}
              </p>
            </div>

            {!isMobile && <button className='btn-wish-list' onClick={() => onWishlistIcon()}>
              <WishlistIcon onWishlistIcon={onWishlistIcon} setClr={clr} className='detail-wishlist-icon' />
              {btnTxt}
            </button>}
          </div>
        </section>

        {!isMobile && <div className='detail-gallery'>
          {stay.imgUrls.map((imgUrl, idx) => (
            <img key={idx} src={imgUrl} alt='' />
          ))}
        </div>}

        <section className='mid-section'>
          <div className='stay-details'>
            <div className='about-host border-bottom'>

              <div className='about-host-text'>
                <h2>
                  Entire {stay.type} hosted by {stay.host.fullname}
                </h2>

                <article>
                  <p>{stay.capacity} {stay.capacity > 1 ? 'guests' : 'guest'}</p>
                  <p><span>•</span> {stay.bedrooms} {stay.bedrooms > 1 ? 'bedrooms' : 'bedroom'}</p>
                  <p><span>•</span> {stay.capacity} {stay.capacity > 1 ? 'beds' : 'bed'}</p>
                  <p><span>•</span> 2 baths</p>
                </article>
              </div>

              <img className='user-icon' src={stay.host.thumbnailUrl} />
            </div>

            <div className='stay-highlights border-bottom'>
              <article>
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/self-check-in_azdjp4.svg' />
                <h4>Self check-in</h4>
                <p>Check yourself in with the lockbox.</p>
              </article>

              <article>
                <h4>{stay.host.fullname} is a Superhost</h4>
                <p>Superhosts are experienced, highly rated Hosts.</p>
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/superhost_oigndz.svg' />
              </article>

              <article>
                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218782/free-cancellation_kxuyql.svg' />
                <h4 className='one-rows'>Free cancellation before Nov 24.</h4>
              </article>
            </div>

            <div className='stay-description border-bottom'>
              <LongTxt txt={stay.summary} length={445} />

              <div>
                <button onClick={() => handleShowMore(SET_APP_MODAL_ABOUT)}>Show more</button>
                <img className='self-check-in' src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218790/right-arrow_pxdlnj.svg' />
              </div>
            </div>

            <section className='stay-amenities border-bottom'>
              <h2>What this place offers</h2>

              <div>
                {firstEightAmenities.map((amenity, idx) => (
                  <article key={idx}>
                    <img className='self-check-in' src={`../assets/img/${amenity}.svg`} />
                    <p>{amenity}</p>
                  </article>
                ))}
              </div>
              <button className='' onClick={() => handleShowMore(SET_APP_MODAL_AMENITIES)}>Show all {stay.amenities.length} amenities</button>
            </section>
          </div>

          {!isMobile ? <Reservation stay={stay} stayId={stayId} /> : <ReservationMobile stay={stay} stayId={stayId} />}
        </section>
        <ReviewPreview handleShowMore={handleShowMore} stay={stay} />
      </section>
    </>
  )
}
