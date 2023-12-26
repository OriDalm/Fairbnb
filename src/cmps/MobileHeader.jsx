export function MobileHeader() {
    return (
        <section className="mobile-header-container">
            <section className='any-container' >
                <button className="btn-header">
                    <section className='search-container'>
                        <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699386597/search-mobile_dv1bf1.svg' />
                    </section>
                    <section className='search-options'>
                        <div className='search-txt anywhere'>Anywhere</div>

                        <section className='lower-options'>
                            <div className='search-txt any-week'>Any week </div>
                            <div className='mobile-dot'>•</div>
                            <div className='guests search-txt'>Add guests </div>
                        </section>

                    </section>
                </button>
                <button className="btn-filter-mobile">
                    <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218786/filterSvg_xd4c8m.svg' />
                </button>
            </section>

        </section>

    )
}