import React, { Component} from 'react';
import Wrapper from "../Wrapper";
import axios from "axios";
import {Navigate} from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

export default class ProductCreate extends Component <any>{
    state = {
        redirect: false,
        image: ''
    }

    title:string = ''
    description:string = ''
    image:any = ''
    price:string = ''

    upload = async (files: FileList | null) => {
        if (files === null) return;

        const data = new FormData();
        data.append('image', files[0]);

        const response = await axios.post('upload', data);

        this.image = `localhost:7777${response.data.url}`

        this.setState({
            image: this.image
        })
    }

    submit = async(event:any) => {
        event.preventDefault()

        await axios.post('products',{
            title: this.title,
            description: this.description,
            image: this.image,
            price: this.price
        })

        this.setState({
            redirect: true
        })
    }

    imageChanged = (image: string) => {
        this.image = image;

        this.setState({
            image: this.image
        })
    }

    render() {
        if(this.state.redirect)  return(
            <Navigate to="/products"/>
        )
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <h3 className="h3 mb-3 fw-normal">Создать продукт</h3>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Заголовок"
                               onChange = {e => this.title = e.target.value}/>
                        <label htmlFor="floatingInput">Заголовок</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" id="floatingInputLastName" placeholder="Описание"
                                  onChange = {e => this.description = e.target.value}></textarea>
                        <label htmlFor="floatingInputLastName">Описание</label>
                    </div>
                    <div className="form-floating">
                        <ImageUpload value={this.image = this.state.image} imageChanged={this.imageChanged}/>
                        <label htmlFor="emailName">Картинка</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="passwordName" placeholder="Цена"
                               onChange = {e => this.price = e.target.value}/>
                        <label htmlFor="passwordName">Цена</label>
                    </div>
                    <button  className="w-100 btn btn-lg btn-primary" type="submit">Создать</button>
                </form>
            </Wrapper>
        )
    }
}