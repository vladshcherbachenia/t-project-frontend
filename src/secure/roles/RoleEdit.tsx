import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import {Permission} from "../../classes/Permission";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";

export default function RoleCreate() {
    const { id } = useParams();
    const [permissions, set_permissions] = useState([])
    const [permissions_role, set_permissions_role] = useState([])
    const [role_name, set_role_name] = useState('')
    const [redirect, set_redirect] = useState(false)
    const [selected, set_selected] = useState([])
    const onSelect = (id:number) => {
        if(selected.filter(s => s === id).length > 0) {
            set_selected([...selected.filter(s => s !== id)])
            return
        }

        const p:any = [...selected, id]
        set_selected(p)
    }

    const getPermission = async () => {
        const responsePermissions = await axios.get('permissions')
        const responseRolePermissions = await axios.get(`roles/${id}`)
        set_permissions_role(responseRolePermissions.data.data.permissions)
        const selectPermission = responseRolePermissions.data.data.permissions.map((permission:any) => {
            return permission.id
        })
        set_selected(selectPermission)
        set_role_name(responseRolePermissions.data.data.name)
        set_permissions(responsePermissions.data.data)
    }

    useEffect(() => {
        getPermission();
    }, [])


    const submit = async (event:any) => {
        event.preventDefault()

        await axios.put(`roles/${id}`, {
            name: role_name,
            permissions: selected
        })

        set_redirect(true)
    }

    if(redirect) return <Navigate to="/roles"/>
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h3 className="h3 mb-3 fw-normal">Создать роль</h3>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Роль"
                    defaultValue={role_name}
                    onChange = {e => set_role_name(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Роль</label>
                </div>
                <div className="checkbox mb-3">
                    {
                        permissions.map((item:Permission) => {
                            const arr = permissions_role.filter((p:any) => {
                                return p.id === item.id
                            })
                            if (arr.length) {
                                return (
                                    <label className="labelItem">
                                        <input onChange={() => onSelect(item.id)}  key={item.id} type="checkbox" value="remember-me" defaultChecked={true}/> {item.name}
                                    </label>
                                )
                            }
                            return (
                                <label className="labelItem">
                                    <input onChange={() => onSelect(item.id)} key={item.id} type="checkbox" value="remember-me"/> {item.name}
                                </label>)
                        })
                    }
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Изменить</button>
            </form>
        </Wrapper>
    )
}