import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import "./Autenticacao.css";

function Entrar() {
    const { listaUtilizadores, setUtilizadorAtual } = useContext(UtilizadorContext);
    const navigate = useNavigate();

    const [emailUtilizador, setEmailUtilizador] = useState("");
    const [palavraPasse, setPalavraPasse] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const utilizadorEncontrado = listaUtilizadores.find(utilizador =>
            utilizador.email === emailUtilizador && utilizador.palavraPasse === palavraPasse
        );

        if (utilizadorEncontrado) {
            setUtilizadorAtual(utilizadorEncontrado);
            navigate("/");
        } else {
            setMensagemErro("Email ou palavra-passe incorretos.");
        }
    };

    return (
        <div className="autenticacao-container">
            <h1>Entrar</h1>

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={emailUtilizador}
                    onChange={(e) => setEmailUtilizador(e.target.value)} required />

                <label>Palavra-passe</label>
                <input type="password" value={palavraPasse}
                    onChange={(e) => setPalavraPasse(e.target.value)} required />

                <input type="submit" value="Entrar" />
            </form>

            {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
        </div>
    );
}

export default Entrar;