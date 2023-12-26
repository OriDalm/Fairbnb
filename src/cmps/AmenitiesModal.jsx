export function AmenitiesModal({ stay }) {
    return (
        <section className="modal-amenities-container">
            <div className="amenities-title-container">
                <h1>What this place offers</h1>
            </div>
            <section>
                {stay.amenities.map((amenity, idx) => (
                    <article className="amenities-container" key={idx}>
                        <img src={`../assets/img/${amenity}.svg`} />
                        <p>{amenity}</p>
                    </article>
                ))}
            </section>
        </section>
    )
}