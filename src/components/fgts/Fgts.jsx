import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './Fgts.css';
import NumberFormat from 'react-number-format';
import connect from '../config/connect.jsx';
import SaldoParcelas from "./SaldoParcelas";
import Menu from "../menu/Menu";

const Fgts = props => {

    const [state, setState] = useState({
        cpfValue: "",
        retornoFgts: undefined,
        retornoFgtsConst: undefined,
        fgtsError: false,
        fgtsMsg: "",
        retornoComponent: undefined,
        loadingFgts: false,
        table: undefined,
        saldoTotalParcelas: undefined
    });

   
    /**
     * 
     * cpf	Saldo_Liberado
    35499970866	278,04
    26116305857	206,99
    92156789134	815,03
    2369614978	275,31
    27402150534	402,38
    34894164817	5.287,14
    26801535889	309,81
    21868120880	2.411,26
    98262459091	183,75
    11898350884	3.859,86
    31213062861	2.527,56
    41612039855	355,28
    92205496468	656,38
    49278908053	424,48
    22941689842	6.766,16
    81448015634	205,80
    3067801008	676,13
    35963267889	515,59
    38734832890	3.937,27
    7296678984	1.278,36
    4818287105	452,35
    61239984634	213,50
    86227947091	440,23
    40208041842	235,63
    28123802846	231,86
    40987584820	213,52
    21841661899	1.310,70
    3897534401	162,02
    3637796988	391,52
    30928097854	736,73
    22352800803	1.154,94
    15382657882	136,30
    32010436806	381,35
    10163601771	619,47
    8862984901	325,17
    4313824332	163,82
    38287554888	952,00
    9609617719	389,15
    2764432763	397,03
    38649422845	64,40
    6985832482	508,45
     * 
     */
    const navigate = useNavigate();

    const cpfRegex = /^\d{11}$/;

    useEffect(() => {

    }, [])


    async function getFgtsStatus() {

        const id = sessionStorage.getItem('user')
        const response = await connect.getFgtsStatus(state.cpfValue, id)

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
                    <Menu />
                    <div className="inputContainer">

                        <section className="pt1">
                            <h2>Consulta API FGTS - FACTA</h2>
                        </section>

                        <label htmlFor="cpf">
                            Digite o CPF para consultar
                        </label>

                        <section className="pt2">

                            <div className="cpf">

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

                        {/**
                        * 
                        *  <div
                            className="btn"
                                onClick={e => {
                                    console.log('aqui')
                                    return  navigate("/");
                                }}
                        >
                           
                        </div>
                        * 
                        */}

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
                                        <h3>  R${parseFloat(TotalParcelas(state.retornoFgts)).toFixed(2)}</h3>
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