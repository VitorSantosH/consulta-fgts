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
        historyComponent: undefined
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


    }, [state.loaded, state.historyData])


    async function getHistory() {

        const response = await connect.getHistory({ token: user.token, userId: id })

        return setState({
            ...state,
            loaded: true,
            historyData: response.data
        })

    }

    function constructHistory() {

        const historyComponent = [] = state.historyData.map((history, i) => {

            const results = [] = history.data.map((data, i) => {

                keyProp = (keyProp + 1 + i)



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
                    className="historyComponent"
                    key={keyProp}
                >
                    <span>
                        {`cpf: ${history.cpf}`}
                    </span>

                    <span>
                        {`Autor: ${history.autorEmail}`}
                    </span>

                    <div className="historiDatas">
                        {results}
                    </div>
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


