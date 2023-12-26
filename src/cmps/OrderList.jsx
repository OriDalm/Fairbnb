import { OrderPreview } from './OrderPreview'

export function OrderList({ hostOrders, onChangeStatus }) {

    if (!hostOrders) return <div>Loading...</div>
    return (
        <section className='order-list-container'>

            <article className="order-list border-bottom">
                <p>Guest</p>
                <p>Check-in</p>
                <p>Checkout</p>
                <p>Listing</p>
                <p>Total Price</p>
                <p>Status</p>
                {/* <p>To do</p> */}
            </article>

            <ul className='order-container clean-list'>
                {hostOrders && hostOrders.map((order) => (
                    <li className='order' key={order._id}>
                        <OrderPreview order={order} onChangeStatus={onChangeStatus} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
