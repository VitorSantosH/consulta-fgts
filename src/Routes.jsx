import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useParams
} from "react-router-dom";


import Fgts from "./components/fgts/Fgts";
import Login from "./components/login/Login";
import Registro from "./components/registroConta/Registro";
import Notificacoes from "./components/notificacao/Notificacoes";
import Home from "./components/home/Home";
import UpdateUser from "./components/updateUser/UpdateUser";
import ManageUsers from "./components/manegeUsers/ManageUsers";
import Historico from "./components/historico/Historico";
import EditPassword from "./components/manegeUsers/EditPassword";

const Rotas = () => {

    return (

        <Router>
            <Routes>
                <Route exact path="/edit-password-user/:id" element={<EditPassword/>} />
                <Route exact path="/historico/:id" element={<Historico/>} />
                <Route exact path="/manage/users" element={<ManageUsers/>} />
                <Route exact path="/user" element={<UpdateUser />} />
                <Route exact path="home" element={<Home />} />
                <Route exact path="/notificacoes" element={<Notificacoes />} />
                <Route exact path="/registro" element={<Registro />} />
                <Route exact path="/fgts" element={<Fgts />} />
                <Route exact path="/" element={<Login />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>
        </Router>


    )

}

export default Rotas;