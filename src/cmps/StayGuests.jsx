import { useSelector } from 'react-redux'
import { updateOrderDetails } from '../store/order.actions'

export function StayGusts({ width = 326 }) {

  const order = useSelector(store => store.orderModule.order)

  function onAddGuest(type, diff) {
    order.guests[type] += diff
    if (order.guests.adults < 1) {
      order.guests.adults = 1
    } else if (order.guests[type] < 0) {
      order.guests[type] = 0
    }
    updateOrderDetails(order)
  }

  return (
    <section className='guests-preview-container'>
      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Adults</h3>
          <p>Ages 13 or above</p>
        </section>

        <section className='guests-counter'>
          <button className={order.guests.adults < 2 ? 'disabled' : ''} onClick={() => onAddGuest('adults', -1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218787/minus_xuvjzr.svg' />
          </button>
          <span>{order.guests.adults}</span>
          <button onClick={() => onAddGuest('adults', 1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218788/plus_jnyuxe.svg' />
          </button>
        </section>
      </article>

      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Children</h3>
          <p>Ages 2-12</p>
        </section>

        <section className='guests-counter'>
          <button className={order.guests.children < 1 ? 'disabled' : ''} onClick={() => onAddGuest('children', -1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218787/minus_xuvjzr.svg' />
          </button>
          <span>{order.guests.children}</span>
          <button onClick={() => onAddGuest('children', 1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218788/plus_jnyuxe.svg' />
          </button>
        </section>
      </article>

      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Infants</h3>
          <p>Under 2</p>
        </section>

        <section className='guests-counter'>
          <button className={order.guests.infants < 1 ? 'disabled' : ''} onClick={() => onAddGuest('infants', -1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218787/minus_xuvjzr.svg' />
          </button>
          <span>{order.guests.infants}</span>
          <button onClick={() => onAddGuest('infants', 1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218788/plus_jnyuxe.svg' />
          </button>
        </section>
      </article>

      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Pets</h3>
          <p className='pets'>Bringing a service animal?</p>
        </section>

        <section className='guests-counter'>
          <button className={order.guests.pets < 1 ? 'disabled' : ''} onClick={() => onAddGuest('pets', -1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218787/minus_xuvjzr.svg' />
          </button>
          <span>{order.guests.pets}</span>
          <button onClick={() => onAddGuest('pets', 1)}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218788/plus_jnyuxe.svg' />
          </button>
        </section>

      </article>

    </section>
  )
}
