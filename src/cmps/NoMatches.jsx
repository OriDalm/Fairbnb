import { loadStays } from "../store/stay.actions";

export function NoMatches() {

    return (
        <section className="no-match">
            <h1>No exact matches</h1>
            <p>Try changing or removing some of your filters or adjusting your search area.</p>

            <button onClick={() => loadStays()}>Remove filter</button>
        </section>
    )
}
