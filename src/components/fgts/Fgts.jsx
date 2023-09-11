import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import './Fgts.css';
import NumberFormat from 'react-number-format';
import connect from '../config/connect.jsx';
import SaldoParcelas from "./SaldoParcelas";

const Fgts = props => {

    const [state, setState] = useState({
        cpfValue: 34894164817,
        retornoFgts: undefined,
        retornoFgtsConst: undefined,
        fgtsError: false,
        fgtsMsg: "",
        retornoComponent: undefined,
        loadingFgts: false,
        table: undefined,
        saldoTotalParcelas: undefined
    })


    const cpfRegex = /^\d{11}$/;

    useEffect(() => {

    }, [])


    async function getFgtsStatus() {

        const id = sessionStorage.getItem('user')
        const response = await connect.getFgtsStatus(state.cpfValue,id )

        if (!response.erro) {

            sessionStorage.setItem('retonoConst', JSON.stringify(response.retorno))

            return setState({
                ...state,
                //  cpfValue: "",
                retornoFgts: response.retorno,
                loadingFgts: true
            })

        } else {

            const msg = response.msg ? response.msg : response.mensagem

            Swal.fire({
                icon: "error",
                title: 'Erro',
                text: msg
            })

            return setState({
                ...state,
                //  cpfValue: "",
                retornoFgts: response.retorno,
                fgtsError: true,
                fgtsMsg: msg
            })
        }



    }


    function TotalParcelas(props) {
        console.log(props)
        if (!props) return parseFloat(0)

        let saldoTotalParcelas = 0;

        for (let index = 1; index < 11; index++) {
            let num = parseFloat(props[`valor_${index}`])
            saldoTotalParcelas += num;
            console.log(num)
        }
        console.log('aqui')
        /**
         *    const component = (
               <div className="containerDados">
                   <div className="valor">
                       <div className="dataSaldo">
                           {props.retornoComponent[`data_saldo`]}
                       </div>
                       <div>
                           <h3>  R${saldoTotalParcelas}</h3>
                       </div>
                       <span>
                           Valor bruto disponivel para saque
                       </span>
                   </div>
               </div>
           )
         */

        return saldoTotalParcelas;
    }


    return (
        <div className="fgts">

            {!state.loginStatus && (
                <>

                    <div className="inputContainer">

                        <section className="pt1">
                            <h2>Dados do cliente</h2>
                        </section>

                        <section className="pt2">

                            <div className="cpf">
                                <label htmlFor="cpf">
                                    CPF
                                </label>

                                <NumberFormat
                                    format=" ###.###.###-##"
                                    className='inputTel'
                                    aria-describedby=""
                                    placeholder="000.000.000-00"
                                    value={state.cpfValue || ""}
                                    //  style={{ 'borderColor': stateCadLoja.stateEmailStyle ? '' : '#EE3B3B' }}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;


                                        return setState({
                                            ...state,
                                            cpfValue: value
                                        })

                                    }}

                                />
                            </div>

                            <div

                                className="btn"
                                onClick={e => {

                                    if (!cpfRegex.test(state.cpfValue)) {

                                        return Swal.fire({
                                            icon: "error",
                                            title: 'Erro',
                                            text: 'Digite o cpf corretamente',
                                        })

                                    }



                                    return getFgtsStatus();

                                }}

                            >
                                Consultar
                            </div>
                        </section>

                    </div>

                </>
            )}
            {state.retornoFgts && (
                <>
                    <div className="containerResults">
                        <h3>Dados da simulação</h3>
                        <div className="dadosSimulacao">
                            <div className="containerDados">
                                <div className="valor">
                                    <div className="dataSaldo">
                                        {state.retornoFgts[`data_saldo`]}
                                    </div>
                                    <div>
                                        <h3>  R${TotalParcelas(state.retornoFgts)}</h3>
                                    </div>
                                    <span>
                                        Valor disponivel de saldo FGTS
                                    </span>
                                </div>


                            </div>
                            <div className="valueParcelas">

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Vencimentos</th>
                                            <th>Saques Disponíveis</th>
                                            <th>Nº</th>
                                            <th>Período</th>
                                            <th>Valor Antecipação</th>
                                        </tr>
                                    </thead>
                                </table>

                                <SaldoParcelas state={state} />

                            </div>



                        </div>


                    </div>
                </>
            )}

        </div>
    )
}


export default Fgts;