type MenuOptionTypes = {
    key: string;
    value: string;
    label: string;
    price: number;
};

type OrderItemTypes = {
    value: string; 
    quantity: number;
    price: number;
};

type FormValuesTypes = {
    id: number;
    orders: OrderItemTypes[];
    name: string;
    description?: string;
    payment_status: 0 | 1; 
    payment_form: "Cash" | "Qris" | "ShopeePay";
    cash_input?: number;
    finished: boolean;
};

export type { MenuOptionTypes, OrderItemTypes, FormValuesTypes }