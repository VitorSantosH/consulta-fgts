import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "./Login.css";
import connect from "../config/connect";
import Swal from "sweetalert2";

const Login = () => {


    const [state, setState] = useState({
        emailValue: "",
        passwordValue: "",
        loading: false
    })

    async function login() {

        if (!state.passwordValue || !state.emailValue) {
            setState({
                ...state,
                loading: false
            })
            return Swal.fire({
                title: "Erro",
                icon: "error",
                text: "Preencha corretamente os dados para efetuar o login."
            })
        }
        const user = await connect.login({ email: state.emailValue, password: state.passwordValue })
        console.log(user)

        if (user.status != 200) {
            setState({
                ...state,
                loading: false
            })
            return Swal.fire({
                title: "Erro",
                icon: "error",
                text: "Preencha corretamente os dados para efetuar o login."
            })
        } else {

            setState({
                ...state,
                loading: false
            })
            sessionStorage.setItem('user', JSON.stringify(user.data))
            return window.location.href = '/fgts'
        }

    }

    return (
        <div className="Login">

            <div className="title">
                <h1>
                    Faça seu login na plataforma
                </h1>
            </div>

            <div className="console">

                <div className="containerLogin">
                    <div className="email">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <input
                            type="email"
                            name="email"
                            id=""
                            placeholder="E-mail"
                            value={state.emailValue}
                            onChange={e => {
                                setState({
                                    ...state,
                                    emailValue: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div className="password">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                        <input
                            type="password"
                            name="password"
                            id=""
                            placeholder="Senha"
                            value={state.passwordValue}
                            onChange={e => {
                                setState({
                                    ...state,
                                    passwordValue: e.target.value
                                })
                            }}
                        />
                    </div>

                    <div
                        className="btnPadrão entrar"
                        onClick={e => {
                            setState({
                                ...state,
                                loading: true
                            })
                            login();
                        }}
                    >


                        {!state.loading && (
                            <span>
                                ENTRAR
                            </span>
                        )}
                        {state.loading && (
                            <div id="loading-login" className="spinner">
                            </div>
                        )}
                    </div>

                    <div className="registrar">
                        Não tem uma conta?
                        <strong>
                            Registre-se
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    )
}



export default Login;