import { create } from 'zustand'
import { persist } from 'zustand/middleware' 
import { FormValuesTypes } from './Types'

type useOrdersTypes = {
  orders: FormValuesTypes[]
  add: (newOrder: FormValuesTypes) => void
  reset: () => void,
  finishPayment: (id: number) => void,
  finishOrder: (id: number) => void
}

const useOrders = create<useOrdersTypes>()(
    persist(
        (set) => ({
            orders: [],
            add: (newOrder) => set((state) => ({ 
                orders: [ newOrder, ...state.orders  ]
            })),

            reset: () => set((state) => ({ orders: [] })),

            finishPayment: (id) => set((state) => ({
                orders: state.orders.map(o => 
                    o.id === id ? { ...o, payment_status: 1 } : o                              
                )
            })),

            finishOrder: (id) => set((state) => ({
                orders: state.orders.map(o => 
                    o.id === id ? { ...o, finished: true } : o                              
                )
            }))
        }),
        {
            name: 'order', 
        }
    )
)

export default useOrders