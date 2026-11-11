import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Explorar from "./pages/Explorar.jsx";
import Publicar from "./pages/Publicar.jsx";
import Receita from "./pages/Receita.jsx";
import Entrar from "./pages/Entrar.jsx";
import Registar from "./pages/Registar.jsx";
import receitasIniciais from "./dados/receitas.js";
import { ReceitasContext } from "./contexto/ReceitasContext.js";
import { UtilizadorContext } from "./contexto/UtilizadorContext.js";

function App() {
    const [listaReceitas, setListaReceitas] = useState(receitasIniciais);
    const [utilizadorAtual, setUtilizadorAtual] = useState(null);
    const [listaUtilizadores, setListaUtilizadores] = useState([
        { nome: "Admin", email: "admin@foodshare.pt", palavraPasse: "admin", eAdmin: true },
    ]);

    return (
        <UtilizadorContext.Provider value={{ utilizadorAtual, setUtilizadorAtual, listaUtilizadores, setListaUtilizadores }}>
            <ReceitasContext.Provider value={{ listaReceitas, setListaReceitas }}>
                <BrowserRouter>
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/explorar" element={<Explorar />} />
                        <Route path="/publicar" element={<Publicar />} />
                        <Route path="/receita" element={<Receita />} />
                        <Route path="/entrar" element={<Entrar />} />
                        <Route path="/registar" element={<Registar />} />
                    </Routes>
                </BrowserRouter>
            </ReceitasContext.Provider>
        </UtilizadorContext.Provider>
    );
}

export default App;