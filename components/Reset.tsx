import useOrders from "@/utils/manageOrders"
import { Button, message, Popconfirm } from "antd"

function Reset() {
    const { reset } = useOrders()
    const [ messageApi, contextHolder ] = message.useMessage()
    
    return (
        <div>
            { contextHolder }
            <Popconfirm
                title="Reset all order data?"
                description="This action is irreversible."
                onConfirm={() => {
                    reset()
                    messageApi.success("Reset successful")
                }}
                onCancel={() => messageApi.error("Canceled")}
                okText="Yes"
                cancelText="No"
            >
                <Button 
                    type="primary" 
                >
                    Reset
                </Button>
            </Popconfirm>
        </div>
    )
}

export default Reset
