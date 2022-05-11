import React, {Component} from 'react'
import Wrapper from "../Wrapper";
import {Link} from "react-router-dom";
import axios from "axios";
import {Product} from "../../classes/Product";
import Paginator from "../components/Paginator";
import Deleter from "../components/Deleter";

export default class Products extends Component <any> {
    state = {
        products: [],
        page: 1,
        last_page: 0
    }

    products = async() => {
        const response = await axios.get(`products?page=${this.state.page}`)
        const products = response.data.data
        this.setState({
            products
        })
    }

    delete = async(id:number) => {
        await axios.delete(`products/${id}`)
        this.componentDidMount()
    }

    componentDidMount = () =>{
        this.products()
    }

    handlePageChange = (page:number) => {
        this.state.page = page
        this.componentDidMount()
    }

    handleDelete = (id:any) => {
        this.componentDidMount()
    }

    render() {
        return (
            <Wrapper>
                <h3>Продукты</h3>
                <div >
                    <Link to={'/products/create'} type="button" className="btn btn-primary">Создать продукт</Link>
                </div>
                <br/>
                <br/>
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
                        <th scope="col">Заголовок</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Картинка</th>
                        <th scope="col">Дейсвтие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products.map((product:Product) => {
                           return (
                               <tr>
                                   <td>{product.id}</td>
                                   <td>{product.title}</td>
                                   <td>{product.description}</td>
                                   <td>{product.price}</td>
                                   <td><img width="200" src={product.image}/></td>
                                   <td>
                                       <Link to={`/products/${product.id}/edit`} className="btn btn-success">Изменить</Link>
                                       <br/><br/>
                                       <Deleter id={product.id} endpoint={'products'}
                                                handleDelete={this.handleDelete}/>
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
