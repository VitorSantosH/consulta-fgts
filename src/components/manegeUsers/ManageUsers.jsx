import React, { useEffect, useState } from "react";
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

    useEffect(() => {

        if (!state.loaded) {
            console.log(user.token)
            getUsers(user.token);
        }

        if (state.users) {
            console.log("aqui")
            GenerateUsersTails()
        }

    }, [state.loaded, state.users])

    async function getUsers(props) {

        const response = await connect.getUsers(props)

        console.log(response)

        return setState({
            ...state,
            loaded: true,
            users: response.data
        })

    }

    async function deleteUser(props) {

        const response = await connect.deleteUser(props)
        
        if(response.status === 200) {
            
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

        console.log(state)
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
                        <i className="fa fa-share"></i>
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

        console.log(usersTails)

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