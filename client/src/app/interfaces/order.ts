export interface Order_Interface {
    order_id: number,
    order_date: Date,
    user_id: number,
    user_name: string,
    __order__: object,
    address: object,
    card_N: number,
    user_comment: string,
    shipping_date: string,
    done: boolean,

    message: string
}
