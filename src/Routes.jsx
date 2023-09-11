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


const Rotas = () => {

    return (

        <Router>
            <Routes>

                <Route exact path="/fgts" element={<Login />} />
                <Route exact path="/fgts/conulta" element={<Fgts />} />
                <Route
                    path="*"
                    element={<Navigate to="/fgts" replace />}
                />

            </Routes>
        </Router>


    )

}

export default Rotas;