import React, { useEffect, useState } from "react";
import './Notificacoes.css';
import connect from "../config/connect";
import Swal from "sweetalert2";
import Menu from "../menu/Menu";

const Notificacoes = () => {

    const [state, setState] = useState({
        loading: false,
        loaded: false,
        notifyComp: undefined

    })
    const user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {

        if (state.loaded == false) {
            getNotify(state.solicitation)
        }

    }, [state.loaded])



    async function getNotify() {


        const notifys = await connect.getNotify(user)

        if (notifys.status != 400) {

            const notifyComp = GenerateNotifyComp(notifys.data)

            setState({
                ...state,
                loading: !state.loading,
                notifyComp: notifyComp,
                loaded: true
            })

        } else {

            setState({
                ...state,
                loading: !state.loading,
                loaded: true
            })

            return Swal.fire({
                icon: 'error',
                title: "Erro",
                text: "Ocorreu um erro inexperado."
            })
        }
    }

    /**
     *     [
        {
            "pedente": true,
            "_id": "6502e58d47523bd27eed5a4e",
            "email": "vitor@testemail.com",
            "name": "vitor",
            "password": "$2b$10$cyUA32kbImltJNOkXwJeBurs/BdHpHH0W2q90SevHhW5tethsegYC",
            "tel": "31996400879",
            "msg": "31996400879",
            "__v": 0
        },
        {
            "_id": "65032c96087e6873097e1844",
            "email": "vitor@testemail2.com",
            "name": "vitor",
            "password": "$2b$10$PyVEneWVy28kDDOkmoLtaOO2i2HeNv81rNHRUI3p0gGmA5hbT2g.a",
            "tel": "31996400879",
            "msg": "teste",
            "pedente": true,
            "__v": 0
        }
    ]
     */

    function GenerateNotifyComp(data) {

        const components = [] = data.map((notfication, i) => {
            return (
                <div className="notify" key={notfication._id}>
                    <div >
                        <label htmlFor="">
                            Nome
                        </label>
                        <span>
                            {notfication.name}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="">
                            Telefone
                        </label>
                        <span>
                            {notfication.tel}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="">
                            E-mail
                        </label>
                        <span>
                            {notfication.email}
                        </span>
                    </div>

                    {notfication.msg && (
                        <div>
                            <label htmlFor="">
                                Mesagem
                            </label>
                            <textarea
                                name=""
                                id=""
                                value={notfication.msg}
                                readOnly
                            >

                            </textarea>
                        </div>
                    )}

                    <div id="btnsNotif">
                        <section
                            className="btnNotif recusar"
                            onClick={e => {
                                const aceito = false
                                const newUser = notfication
                                resolveNotify({user, aceito, newUser})
                            }}
                        >
                            Recusar
                        </section>

                        <section
                            className="btnNotif aceitar"
                            onClick={e => {
                                const aceito = true
                                const newUser = notfication
                                resolveNotify({user, aceito, newUser})
                            }}
                        >
                            Aceitar
                        </section>

                    </div>

                </div>
            )
        })

        return components

    }

    async function resolveNotify(props) {

        const response = await connect.resolveNotify(props)
    
        return  getNotify()

    }

    return (
        <div className="notificacoes">
            <Menu />
            {state.notifyComp}
        </div>
    )

}

export default Notificacoes;