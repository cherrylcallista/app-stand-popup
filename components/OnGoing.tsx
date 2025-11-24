"use client"
import useOrders from '@/utils/manageOrders'
import OrderCard from './OrderCard'

function OnGoing() {
    const { orders } = useOrders()
    const onGoingOrder = orders.filter(o => o.finished == false)

    if (orders.length <= 0 || onGoingOrder.length <= 0) {
        return (
            <div>
                No on going order
            </div>
        )
    }

    return (
        <div>
        {
            onGoingOrder.map((o, i)=> (
                <div key={i}>
                    <OrderCard { ...o } key={i} />
                </div>
            ))
        }
        </div>
    )
}

export default OnGoing
