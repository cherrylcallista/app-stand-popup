"use client"
import { useState } from 'react';
import { Form, Input, Button, Typography, Radio, message } from 'antd';
import AddMenuFormItem from './AddMenuFormItem';
import { useRouter } from 'next/navigation';
import useOrders from '@/utils/manageOrders';
import { FormValuesTypes, OrderItemTypes } from '@/utils/Types';
import { finished } from 'stream';

const { TextArea } = Input;
const { Title } = Typography;

type InitialFormValuesTypes = {
    orders: OrderItemTypes[];
    name: string;
    description?: string;
    payment_status: 0 | 1;
}

function page() {
    const router = useRouter()
    const [ form ] = Form.useForm();
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ messageApi, contextHolder ] = message.useMessage()
    const { add } = useOrders()

    function SubmitButton() {
        return (
            <Form.Item className="pt-4">
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    size="large"
                    className="w-full bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                >
                    {isSubmitting ? 'Processing Order...' : 'Place Order'}
                </Button>
            </Form.Item>
        )
    }

    function onSubmit(values: InitialFormValuesTypes) {
        if (!values.orders || values.orders.length <= 0) {
            return messageApi.error("No Order Placed");
        } else {
            setIsSubmitting(true)
            const newId = Date.now() * 1; 
            
            const newOrder = { id: newId, ...values, finished: false }
            add(newOrder)
            form.resetFields()

            setIsSubmitting(false)
            router.push("/")
        }
    }

    return (
        <div className="min-h-screen max-w-lg">
            { contextHolder }
            <Form
                form={form}
                layout="vertical"
                className="space-y-4"
                onFinish={onSubmit}
                initialValues={{
                    payment_status: 0
                }}
            >
                <Title level={5} className="text-gray-700 font-semibold mb-2">
                    Menu Selected
                </Title>
                {/* Menu Selection */}
                <AddMenuFormItem form={form} />

                {/* Customer Name */}
                <Form.Item
                    name="name"
                    label={<Title level={5} className="text-gray-700 font-semibold mb-2">Customer Name</Title>}
                    className="mt-6"
                >
                    <Input required size="large" />
                </Form.Item>
            
                {/* Notes */}
                <Form.Item
                    name="description"
                    label={<Title level={5} className="text-gray-700 font-semibold mb-2">Notes</Title>}
                    className="mt-6"
                >
                    <TextArea 
                        rows={4} 
                    />
                </Form.Item>

                {/* Payment Status */}
                <Form.Item
                    name="payment_status"
                    label={<Title level={5} className="text-gray-700 font-semibold mb-2">Payment Status</Title>}
                    className="mt-6"
                >
                    <Radio.Group
                        options={[
                            { value: 1, label: 'Lunas' },
                            { value: 0, label: 'Belum Lunas' },
                        ]}
                    />
                </Form.Item>

                <SubmitButton />
            </Form>
        </div>
    );
}

export default page