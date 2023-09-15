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

const Rotas = () => {

    return (

        <Router>
            <Routes>
                <Route exact path="/notificacoes" element={<Notificacoes/>} />
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