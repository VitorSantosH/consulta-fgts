import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import './EditPassword.css';
import Menu from "../menu/Menu";
import connect from "../config/connect";
import Swal from "sweetalert2";

const EditPassword = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const { id } = useParams();
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]*(@[\w!#$%&'*+/=?`{|}~^-]+(\.[\w!#$%&'*+/=?`{|}~^-]+)*)?(@[\w!#$%&'*+/=?`{|}~^-]+)?$/;
    const [state, setState] = useState({
        loadedUser: false,
        userToEdit: {},
        oldPassword: "",
        password: "",
        confirmeNewPassword: "",
        showPassword: true,
        showOldPassword: true,
        loading: false,
        token: user.token,
        email: null
    })

    useEffect(() => {

        if (!state.loadedUser) {
            getUser();
        }

    }, [state])

    /**
     * 
      email: props.email,
            password: props.password,
            name: props.name,
            oldPassword: props.oldPassword,
            token: props.token 
     * 
     */

    async function getUser() {

        const response = await connect.getUser({ token: user.token, userId: id })

        console.log(response.data.user)

        if (response.status != 200) {

            return Swal.fire({
                title: 'Erro',
                text: response.data.error.msg,
                icon: "error"
            })
        }

        return setState({
            ...state,
            loadedUser: true,
            userToEdit: response.data.user, 
            email: response.data.user.email
        })
    }

    
    async function updateUserPassword() {

        if (!state.email || !state.password ) {
            return Swal.fire({
                title: "Error",
                text: "Preencha todos os campos"
            })
        }

        const response = await connect.updateUserPassword(state);

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
        <div className="editPassword">
            <Menu />
            <h1>Edit password</h1>

            {state.loadedUser && (
                <div className="containerRegistroForm">

                    <h2>
                        Atualize os dados do usuario {state.userToEdit.name}
                    </h2>

                    <div className="nameRegistro">
                        <i className="fa fa-user-o">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Digite seu nome..."
                                readOnly
                                value={state.userToEdit.name}
                               
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
                                readOnly
                                value={state.userToEdit.email}
                              
                            />
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

                          
                            if (state.password != state.confirmeNewPassword) {
                                return Swal.fire({
                                    title: "Erro",
                                    icon: 'error',
                                    text: "As duas senhas não batem."
                                })
                            }

                          
                            setState({
                                ...state,
                                loading: true
                            })

                            return updateUserPassword();

                        }}
                    >

                        {!state.loading && (
                            <span>
                                Atualizar senha
                            </span>
                        )}

                        {state.loading && (
                            <section id="loading-login" className="spinner">
                            </section>
                        )}

                    </section>

                </div>
            )}

            {!state.loadedUser && (

                <section id="loading-login-upadatePassword" >
                </section>

            )}
        </div>
    )
}

export default EditPassword;