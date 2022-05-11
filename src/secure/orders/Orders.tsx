import React, {Component} from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import {Order} from "../../classes/Order";
import Paginator from "../components/Paginator";
import {Link} from "react-router-dom";

export default class Orders extends Component {
    state = {
        orders: [],
        page: 1,
        last_page: 0
    }

    componentDidMount = async () =>{
        const response = await axios.get(`orders?page=${this.state.page}`)
        const orders = response.data.data
        this.setState({
            orders
        })
        console.log(orders)
    }

    handlePageChange = (page:number) => {
        this.state.page = page
        this.componentDidMount()
    }

    handleExport = async () => {
        const response = await axios.get('export', {responseType: 'blob'});
        const blob = new Blob([response.data], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
    }

    render() {
        return (
            <Wrapper>
                <div>Все заказы</div>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <a onClick={this.handleExport} className="btn btn-sm btn-outline-secondary">Export</a>
                    </div>
                </div>
                <div className='pagination' style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Paginator lastPage={this.state.last_page}  handlePageChange={this.handlePageChange}/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#ide</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.orders.map((order:Order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.first_name} {order.last_name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/orders/${order.id}`}
                                                  className="btn btn-sm btn-outline-secondary">View</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </Wrapper>
        )
    }
}