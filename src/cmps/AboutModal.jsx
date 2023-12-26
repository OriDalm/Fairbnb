export function AboutModal({ stay }) {
    return (
        <section className="modal-about-container">
            <div className="about-title-container">
                <h1 className="about-title">About this space</h1>
            </div>
            <div className="about-summary">
                {stay.summary}
            </div>

        </section>
    )
}