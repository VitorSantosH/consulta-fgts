import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './Home.css';
import Menu from "../menu/Menu";

const Home = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();

    return (
        <div className="home">
            <Menu />
            <div className="homeContainer">
                <h1>Bem vindo, {`${user.name}`}</h1>

                <div className="containerTails">

                    <div
                        className="usersDiv"
                        onClick={e => navigate('/fgts')}
                    >

                        <i className="fa fa-codepen">
                        </i>

                        <span>
                            API Facta
                        </span>

                    </div>

                    <div
                        className="usersDiv"
                       // onClick={e => navigate(`/historico/${user.id}`)}
                    >

                        <i
                            className="panStyle"
                        >
                            P
                        </i>

                        <span>
                            API Pan
                        </span>

                    </div>

                    <div
                        className="usersDiv"
                        onClick={e => navigate(`/historico/${user.id}`)}
                    >

                        <i className="fa fa-history">
                        </i>

                        <span>
                            Histórico de pesquisa
                        </span>

                    </div>

                    {user.role === "admin" && (
                        <div
                            className="usersDiv"
                            onClick={e => navigate('/manage/users')}
                        >

                            <i className="fa fa-users">
                            </i>

                            <span>
                                Gerencie os usuários
                            </span>

                        </div>
                    )}


                </div>
            </div>

        </div>
    )


}



export default Home;