import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import connect from "../config/connect";
import Swal from "sweetalert2";



//assets 
import logo from '../../assets/maisSaqueLogoAz.jpg'

const Login = () => {


    const [state, setState] = useState({
        emailValue: "",
        passwordValue: "",
        loading: false
    })
    const navigate = useNavigate();

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
            return navigate('/home')
        }

    }

    return (
        <div className="Login">

            <div className="title">
                <img src={logo} alt="" />
            </div>

            <div className="console">

                <div className="title">
                    <h2>
                        Faça seu login na plataforma
                    </h2>
                </div>
                <div className="containerLogin">

                    <div className="email">
                        <i className="fa fa-envelope" aria-hidden="true">
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
                        </i>
                    </div>

                    <div className="password">
                        <i className="fa fa-lock" aria-hidden="true">
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
                        </i>
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
                        <strong
                            className="navigate"
                            onClick={e => {

                                return navigate("/registro")
                            }}
                        >
                            Registre-se
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    )
}



export default Login;