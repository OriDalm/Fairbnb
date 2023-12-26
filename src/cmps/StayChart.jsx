
export function StayChart() {

    return (
        <section className='stay-chart'>
            <article>
                <h1>Total orders</h1>
                <p>30</p>
            </article>
            <article className=" flex space-between">
                <h2 className="pending">Pending</h2>
                <p>7</p>
            </article>
            <article className=" flex space-between">
                <h2 className="approve">Approve</h2>
                <p>18</p>
            </article>
            <article className=" flex space-between">
                <h2 className="reject">Reject</h2>
                <p>5</p>
            </article>
        </section>
    )
}
