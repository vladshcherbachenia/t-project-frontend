import React, {Component} from 'react'
import Wrapper from '../Wrapper'
import axios from "axios";
import {User} from "../../classes/User";
import {Link} from 'react-router-dom';
import Paginator from "../components/Paginator";
import Deleter from "../components/Deleter";

class Users extends Component<any> {
    state = {
        users: [],
        page: 1,
        last_page: 0
    }

    componentDidMount = async () => {
        const response = await axios.get(`users?page=${this.state.page}`)
        this.setState({
            users: response.data.data
        })

        this.setState({
            last_page: response.data.data.last_page
        })
    }

    handlePageChange = async (page:number) => {
        this.state.page = page
        await this.componentDidMount()
    }

    delete = async (id:any) => {
        await axios.delete(`users/${id}`)
        this.componentDidMount()
    }

    handleDelete = (id:any) => {
        this.componentDidMount()
    }

    render() {
        return (
            <Wrapper>
                <div>
                    <h2>Пользователи</h2>
                    <div className="table-responsive">
                        <div >
                            <Link to={'/users/create'} type="button" className="btn btn-primary">Добавить пользовотеля</Link>
                        </div>
                        <br/>
                        <div className='pagination' style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <Paginator lastPage={this.state.last_page}  handlePageChange={this.handlePageChange}/>
                        </div>
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map((user: User) => {
                                    return (<tr key={user.id}>
                                        <td>#ide{user.id}</td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <Link to={`/users/${user.id}/edit`} className="btn btn-success">Изменить</Link>
                                            <button type="button" onClick={() => this.delete(user.id)}  className="btn btn-danger">Удалить</button>
                                            <Deleter id={user.id} endpoint={'users'}
                                                     handleDelete={this.handleDelete}/>
                                        </td>
                                    </tr>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default Users;