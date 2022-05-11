import React, {Component, Dispatch, PropsWithChildren} from 'react';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux"
import {User} from '../classes/User'
import setUser from "../redux/actions/setUserAction";

class Wrapper extends Component <any, any>{
    state = {
        redirect: false
    }
    componentDidMount = async () => {
        try {
            const response = await axios.get('user')
            const user = response.data.data
            this.props.setUser(user)
        } catch (e) {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        if(this.state.redirect)  return(
            <Navigate to="/login"/>
        )

        return (
            <div>
                <Nav/>
                <div className="container-fluid">
                    <div className="row">
                        <Menu/>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);