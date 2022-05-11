import React from 'react'
import {
    Link
} from "react-router-dom";
import './menu.css'

const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <li>
                            <Link to="/dashboard">Статистика</Link>
                        </li>
                        <li>
                            <Link to="/orders">Заказы</Link>
                        </li>
                        <li>
                            <Link to="/products">Продукты</Link>
                        </li>
                        <li>
                            <Link to="/users">Пользователи</Link>
                        </li>
                        <li>
                            <Link to="/roles">Роли</Link>
                        </li>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menu;