import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './UpdateUser.css';
import Swal from 'sweetalert2';
import Menu from '../menu/Menu.jsx';
import connect from "../config/connect";

const UpdateUser = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]*(@[\w!#$%&'*+/=?`{|}~^-]+(\.[\w!#$%&'*+/=?`{|}~^-]+)*)?(@[\w!#$%&'*+/=?`{|}~^-]+)?$/;
    const navigate = useNavigate();
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        oldPassword: "",
        password: "",
        confirmeNewPassword: "",
        showPassword: true,
        showOldPassword: true,
        loading: false,
        token: user.token,

    });


    async function updateUser() {

        if (!state.email || !state.password || !state.name || !state.oldPassword) {
            return Swal.fire({
                title: "Error",
                text: "Preencha todos os campos"
            })
        }

        const response = await connect.updateUser(state);

        console.log(response)

        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: "Sucesso",
                text: "Atualização realizada com sucesso"
            })

            setState({
                ...state,
                loading: false
            })

            return navigate('/');

        } else {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.data
            })
        }


        return setState({
            ...state,
            loading: false
        })

    }


    return (
        <div className="updateUser">
            <Menu />

            <div className="containerRegistroForm">

                <h2>
                    Atualize os dados do usuario {user.name}
                </h2>

                <div className="nameRegistro">
                    <i className="fa fa-user-o">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Digite seu nome..."
                            value={state.name}
                            onChange={e => {
                                setState({
                                    ...state,
                                    name: e.target.value,

                                })
                            }}
                        />
                    </i>
                </div>

                <div className={state.emailRegexClass}>
                    <i className="fa fa-envelope">
                        <input
                            type="email"
                            name=""
                            id=""
                            placeholder="Digite seu email..."
                            value={state.email}
                            onChange={e => {
                                setState({
                                    ...state,
                                    email: e.target.value,
                                    emailRegexClass: emailRegex.test(state.email) ? "emailRegistro" : "emailRegistro redRegex"
                                })
                            }}
                        />
                    </i>
                </div>

                <div className="passwordRegistro">
                    <i className="fa fa-lock">
                        <input
                            type={state.showOldPassword ? 'password' : "text"}
                            name=""
                            id=""
                            placeholder="Digite a senha atual"
                            value={state.oldPassword}
                            onChange={e => {
                                setState({
                                    ...state,
                                    oldPassword: e.target.value
                                })
                            }}
                        />
                        <i
                            className={state.showOldPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                            onClick={e => {
                                return setState({
                                    ...state,
                                    showOldPassword: !state.showOldPassword
                                })
                            }}
                        ></i>
                    </i>
                </div>

                <div className="passwordRegistro">
                    <i className="fa fa-lock">
                        <input
                            type={state.showPassword ? 'password' : "text"}
                            name=""
                            id=""
                            placeholder="Digite a nova senha..."
                            value={state.password}
                            onChange={e => {
                                setState({
                                    ...state,
                                    password: e.target.value
                                })
                            }}
                        />
                        <i
                            className={state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                            onClick={e => {
                                return setState({
                                    ...state,
                                    showPassword: !state.showPassword
                                })
                            }}
                        ></i>
                    </i>
                </div>

                <div className="passwordRegistro">
                    <i className="fa fa-lock">
                        <input
                            type={state.showPassword ? 'password' : "text"}
                            name=""
                            id=""
                            placeholder="Digite novamente a nova senha"
                            value={state.confirmeNewPassword}
                            onChange={e => {
                                setState({
                                    ...state,
                                    confirmeNewPassword: e.target.value
                                })
                            }}
                        />
                        <i
                            className={state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                            onClick={e => {
                                return setState({
                                    ...state,
                                    showPassword: !state.showPassword
                                })
                            }}
                        ></i>
                    </i>
                </div>

                <section
                    className="btn"
                    onClick={e => {

                        if (!emailRegex.test(state.email)) {
                            return Swal.fire({
                                title: "Erro",
                                icon: 'error',
                                text: "Digite um e-mail válido"
                            })
                        }

                        if (state.password != state.confirmeNewPassword) {
                            return Swal.fire({
                                title: "Erro",
                                icon: 'error',
                                text: "As duas senhas não batem."
                            })
                        }

                        if (!state.email || !state.password || !state.name || !state.oldPassword) {
                            return Swal.fire({
                                title: "Erro",
                                icon: 'error',
                                text: "Preencha nome, email, password e telefone"
                            })
                        }

                        setState({
                            ...state,
                            loading: true
                        })

                        return updateUser();

                    }}
                >

                    {!state.loading && (
                        <span>
                            Atualizar dados
                        </span>
                    )}

                    {state.loading && (
                        <section id="loading-login" className="spinner">
                        </section>
                    )}

                </section>

            </div>

        </div>
    )
}


export default UpdateUser;