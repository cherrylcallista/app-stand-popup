"use client"
import useOrders from "@/utils/manageOrders"
import OrderCard from "./OrderCard"

function Finished() {
    const { orders } = useOrders()
    const finishedOrder = orders.filter(o => o.finished == true)

    if (orders.length <= 0 || finishedOrder.length <= 0) {
        return (
            <div>
                No finished order
            </div>
        )
    }

    return (
        <div>
        {
            finishedOrder.map((o, i)=> (
                <div key={i}>
                    <OrderCard { ...o } key={i} />
                </div>
            ))
        }
        </div>
    )
}

export default Finished
