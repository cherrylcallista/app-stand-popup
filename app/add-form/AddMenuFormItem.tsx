import { Form, Space, Select, InputNumber, Button, Input } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form/Form'; 
import { MenuOptionTypes, OrderItemTypes } from '@/utils/Types';

const { Option } = Select;


const menuOptions: MenuOptionTypes[] = [
    { key: '1', value: 'Bakpao', label: 'Bakpao', price: 8000 },
    { key: '2', value: 'Tanghulu', label: 'Tanghulu', price: 12000 },
    { key: '3', value: 'Mantao', label: 'Mantao', price: 5000 },
    { key: '4', value: 'Sparking Lavender Kiss', label: 'Sparking Lavender Kiss', price: 10000 },
    { key: '5', value: 'Blue Tea Galaxy', label: 'Blue Tea Galaxy', price: 10000 },
    { key: '6', value: 'Lychee Rainbow Soda', label: 'Lychee Rainbow Soda', price: 10000 },
];

const defaultNewItemValue: Partial<OrderItemTypes> = { quantity: 1, price: 0 }; 

type AddMenuFormItemTypes = {
    form: FormInstance
}

function AddMenuFormItem({ form }: AddMenuFormItemTypes) { 
    function handleMenuChange(selectedMenuId: string, nameIndex: number) {
        const selectedMenu = menuOptions.find(opt => opt.value === selectedMenuId);
        const price = selectedMenu ? selectedMenu.price : 0;
        
        form.setFieldsValue({
            orders: {
                [nameIndex]: {
                    price: price, 
                } as OrderItemTypes
            }
        });
    };
    
    return (
        <Form.List name="orders">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space 
                            key={key} 
                            style={{ display: 'flex', marginBottom: 8, alignItems: 'start' }} 
                            align="center" 
                            className="w-full"
                        >
                            {/* Menu ID Selector */}
                            <Form.Item
                                { ...restField }
                                name={[name, 'value']} // Matches OrderItemTypes.value
                                rules={[{ required: true, message: 'Select a menu' }]}
                                className="grow w-full sm:w-auto mb-2 sm:mb-0"
                            >
                                <Select 
                                    placeholder="Select Menu" 
                                    size="large" 
                                    style={{ width: "100%" }}
                                    // Set price dynamically on selection
                                    onSelect={(value: string) => handleMenuChange(value, name)} 
                                >
                                    {menuOptions.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {/* Quantity Input */}
                            <Form.Item
                                { ...restField }
                                name={[name, 'quantity']}
                                rules={[{ required: true, message: 'Qty' }]}
                                initialValue={1}
                                className="w-24 shrink-0"
                            >
                                <InputNumber min={1} max={99} size="large" placeholder="Qty" />
                            </Form.Item>

                            {/* Hidden Price Input */}
                            <Form.Item
                                { ...restField }
                                name={[name, 'price']}
                                rules={[{ required: true, message: 'Price' }]}
                                className="w-24 shrink-0"
                                hidden
                            >
                                <InputNumber size="large" placeholder="Price" />
                            </Form.Item>

                            <Button 
                                type="primary" 
                                size="large" 
                                danger 
                                onClick={() => remove(name)}
                                icon={<DeleteOutlined />}
                            >
                                Remove
                            </Button>
                        </Space>
                    ))}

                    {/* Add Button */}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            size="large"
                            icon={<PlusOutlined />}
                            className="rounded-lg border-dashed mt-2 border-blue-400 text-blue-600"
                        >
                            Add Menu Item
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    )
}

export default AddMenuFormItem