import React, {Component} from 'react';
import Wrapper from '../Wrapper'
import axios from 'axios'
import {Permission} from "../../classes/Permission";
import './roles.css'
import {Navigate} from "react-router-dom";

export default class RoleCreate extends Component {
    state = {
        permissions: [],
        redirect: false
    }
    selected:number[] = []
    name:string = ''
    onSelect = (id:number) => {
        if(this.selected.filter(s => s === id).length > 0) {
            this.selected = this.selected.filter(s => s !== id)
            return
        }
        this.selected.push(id)
    }
    componentDidMount = async() => {
        const response = await axios.get('permissions')
        const permissions = response.data.data
        this.setState({
            permissions
        })
    }
    submit = async (event:any) => {
        event.preventDefault()

        if(this.name.length === 0) {
            alert('Пустое значение')
            return
        }

        const role = await axios.post('roles', {
            name: this.name,
            permissions: this.selected
        })

        this.setState({
            redirect: true
        })

        console.log(role)
    }
    render() {
        if(this.state.redirect)  return(
            <Navigate to="/roles"/>
        )
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <h3 className="h3 mb-3 fw-normal">Создать роль</h3>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Роль"
                               onChange = {e => this.name = e.target.value}/>
                        <label htmlFor="floatingInput">Роль</label>
                    </div>
                    <div className="checkbox mb-3">
                    {
                        this.state.permissions.map((item:Permission) => {
                            return (
                                <label key={item.id} className="labelItem">
                                    <input onChange={() => this.onSelect(item.id)} type="checkbox" value="remember-me"/> {item.name}
                                </label>)
                        })
                    }
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
                </form>
            </Wrapper>
        )
    }
}