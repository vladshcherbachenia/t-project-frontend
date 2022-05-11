import React, {Component, SyntheticEvent} from 'react';
import Wrapper from "../Wrapper";
import axios from 'axios';
import {User} from "../../classes/User";
import {connect} from "react-redux";
import setUser from "../../redux/actions/setUserAction";

class Profile extends Component<any> {
    state = {
        first_name: '',
        last_name: '',
        email: '',
    }
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';

    updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.put('info/users', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
        })

        const user: User = response.data;

        this.props.setUser(new User(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.role,
        ));
    }

    updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('info/password', {
            password: this.password,
            password_confirm: this.password_confirm
        })
    }

    render() {
        return (
            <Wrapper>

                <h2>Ваш профиль</h2>
                <hr/>
                <form onSubmit={this.updateInfo}>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" className="form-control" name="first_name"
                               defaultValue={this.first_name = this.props.user.first_name}
                               onChange={e => this.first_name = e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Фамилия</label>
                        <input type="text" className="form-control" name="last_name"
                               defaultValue={this.last_name = this.props.user.last_name}
                               onChange={e => this.last_name = e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Почта</label>
                        <input type="text" className="form-control" name="email"
                               defaultValue={this.email = this.props.user.email}
                               onChange={e => this.email = e.target.value}
                        />
                    </div>

                    <button className="btn btn-outline-secondary">Сохранить</button>
                </form>

                <h2 className="mt-4">Поменять пароль</h2>
                <hr/>
                <form onSubmit={this.updatePassword}>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" name="password"
                               autoComplete="new-password"
                               onChange={e => this.password = e.target.value}
                        />
                    </div>
                    <div className="form-group">
                        <label>Повторить пароль</label>
                        <input type="password" className="form-control" name="password_confirm"
                               autoComplete="new-password"
                               onChange={e => this.password_confirm = e.target.value}
                        />
                    </div>

                    <button className="btn btn-outline-secondary">Сохранить</button>
                </form>
            </Wrapper>
        );
    }
}

// @ts-ignore
export default connect(state => ({user: state.user}), dispatch => ({setUser: user => dispatch(setUser(user))}))(Profile);