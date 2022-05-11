import React, {Component} from "react";
import Wrapper from "../Wrapper";
import {Link} from "react-router-dom";
import axios from 'axios'
import {Role} from '../../classes/Role'
import Deleter from "../components/Deleter";

export default class Roles extends Component <any> {
    state = {
        roles: []
    }
    componentDidMount = async () => {
        const response = await axios.get('roles')
        const roles = response.data.data
        this.setState({
            roles
        })
    }

    delete = async (id:any) => {
        await axios.delete(`roles/${id}`)
        this.componentDidMount()
    }

    handleDelete = (id:any) => {
        this.componentDidMount()
    }

    render() {
        return (
            <Wrapper>
                <div>
                    <h2>Роли</h2>
                    <div className="table-responsive">
                        <div >
                            <Link to={'/roles/create'} type="button" className="btn btn-primary">Добавить роль</Link>
                        </div>
                        <br/>
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.roles.map((role:Role) => (
                                    <tr>
                                        <td>#ide${role.id}</td>
                                        <td>${role.name}</td>
                                        <td>
                                            <Link to={`/roles/${role.id}/edit`} className="btn btn-success">Изменить</Link>
                                            <Deleter id={role.id} endpoint={'roles'}
                                                     handleDelete={this.handleDelete}/>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Wrapper>
        )
    }
}