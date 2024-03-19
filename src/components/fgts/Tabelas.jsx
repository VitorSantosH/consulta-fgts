import React, { useEffect, useState } from "react";
import connect from "../config/connect";
import Swal from "sweetalert2";

const Tabelas = (props) => {

    const user = JSON.parse(sessionStorage.getItem('user'))
    const tables = [
        { name: 'LIGHT RB', value: 48291, cheked: true },
        { name: 'PLUS RB', value: 48267, cheked: true },
        { name: 'PLUS + RB', value: 48259, cheked: true },
        { name: 'GOLD  RB', value: 48240, cheked: true },
        { name: 'GOLD + RB', value: 48232, cheked: true },
        { name: 'SMART RB', value: 48305, cheked: true },
        { name: 'TOP RB', value: 48275, cheked: true },
        { name: 'FLEX 1 RB', value: 48283, cheked: true },
        { name: 'TURBO AG', value: 48445, cheked: true },
        { name: 'FGTS TOP', value: 48275, cheked: true },
        { name: 'FGTS PLUS', value: 48267, cheked: true },
        { name: 'FGTS PLUS +', value: 48259, cheked: true },

    ]

    for (let index = 0; index < tables.length; index++) {

        const foundItem = user.tables.find(function (item) {
            return item.name === tables[index].name
        })

        if (foundItem) {
            tables[index].cheked = true
        } else {
            tables[index].cheked = false
        }

    }



    const [state, setState] = useState({
        loading: false,
        tableComponents: undefined,
        table: undefined,
        retornoFgts: props.parcelas,
        cpfValue: props.cpfValue,
        ...props,
        tables: tables
    })


    if (props.cpfValue != state.cpfValue) {


        return setState({
            ...state,
            cpfValue: props.cpfValue
        })
    }

    useEffect(() => {

        if (state.parcelas) {
            return containerDados();
        }


    }, [state.table, state.table, props.state, props])


    async function getFtgsTable() {

        const tables = [] = state.tables.filter((table, i) => {

            if (table.cheked) {
                return table
            }
        })

        /**
         *                     
                            if (novoDataFgts[`valor_${index}`] < 10.00 && novoDataFgts[`valor_${index - 1}`] > 10.00) {

                                for (let i = index; i < 11; i++) {
                                    novoDataFgts[`valor_${i}`] = 0.0;
                                    console.log(index)
                                    console.log(state.parcelas.length)
                                    console.log(i)
                                }

                            }
         */

        const parans = {
            cpf: state.cpfValue,
            table: tables,
            user: user,
            parcelas: []
        }

        for (let index = 1; index < 12; index++) {


            const novoDataFgts = state.retornoFgts;

            if (novoDataFgts[`valor_${index}`] < 10.00 && novoDataFgts[`valor_${index - 1}`] > 10.00) {

                for (let i = index; i < 11; i++) {

                    novoDataFgts[`valor_${i}`] = 0.0;
                    console.log(index)
                    console.log(state)
                    console.log(i)

                }

            }

            if (state.retornoFgts[`dataRepasse_${index}`]) {
                let component = {
                    [`dataRepasse_${index}`]: state.retornoFgts[`dataRepasse_${index}`],
                    [`valor_${index}`]: state.retornoFgts[`valor_${index}`] > 0 ? parseFloat(state.retornoFgts[`valor_${index}`]).toFixed(2) : "0"
                };

                parans.parcelas.push(component)
            }

        }

        const response = await connect.getFtgsTable(parans)
        const newUser = {
            ...user,
            ...response.payload
        }
        sessionStorage.setItem('user', JSON.stringify(newUser))
        console.log(response)
        if (response.dataTabelas.length <= 0) {
            setState({
                ...state,
                loading: false
            })
            return Swal.fire({
                icon: "error",
                title: "Erro",
                //text: `${table.msg}`
            })
        } else {
            return setState({
                ...state,
                table: response.dataTabelas,
                loading: false,
            })

        }


    }

    function containerDados() {

        if (!state.table) return

        const tableComponents = [];
        const errorList = [];

        for (let index = 0; index < state.table.length; index++) {



            if (state.table[index].permitido == "SIM") {
                const component = (

                    <div
                        className="valor"
                        key={index + "table"}
                    >
                        <div className="dataSaldo">
                            {state.table[index].data_solicitacao}
                        </div>
                        <div>
                            <h3>  R${state.table[index].valor_liquido}</h3>
                        </div>
                        <span>
                            Total valor líquido {state.table[index].tabela}
                        </span>
                    </div>

                )

                tableComponents.push(component)
            } else {
                errorList.push(state.table[index].msg)
            }

        }


        /**
         * 
         *  errorList.map((e, i) => {

            Swal.fire({
                title: "Erro",
                icon: "error",
                text: e
            })
        })
         */


        return setState({
            ...state,
            tableComponents: tableComponents
        })

    }

    const GenerateTablesComponent = () => {

        const component = [] = state.tables.map((table, i) => {

            return (
                <div key={table.value}>
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={table.cheked}
                        onChange={e => {



                            const newTable = state.tables
                            newTable[i].cheked = !newTable[i].cheked

                            setState({
                                ...state,
                                tables: newTable
                            })
                        }}
                    />
                    <span>
                        {`${table.name} `}
                    </span>

                </div>
            )
        })

        return component;

    }

    return (
        <>
            <div className="btnConsultTable">

                <div className="containerTablesCheked">
                    {GenerateTablesComponent()}
                </div>

                <div
                    className="btn"
                    onClick={e => {


                        setState({
                            ...state,
                            loading: true
                        })

                        getFtgsTable()

                    }}
                >
                    {!state.loading && (
                        <span>
                            Consultar Tabelas
                        </span>
                    )}
                    {state.loading && (
                        <div id="loading-bar-spinner" className="spinner">
                        </div>
                    )}
                </div>


            </div>
            {state.table && (
                <div
                    className="containerDados"
                >
                    {state.tableComponents}
                </div>
            )}
        </>
    )

}



export default Tabelas;