import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";


const Menu = () => {

    const [state, setState] = useState({
        showMobileMenu: false
    })
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));

    function logout() {
        sessionStorage.removeItem('user');
        return navigate('/')
    }

    return (
        <div className="menu">


            <div className="menuArea2">
                <div
                    className="homeBtn fixed"
                    onClick={e => {
                        return navigate("/home");
                    }}
                >
                    <i className="fa fa-home"></i>
                    <span>Início</span>
                </div>

                <div
                    className="homeBtn"
                    onClick={e => {
                        return navigate('/fgts')
                    }}
                >
                    <i className="fa fa-paper-plane-o"></i>
                    <span>
                        Apis
                    </span>
                </div>


            </div>

            <div className="menuArea2">
                <div
                    className="homeBtn"
                    onClick={e => {
                        return navigate('/user')
                    }}
                >
                    <i className="fa fa-user">

                    </i>
                    <span>
                        {
                            user.name
                        }
                    </span>
                </div>

                {user.role === "admin" && (
                    <div
                        className="homeBtn"
                        onClick={e => {
                            return navigate("/notificacoes");
                        }}
                    >
                        <i className="fa fa-bell">

                        </i>
                        <span>
                            Notificações
                        </span>
                    </div>
                )}

                <div
                    className="homeBtn"
                    onClick={e => {
                        return logout();
                    }}
                >
                    <i className="fa fa-sign-out"></i>
                    <span>
                        Sair
                    </span>
                </div>

                <div
                    className="containerLinksMoblile"
                    onClick={e => {
                        return setState({
                            ...state,
                            showMobileMenu: !state.showMobileMenu
                        })
                    }}

                >
                    <i className={state.showMobileMenu ? "fa fa-times" : "fa fa-bars"} aria-hidden="true"></i>
                </div>
            </div>

            <div className={state.showMobileMenu ? "moblileMenu active" : "moblileMenu"}>
                <div
                    className="homeBtn"
                    onClick={e => {
                        return navigate('/user')
                    }}
                >

                    <span>
                        {
                            user.name
                        }
                    </span>
                    <i className="fa fa-user">

                    </i>
                </div>

                <div
                    className="homeBtn"
                    onClick={e => {
                        return navigate('/fgts')
                    }}
                >
                    <span>
                        Apis
                    </span>
                    <i className="fa fa-paper-plane-o"></i>
                </div>

                {user.role === "admin" && (
                    <div
                        className="homeBtn"
                        onClick={e => {
                            return navigate("/notificacoes");
                        }}
                    >
                        <span>
                            Notificações
                        </span>
                        <i className="fa fa-bell">

                        </i>
                    </div>
                )}

                <div
                    className="homeBtn"
                    onClick={e => {
                        return logout();
                    }}
                >

                    <span>
                        Sair
                    </span>
                    <i className="fa fa-sign-out"></i>
                </div>
            </div>
        </div>
    )
}

export default Menu;