import { useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'

import { WishlistIcon } from './WishlistIcon'
import { PreviewCarousel } from './PreviewCarousel'
import { showSuccessMsg } from '../services/event-bus.service'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

export function StayPreview({ stay }) {

  const navigate = useNavigate()
  const [setClr, onSetClr] = useState('#00000080')

  function onStay(stayId) {
    return navigate(`/stay/${stayId}`)
  }

  function onWishlistIcon() {
    if (setClr === '#00000080') {
      onSetClr('#ff385c')
      showSuccessMsg('Toy added')
    } else {
      onSetClr('#00000080')
    }
  }

  return (
    <Fragment>

      <section className='preview-card'>

        <section className='wishlist-btn-container'>
          {<PreviewCarousel stay={stay} />}
          <button className='wishlist-icon-btn'>
            <WishlistIcon onWishlistIcon={onWishlistIcon} setClr={setClr} className='preview-wishlist-icon' />
          </button>
        </section>

        <article className='stay-preview' onClick={() => onStay(stay._id)} >

          {<div className='stay-loc'>{stay.loc.city}, {stay.loc.country}</div> || <Skeleton />}

          <div className='stay-rating'><img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/star_pjyvxm.svg' />{stay.rating}</div>
          <p className='stay-distance'>3,267 kilometers away</p>
          <p className='stay-date'>Oct 6-11</p>

          <div className='stay-price'>${stay.price} <span>night</span></div>

        </article>
      </section>
    </Fragment>
  )
}
