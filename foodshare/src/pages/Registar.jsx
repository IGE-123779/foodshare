import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import "./Autenticacao.css";

function Registar() {
    const { listaUtilizadores, setListaUtilizadores, setUtilizadorAtual } = useContext(UtilizadorContext);
    const navigate = useNavigate();

    const [nomeUtilizador, setNomeUtilizador] = useState("");
    const [emailUtilizador, setEmailUtilizador] = useState("");
    const [palavraPasse, setPalavraPasse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoUtilizador = {
            nome: nomeUtilizador,
            email: emailUtilizador,
            palavraPasse: palavraPasse,
            eAdmin: false,
        };

        setListaUtilizadores([...listaUtilizadores, novoUtilizador]);
        setUtilizadorAtual(novoUtilizador);
        navigate("/");
    };

    return (
        <div className="autenticacao-container">
            <h1>Registar</h1>

            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input type="text" value={nomeUtilizador}
                    onChange={(e) => setNomeUtilizador(e.target.value)} required />

                <label>Email</label>
                <input type="email" value={emailUtilizador}
                    onChange={(e) => setEmailUtilizador(e.target.value)} required />

                <label>Palavra-passe</label>
                <input type="password" value={palavraPasse}
                    onChange={(e) => setPalavraPasse(e.target.value)} required />

                <input type="submit" value="Criar conta" />
            </form>
        </div>
    );
}

export default Registar;