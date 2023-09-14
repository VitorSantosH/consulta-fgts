import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";


const Menu = () => {

    const navigate = useNavigate();

    return (
        <div className="menu">


            <div
                className="homeBtn"
                onClick={e => {
                    console.log('aqui')
                    return  navigate("/");
                }}
            >
                <i className="fa fa-home"></i>
                <span>Início</span>
            </div>
        </div>
    )
}

export default Menu;