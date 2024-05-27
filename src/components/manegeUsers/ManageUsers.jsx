import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageUsers.css"
import Menu from "../menu/Menu";
import connect from "../config/connect";
import Swal from "sweetalert2";

const ManageUsers = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const [state, setState] = useState({
        loaded: false,
        users: undefined,
        usersTails: []
    })
    const navigate = useNavigate();

    useEffect(() => {

        if (!state.loaded) {
            getUsers(user.token);
        }

        if (state.users) {
            GenerateUsersTails()
        }

    }, [state.loaded, state.users])

    async function getUsers(props) {

        const response = await connect.getUsers(props)


        return setState({
            ...state,
            loaded: true,
            users: response.data
        })

    }

    async function deleteUser(props) {

        const response = await connect.deleteUser(props)

        if (response.status === 200) {

            Swal.fire({
                icon: 'success',
                title: "Sucesso!",
                text: 'Usuário deletado com sucesso!'
            })

            return reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: "Erro!",
                text: 'Ocorreu um erro inexperado...'
            })

            return reset();
        }
    }

    function GenerateUsersTails() {

        if (state.users.lenght <= 0) return

        const usersTails = [] = state.users.map((u, i) => {

            return (
                <div className="userTail" key={u._id}>
                    <span>
                        Nome: {u.name}
                    </span>
                    <span>
                        E-mail: {u.email}
                    </span>
                    <span>
                        historico
                        <i
                            className="fa fa-share"
                            onClick={e => {
                                return navigate(`/historico/${u._id}`)
                            }}
                        ></i>
                    </span>

                    <span>
                        Alterar senha
                        <i
                            className="fa fa-edit"
                            onClick={e => {
                                return navigate(`/edit-password-user/${u._id}`)
                            }}
                        ></i>
                    </span>

                    <div className="deleteBtnContainer">
                        <div
                            className="deleteBtn"
                            onClick={e => {

                                Swal.fire({
                                    title: 'Ecluir usuário?',
                                    text: "Esta ação não pode ser desfeita",
                                    showConfirmButton: false,
                                    showDenyButton: true,
                                    showCancelButton: true,
                                    denyButtonText: 'Deletar',
                                }).then((result) => {

                                    if (result.isConfirmed) {
                                    } else if (result.isDenied) {

                                        return deleteUser({ deleteId: u._id, token: user.token })

                                    }

                                })

                            }}
                        >
                            Delete
                        </div>
                    </div>

                </div>
            )
        })


        return setState({
            ...state,
            usersTails
        });

    }

    function reset() {

        return setState({
            loaded: false,
            users: undefined,
            usersTails: []
        })
    }

    return (
        <div className="manageUsers">
            <Menu />

            {!state.loaded && (
                <div className="spinnerContainer">
                    <div id="loading-bar-spinner-manage" className="spinner">
                    </div>
                </div>
            )}
            {state.loaded && (
                <div className="manageTailsContainer">
                    {state.usersTails}
                </div>
            )}
        </div>
    )
}

export default ManageUsers;