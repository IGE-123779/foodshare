import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import "./Navbar.css";

function Navbar() {
    const { utilizadorAtual, setUtilizadorAtual } = useContext(UtilizadorContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <div className="logo">
                Food<span>Share</span>
            </div>

            <div className="nav-links">
                <Link to="/">Início</Link>
                <Link to="/explorar">Explorar receitas</Link>
                <Link to="/publicar">Publicar receita</Link>
            </div>

            <div className="nav-buttons">
                {utilizadorAtual ? (
                    <>
                        <span>Olá, {utilizadorAtual.nome}</span>
                        <button className="login-button" onClick={() => setUtilizadorAtual(null)}>
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <button className="login-button" onClick={() => navigate("/entrar")}>
                            Entrar
                        </button>
                        <button className="register-button" onClick={() => navigate("/registar")}>
                            Registar
                        </button>
                    </>
                )}
            </div>

        </nav>
    );
}

export default Navbar;

