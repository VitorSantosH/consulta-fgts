import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./Registro.css";
import Swal from "sweetalert2";
import NumberFormat from 'react-number-format'
import connect from "../config/connect";

const Registro = () => {

    const [state, setState] = useState({
        name: "",
        email: "",
        tel: "",
        password: "",
        msg: "",
        lock: true,
        emailRegexClass: 'name',
        loading: false,
        formattedValue: ""
    })
    const navigate = useNavigate();
    const emailRegex = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
    const data = {
        "email": "vitor@testemail.com",
        "name": "vitor",
        "password": "$2b$10$cyUA32kbImltJNOkXwJeBurs/BdHpHH0W2q90SevHhW5tethsegYC",
        "tel": "31996400879",
        "msg": "31996400879",
        "_id": "6502e58d47523bd27eed5a4e",
        "__v": 0
  }
    async function generateNewAcc() {

        if (!state.email || !state.password || !state.tel || !state.name) {
            return Swal.fire({
                title: "Error",
                text: "Preencha todos os campos"
            })
        }

        const response = await connect.generateNewAcc(state);

        console.log(response)

        if(response.status == 200) {
            Swal.fire({
                icon:  'success', 
                title: "Sucesso",
                text: "Solicitação realizada com sucesso, aguade e entraremos em contato"
            })

            setState({
                ...state,
                loading: false
            })
            
            return navigate('/')
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
        <div className="registro">



            <div className="containerRegistroForm">

                <h2>
                    Registre-se
                </h2>

                <div className="nameRegistro">
                    <i className="fa fa-user-o">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Digite seu nome..."
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

                <div className='emailRegistro'>
                    <i className="fa fa-phone">
                        <NumberFormat
                            format="+55 (##) #####-####"
                            className='inputTel'
                            aria-describedby=""
                            placeholder="(11) 98000-0000"
                            value={state.formattedValue || ""}
                            //  style={{ 'borderColor': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B' }}
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                //let cellPattern = new RegExp(/^([0-9]{2}[9]{1}[0-9]{7,8})$/);

                                console.log(formattedValue)
                                return setState({
                                    ...state,
                                    formattedValue: formattedValue,
                                    tel: value
                                })


                            }}
                        />
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
                    onClick={e => {



                        if (!emailRegex.test(state.email)) {
                            return Swal.fire({
                                title: "Erro",
                                icon: 'error',
                                text: "Digite um e-mail válido"
                            })
                        }
                        if (!state.email || !state.password || !state.tel || !state.name) {
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

                        return generateNewAcc();

                    }}
                >

                    {!state.loading && (
                        <span>
                            Registrar
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


export default Registro;