import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./Historico.css";
import Menu from "../menu/Menu";
import connect from "../config/connect";

const Historico = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const { id } = useParams();
    const [state, setState] = useState({
        loaded: false,
        historyData: undefined,
        historyComponent: undefined,
        showData: [],
    })
    let keyProp = 0
    //  const navigate = useNavigate();

    useEffect(() => {

        if (!state.loaded) {
            getHistory();
        }

        if (state.historyData) {
            constructHistory();
        }


    }, [state.loaded, state.historyData, state.showData])


    async function getHistory() {

        const response = await connect.getHistory({ token: user.token, userId: id })

        console.log(response.data)

        return setState({
            ...state,
            loaded: true,
            historyData: response.data
        })

    }

    function constructHistory() {

        const showData = []

        const historyComponent = [] = state.historyData.map((history, i) => {

            let permitido = 0, naoPermitido = 0;
            let dataSolicitacao = undefined;
            showData[i] = false;

            const results = [] = history.data.map((data, i) => {

                keyProp = (keyProp + 1 + i)

                data.permitido == "SIM" ? permitido++ : naoPermitido++
                data.data_solicitacao ? dataSolicitacao = data.data_solicitacao : ''
                return (
                    <div
                        className="data"
                        key={keyProp}
                    >

                        <span
                            className={data.permitido !== "SIM" ? "notApr" : "apr"}
                        >

                            {`Permitido: ${data.permitido}`}
                        </span>

                        <span>
                            {`Tabela: ${data.tabela ? data.tabela : "Não definida pelo backend"}`}
                        </span>

                        <span>
                            {`Valor liquido: ${data.valor_liquido}`}
                        </span>

                        <span>
                            {`Mensagem: ${data.msg}`}
                        </span>

                    </div>
                )
            })

            keyProp = (keyProp + 1 + i)

            return (
                <div
                    className={state.showData[i] ? "openDetail historyComponent" : "historyComponent"}
                    key={keyProp}
                >
                    <span>
                        Data da consulta: {dataSolicitacao || "Não informado"}
                    </span>

                    <span>
                        {`cpf: ${history.cpf}`}
                    </span>

                    <span>
                        {`Autor: ${history.autorEmail}`}
                    </span>

                    <span
                        className="apr"

                    >
                        Permitido: {permitido}
                    </span>

                    <span
                        className="notApr"

                    >
                        Não permitido: {naoPermitido}
                    </span>


                    <span
                        style={{ 'cursor': 'pointer' }}
                        onClick={e => {

                            const newArr = state.showData
                            newArr[i] = !state.showData[i]

                            setState({
                                ...state,
                                showData: newArr
                            })

                            return constructHistory()
                        }}
                    >
                        Detalhes <i className="fa fa-search"></i>
                    </span>

                    {state.showData[i] && (
                        <div className="historiDatas">
                            {results}
                        </div>
                    )}


                </div>
            )
        })



        return setState({
            ...state,
            historyComponent
        })

    }

    return (
        <div className="historico">

            <Menu />

            <h2>Historico</h2>

            <div className="container">
                {state.historyComponent}
            </div>

        </div>
    )
}


export default Historico;


