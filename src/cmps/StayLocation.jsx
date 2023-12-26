export function StayLocation({ handleItemClick }) {
  return (
    <section className='locations-container'>
      <h3>Search by region</h3>
      <div className='locations'>
        <article className='flexible flex'>
          <button className='regions' onClick={() => handleItemClick('')}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218786/flexible_llflfp.jpg' />
          </button>
          <h5>I'm flexible</h5>
        </article>
        <article className='middle-east flex'>
          <button className='regions' onClick={() => handleItemClick('Middle East')}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218786/middle-east_dlupbi.jpg' />
          </button>
          <h5>Middle East</h5>
        </article>
        <article className='italy flex'>
          <button className='regions' onClick={() => handleItemClick('portugal')}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218789/portugal_igbfhi.jpg' />
          </button>
          <h5>Portugal</h5>
        </article>
        <article className='united-states flex'>
          <button className='regions' onClick={() => handleItemClick('United States')}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218792/united-states_guzofm.jpg' />
          </button>
          <h5>United States</h5>
        </article>
        <article className='greece flex'>
          <button className='regions' onClick={() => handleItemClick('Greece')}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218783/greece_zg3yh3.jpg' />
          </button>
          <h5>Greece</h5>
        </article>
        <article className='south-america flex'>
          <button className='regions' onClick={() => handleItemClick('South America')}>
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218791/south-america_frcone.jpg' />
          </button>
          <h5>South America</h5>
        </article>
      </div>
    </section>
  )
}
