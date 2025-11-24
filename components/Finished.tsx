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

    function countPaymentForm(paymentForm: string) {
        let total = 0;
        orders.map(o => {
            if (o.payment_form === paymentForm) {
                total += 1
            }
        })

        return total
    }

    return (
        <div>
            <div className="flex gap-4 mb-4 font-bold">
                <p>Cash: { countPaymentForm("Cash") }</p>
                <p>Qris: { countPaymentForm("Qris") }</p>
                <p>ShopeePay: { countPaymentForm("ShopeePay") }</p>
            </div>

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
