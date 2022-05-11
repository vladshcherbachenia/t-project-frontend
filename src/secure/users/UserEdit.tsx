import React, {useState, useEffect} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import {User} from "../../classes/User"

export default function UserEdit() {
    const [roles, set_roles] = useState([])
    const [redirect, set_redirect] = useState(false)
    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const [email, set_email] = useState('')
    const { id } = useParams();
    const [role, set_role] = useState(0)

    const getRoles = async () => {
        const rolesData = await axios.get(`roles`)
        set_roles(rolesData.data.data)
    }

    const getUsers = async () => {
        const usersData = await axios.get(`users/${id}`)
        const user:User = usersData.data.data
        set_first_name(user.first_name)
        set_last_name(user.last_name)
        set_email(user.email)
        set_role(user.role.id)
    }

    useEffect(() => {
        getRoles()
        getUsers()
    }, [])

    const submit = async (event:any) => {
        event.preventDefault()

        await axios.put(`users/${id}`, {
            first_name,
            last_name,
            email,
            role_id: role
        })

        set_redirect(true)
    }

    if(redirect)  return(
        <Navigate to="/users"/>
    )
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h3 className="h3 mb-3 fw-normal">Изменить пользователя</h3>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Ваше Имя"
                           defaultValue={first_name}
                           onChange = {e => set_first_name(e.target.value)}/>
                    <label htmlFor="floatingInput">Ваше Имя</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInputLastName" placeholder="Ваше Фамилия"
                           defaultValue={last_name}
                           onChange = {e => set_last_name(e.target.value)}/>
                    <label htmlFor="floatingInputLastName">Ваше Фамилия</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="emailName" placeholder="Почта"
                           defaultValue={email}
                           onChange = {e => set_email(e.target.value)}/>
                    <label htmlFor="emailName">Почта</label>
                </div>
                <select className="form-select form-select" aria-label=".form-select"
                    onChange={(e:any) => {
                        set_role(e.target.value)
                    }}>
                    <option>Пусто</option>
                    {
                        roles.map((item) => {
                            if (item['id'] == role) return <option value={item['id']} key={item['id']} selected>{item['name']}</option>
                            return <option value={item['id']} key={item['id']}>{item['name']}</option>
                        })
                    }
                </select>
                <button  className="w-100 btn btn-lg btn-primary" type="submit">Создать</button>
            </form>
        </Wrapper>
    )
}