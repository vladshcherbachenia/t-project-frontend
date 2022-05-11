import React, {Component} from 'react'
import Wrapper from '../Wrapper'
import axios from "axios";
import {Navigate} from "react-router-dom";

export default class UserCreate extends Component {
    state = {
        roles: [],
        redirect: false
    }
    first_name = ''
    last_name = ''
    email = ''
    role_id = 0
    password = ''
    componentDidMount = async () => {
        const response = await axios.get(`roles`)
        this.setState({
            roles: response.data.data
        })
    }

    submit = async (event:any) => {
        event.preventDefault()

        const {data, status} = await axios.post('users', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role_id: this.role_id,
            password: this.password,
        })

        if (status === 201) {
            this.setState({
                redirect:true
            })
        }

        alert('Произошла ошибка')
    }

    render() {
        if(this.state.redirect)  return(
            <Navigate to="/users"/>
        )
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <h3 className="h3 mb-3 fw-normal">Создать пользователя</h3>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Ваше Имя"
                               onChange = {e => this.first_name = e.target.value}/>
                        <label htmlFor="floatingInput">Ваше Имя</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputLastName" placeholder="Ваше Фамилия"
                               onChange = {e => this.last_name = e.target.value}/>
                        <label htmlFor="floatingInputLastName">Ваше Фамилия</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="emailName" placeholder="Почта"
                               onChange = {e => this.email = e.target.value}/>
                        <label htmlFor="emailName">Почта</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="passwordName" placeholder="Пароль"
                               onChange = {e => this.password = e.target.value}/>
                        <label htmlFor="passwordName">Пароль</label>
                    </div>
                    <select className="form-select form-select" aria-label=".form-select"
                        onChange = {e => this.role_id = parseInt(e.target.value)}
                    >
                        <option>Выбрать роль</option>
                        {
                            this.state.roles.map((item) => {
                                return <option value={item['id']} key={item['id']}>{item['name']}</option>
                            })
                        }
                    </select>
                    <button  className="w-100 btn btn-lg btn-primary" type="submit">Создать</button>
                </form>
            </Wrapper>
        )
    }
}