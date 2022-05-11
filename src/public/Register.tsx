import React from 'react'
import './login.css'
import axios from 'axios'
import {Navigate} from 'react-router-dom'

class Register extends React.Component<any, any>{
    firstName: string = "";
    lastName: string = "";
    email:string = "";
    password:string = "";
    confirmPassword:string = "";
    state = {
        redirect: false
    }

    submit = async (event:any) => {
        event.preventDefault()

        let {data, status} = await axios.post('register', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.confirmPassword
        })

        if(status === 201) {
            this.setState({
                redirect: true
            })
        }
    }
    render() {
        if(this.state.redirect)  return(
            <Navigate to="/login"/>
        )
        return (<main className="form-signin">
            <form onSubmit={this.submit}>
                <div className='text-center'><img src="/favicon.ico" alt="" width="72" height="72"/></div>
                <h1 className="h3 mb-3 fw-normal text-center">Зарегаться панель</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="firstName" placeholder="Иван"
                        onChange = {e => this.firstName = e.target.value}
                    />
                    <label htmlFor="firstName">Имя</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="lastName" placeholder="Иванович"
                        onChange = {e => this.lastName = e.target.value}
                    />
                    <label htmlFor="lastName">Фамилия</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="ivan@ivan.com"
                        onChange = {e => this.email = e.target.value}
                    />
                    <label htmlFor="email">Почта</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль"
                        onChange = {e => this.password = e.target.value}
                    />
                    <label htmlFor="floatingPassword">Пароль</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Повторить пароль"
                        onChange = {e => this.confirmPassword = e.target.value}
                    />
                    <label htmlFor="confirmPassword">Повторить пароль</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Зарегистрироваться</button>
            </form>
        </main>)
    }
}
export default Register