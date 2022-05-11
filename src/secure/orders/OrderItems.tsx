import React, {useState, useEffect} from 'react';
import Wrapper from "../Wrapper";
import axios from 'axios';
import {useParams} from "react-router-dom";
import {OrderItem as OrderItemObj} from "../../classes/OrderItem";


export default function OrderItem() {
    const { id } = useParams();
    const [order_items, set_order_items] = useState([])

    const getOrder = async () => {
        const response = await axios.get(`orders/${id}`)
        const orders = response.data.data.order_items
        set_order_items(orders)
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Заголовок продукта</th>
                        <th>Цена</th>
                        <th>Количество</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order_items.map(
                        (order_item: OrderItemObj) => {
                            return (
                                <tr key={order_item.id}>
                                    <td>{order_item.id}</td>
                                    <td>{order_item.product_title}</td>
                                    <td>{order_item.price}</td>
                                    <td>{order_item.quantity}</td>
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}
