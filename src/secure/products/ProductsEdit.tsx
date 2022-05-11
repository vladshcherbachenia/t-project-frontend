import React, {useState, useEffect} from 'react'
import Wrapper from "../Wrapper";
import ImageUpload from "../components/ImageUpload";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";

export default function ProductEdit() {
    const { id } = useParams();
    const [redirect, set_redirect] = useState(false)
    const [title, set_title] = useState('')
    const [description, set_description] = useState('')
    const [price, set_price] = useState('')
    const [image, set_image] = useState('')

    const getProduct = async () => {
        const response = await axios.get(`products/${id}`)
        const product = response.data.data
        set_title(product.title)
        set_description(product.description)
        set_price(product.price)
        set_image(product.image)
    }

    useEffect(() => {
        getProduct()
    }, [])

    const imageChanged = (image: string) => {
        set_image(image)
    }

    const submit = async(event:any) => {
        event.preventDefault()

        await axios.put(`products/${id}`, {
            title,
            description,
            image,
            price,
        });

        set_redirect(true)
    }

    if(redirect)  return(
        <Navigate to="/products"/>
    )
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h3 className="h3 mb-3 fw-normal">Редактировать продукт</h3>
                <div className="form-floating">
                    <input type="text" className="form-control"
                           id="floatingInput"
                           placeholder="Заголовок"
                           defaultValue={title}
                           onChange = {e => set_title(e.target.value)}/>
                    <label htmlFor="floatingInput">Заголовок</label>
                </div>
                <div className="form-floating">
                        <textarea className="form-control" id="floatingInputLastName" placeholder="Описание"
                                  defaultValue={description}
                                  onChange = {e => set_description(e.target.value)}
                        ></textarea>
                    <label htmlFor="floatingInputLastName">Описание</label>
                </div>
                <div className="form-floating">
                    <ImageUpload value={image} imageChanged={imageChanged}/>
                    <label htmlFor="emailName">Картинка</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control"
                           id="passwordName"
                           placeholder="Цена"
                           defaultValue={price}
                           onChange = {e => set_price(e.target.value)}
                    />
                    <label htmlFor="passwordName">Цена</label>
                </div>
                <button  className="w-100 btn btn-lg btn-primary" type="submit">Создать</button>
            </form>
        </Wrapper>
    )
}