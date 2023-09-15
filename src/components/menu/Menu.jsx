import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";


const Menu = () => {

    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user)
    return (
        <div className="menu">


            <div
                className="homeBtn"
                onClick={e => {
                    return navigate("/");
                }}
            >
                <i className="fa fa-home"></i>
                <span>Início</span>
            </div>

            <div className="menuArea2">
                <div className="homeBtn">
                    <i className="fa fa-user">

                    </i>
                    <span>
                        {
                            user.name
                        }
                    </span>
                </div>

                {user.role === "admin" && (
                    <div
                        className="homeBtn"
                        onClick={e => {
                            return navigate("/notificacoes");
                        }}
                    >
                        <i className="fa fa-bell">

                        </i>
                        <span>
                            Notificações
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Menu;