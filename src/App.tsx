import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./secure/dashboard/Dashboard";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import Register from "./public/Register"
import axios from "axios"
import RedirectToDashboard from "./secure/RedirectToDashboard";
import UserCreate from "./secure/users/UserCreate";
import UserEdit from "./secure/users/UserEdit";
import Roles from "./secure/roles/Roles"
import RoleCreate from './secure/roles/RoleCreate'
import RoleEdit from './secure/roles/RoleEdit'
import Products from "./secure/products/Products";
import ProductCreate from "./secure/products/ProductCreate";
import ProductEdit from "./secure/products/ProductsEdit";
import Orders from './secure/orders/Orders'
import OrderItems from './secure/orders/OrderItems'
import Profile from '../src/secure/profile/Profile'

axios.defaults.baseURL = 'http://localhost:7777/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;


function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/users" element={<Users/>} />
                <Route path="/users/create" element={<UserCreate/>} />
                <Route path="/users/:id/edit" element={<UserEdit/>} />
                <Route path="/roles" element={<Roles/>} />
                <Route path="/roles/create" element={<RoleCreate/>} />
                <Route path="/roles/:id/edit" element={<RoleEdit/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/products/create" element={<ProductCreate/>} />
                <Route path="/products/:id/edit" element={<ProductEdit/>} />
                <Route path="/orders" element={<Orders/>} />
                <Route path={'/orders/:id'} element={<OrderItems/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/" element={<RedirectToDashboard/>} />
            </Routes>
        </BrowserRouter>,
    </div>
  );
}

export default App;
