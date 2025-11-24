"use client"
import useOrders from "@/utils/manageOrders";
import { FormValuesTypes } from "@/utils/Types"
import { Button, Card, Col, Popconfirm, Row } from "antd"

function OrderCard({ id, name, description, orders, payment_status, payment_form, cash_input }: FormValuesTypes) {
    const { finishPayment, finishOrder } = useOrders()
    function countTotal() {
        let total = 0;
        orders.forEach(o => (
            total += o.price * o.quantity
        ))

        return total.toLocaleString()
    }

    return (
        <>
            <Card
                title={`${name} - ${payment_form} ${cash_input ? `${cash_input}` : ''}`}
                size="small"
                style={{ border: "solid 0.5px #bbbbbb", marginBottom: '1rem', width: "280px" }}
                actions={[
                    <>
                    {
                        payment_status === 1 ?
                        <Button color="cyan" variant="solid">
                            Lunas
                        </Button>
                        :
                        <Popconfirm
                            title="Finish Payment"
                            description="Have the customer paid?"
                            onConfirm={() => finishPayment(id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button 
                                type="primary" 
                                color="pink"
                                variant="solid"
                            >
                                Belum Lunas
                            </Button>
                        </Popconfirm>
                    }
                    </>,
                    <>
                        <Button 
                            type="primary"
                            disabled={payment_status != 1}
                            onClick={() => finishOrder(id)}
                        >
                            Order Selesai
                        </Button>
                    </>
                ]}
            >
                <div className="text-gray-600">
                {
                    orders.map((o, i) => (
                        <Row align="middle" key={i}>
                           <Col span={16}>{ o.value.slice(0, 15) }</Col>
                           <Col span={4}>x{ o.quantity }</Col>
                           <Col span={4}>{ o.price.toLocaleString() }</Col>
                        </Row>
                    ))
                }

                    <Row align="middle" >
                        <Col span={20}><span className="font-bold">Total</span></Col>
                        <Col span={4}>{ countTotal() }</Col>
                    </Row>

                    {
                        description && <p className="mt-4"><span className="text-red-600">*</span>{ description }</p>
                    }
                </div>
            </Card>
        </>
    )
}

export default OrderCard
