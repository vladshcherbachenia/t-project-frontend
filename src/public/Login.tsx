import React from 'react'
import './login.css'
import axios from "axios";
import {Navigate} from "react-router-dom";

class Login extends React.Component {
    email:string = '';
    password:string = '';
    state = {
        redirect: false
    }

    submit = async (event:any) => {
        event.preventDefault()

        let {data, status} = await axios.post('login', {
            email: this.email,
            password: this.password,
        })

        localStorage.setItem('token', data['token']);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect)  return(
            <Navigate to="/"/>
        )
        return (<main className="form-signin">
            <form onSubmit={this.submit}>
                <div className='text-center'><img src="/favicon.ico" alt="" width="72" height="72"/></div>
                    <h1 className="h3 mb-3 fw-normal text-center">Админ панель</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                               onChange = {e => this.email = e.target.value}/>
                            <label htmlFor="floatingInput">Почта</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль"
                               onChange = {e => this.password = e.target.value}/>
                            <label htmlFor="floatingPassword">Пароль</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Забыл пароль
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
            </form>
        </main>)
    }
}
export default Login