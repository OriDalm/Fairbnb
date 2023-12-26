export function CountryFilter({ handleItemClick }) {
  return (
    <div className='country-filter-container'>
      <h3>Trending</h3>
      <ul className='country-filter clean-list'>
        <li className='country' onClick={() => handleItemClick('Porto')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Porto, Portugal</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Montreal')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Montreal, Canada</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Barcelona')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Barcelona, Spain</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Berlin')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Berlin, Germany</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Tokyo')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Tokyo, Japan</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Seoul')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Seoul, South Korea</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Bern')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Bern, Switzerland</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Paris')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Paris, France</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Rome')}>
          <div className='location-container'>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/location_a1ev2q.svg' />
          </div>
          <span>Rome, Italy</span>
        </li>
      </ul>
    </div>
  )
}
