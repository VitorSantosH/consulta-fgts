import React, { useState } from "react";
import "./Registro.css";

const Registro = () => {

    const [state, setState] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
        msg: "",
        lock: true
    })

    return (
        <div className="registro">



            <div className="containerRegistroForm">

                <h2>
                    Registre-se
                </h2>

                <div className="name">
                    <i className="fa fa-user-o">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Digite seu nome..."
                            onChange={e => {
                                setState({
                                    ...state,
                                    name: e.target.value
                                })
                            }}
                        />
                    </i>
                </div>

                <div className="emailRegistro">
                    <i className="fa fa-envelope">
                        <input
                            type="email"
                            name=""
                            id=""
                            placeholder="Digite seu email..."
                            onChange={e => {
                                setState({
                                    ...state,
                                    email: e.target.value
                                })
                            }}
                        />
                    </i>
                </div>


                <div className="passwordRegistro">
                    <i className="fa fa-lock">
                        <input
                            type={state.lock ? 'password' : "text"}
                            name=""
                            id=""
                            placeholder="Digite sua senha..."
                            onChange={e => {
                                setState({
                                    ...state,
                                    password: e.target.value
                                })
                            }}
                        />
                        <i
                            className={state.lock ? "fa fa-eye-slash" : "fa fa-eye"}
                            onClick={e => {
                                return setState({
                                    ...state,
                                    lock: !state.lock
                                })
                            }}
                        ></i>
                    </i>
                </div>


                <div className="msg">
                    <i className="fa fa-commenting">
                        <textarea
                            type="text"
                            name=""
                            id=""
                            placeholder="Fique a vontade para mandar uma mensagem ao administrador do sistema...."
                            onChange={e => {
                                setState({
                                    ...state,
                                    msg: e.target.value
                                })
                            }}
                        />
                    </i>
                </div>


                <section
                    className="btn"
                >
                    Registrar
                </section>

            </div>

        </div>
    )
}


export default Registro;