import React, { useState } from "react";
import './Home.css';
import Menu from "../menu/Menu";

const Home = () => {
    
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div className="home">
            <Menu />
            <div className="homeContainer">
                <h1>Bem vindo, {`${user.name}`}</h1>
            </div>
           
        </div>
    )


}



export default Home;