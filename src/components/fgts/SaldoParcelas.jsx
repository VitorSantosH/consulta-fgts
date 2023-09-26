import React, { useEffect, useRef, useState } from "react";
import Tabelas from "./Tabelas.jsx"

const SaldoParcelas = (props) => {

    const constRetorno = JSON.parse(sessionStorage.getItem('retonoConst'))
    const [state, setState] = useState({
        parcelas: constRetorno,
        refs: [],
        ...props.state,
    })

    useEffect(()=> {
        
    }, [props])

  

    function ContructFgtsComponent(props) {

        const retornoComponent = []

        for (let index = 1; index < 11; index++) {

            if (state.parcelas[`valor_${index}`] > 0) {
                state.refs[index] = true;
            } else {
                state.refs[index] = false;
            }

            let component = (<tr
                className="vencimentos"
                key={index}

            >
                <td
                    className="data"
                >
                    {constRetorno[`dataRepasse_${index}`]}
                </td>


                <td
                    className="valueFgts"
                >
                    {constRetorno[`valor_${index}`]}
                </td>

                <td>
                    {index}
                </td>

                <td>
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={state.refs[index] || false}
                        onChange={e => {

                            state.refs[index] = !state.refs[index]

                            if (e.target.checked) {

                                let novoDataFgts = state.parcelas
                                novoDataFgts[`valor_${index}`] = parseFloat(constRetorno[`valor_${index}`])
                                return setState({
                                    ...state,
                                    parcelas: novoDataFgts
                                })
                            } else {

                                let novoDataFgts = state.parcelas
                                novoDataFgts[`valor_${index}`] = parseFloat(0);
                                return setState({
                                    ...state,
                                    parcelas: novoDataFgts
                                })
                            }

                        }}
                    />
                </td>

                <td>
                    <input
                        type="number"
                        value={parseFloat(state.parcelas[`valor_${index}`])}
                        onChange={e => {

                            //   console.log(state.refs[index])
                            //  state.refs[index].current.children[3].children[0].attributes.checked = 

                            if (e.target.value > 0) {
                                state.refs[index] = true
                            } else {
                                state.refs[index] = false
                            }

                            if (parseFloat(e.target.value) > parseFloat(constRetorno[`valor_${index}`])) {
                                e.target.value = parseFloat(constRetorno[`valor_${index}`])
                            }

                            let novoDataFgts = state.parcelas
                            novoDataFgts[`valor_${index}`] = parseFloat(e.target.value)
                            return setState({
                                ...state,
                                parcelas: novoDataFgts
                            })
                        }}
                    />
                </td>


            </tr>)


            retornoComponent.push(component)

        }


        return retornoComponent;
    }




    return (
        <>

            {ContructFgtsComponent()}
            <Tabelas cpfValue={props.state.cpfValue} parcelas={state.parcelas} />

        </>
    )
}



export default SaldoParcelas;