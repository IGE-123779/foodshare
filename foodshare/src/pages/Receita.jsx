import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import "./Receita.css";

function Receita() {
    const location = useLocation();
    const navigate = useNavigate();
    const receita = location.state ? location.state.receita : null;
    const { utilizadorAtual } = useContext(UtilizadorContext);
    const { listaReceitas, setListaReceitas } = useContext(ReceitasContext);

    const [listaComentarios, setListaComentarios] = useState([]);
    const [textoComentario, setTextoComentario] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoComentario = {
            id: Date.now(),
            autor: utilizadorAtual.nome,
            texto: textoComentario,
        };
        setListaComentarios([...listaComentarios, novoComentario]);
        setTextoComentario("");
    };

    const apagarComentario = (idComentario) => {
        const comentariosRestantes = listaComentarios.filter(comentario => comentario.id !== idComentario);
        setListaComentarios(comentariosRestantes);
    };

    const apagarReceita = () => {
        const receitasRestantes = listaReceitas.filter(r => r.id !== receita.id);
        setListaReceitas(receitasRestantes);
        navigate("/explorar");
    };

    if (!receita) {
        return (
            <div className="receita-container">
                <p>Receita não encontrada. Volta ao Explorar e escolhe uma receita.</p>
            </div>
        );
    }

    return (
        <div className="receita-container">

            <h1>{receita.titulo}</h1>
            <p className="receita-autor">Por {receita.autor}</p>

            {utilizadorAtual && utilizadorAtual.eAdmin && (
                <button className="delete-button" onClick={apagarReceita}>
                    Apagar receita
                </button>
            )}

            <img src={receita.imagem} alt={receita.titulo} />
            <p>{receita.descricao}</p>

            <h2>Ingredientes</h2>
            <ul>
                {receita.ingredientes.map(ingrediente => (
                    <li key={ingrediente}>{ingrediente}</li>
                ))}
            </ul>

            <h2>Modo de preparação</h2>
            <ol>
                {receita.passos.map(passo => (
                    <li key={passo}>{passo}</li>
                ))}
            </ol>

            <h2>Vídeo</h2>
            <iframe
                src={receita.linkVideo}
                title={receita.titulo}
                allowFullScreen
            />

            <h2>Comentários</h2>

            {utilizadorAtual ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Escreve um comentário..."
                        value={textoComentario}
                        onChange={(e) => setTextoComentario(e.target.value)}
                    />
                    <input type="submit" value="Comentar" />
                </form>
            ) : (
                <p>Entra na tua conta para comentar.</p>
            )}

            {listaComentarios.map(comentario => (
                <p key={comentario.id}>
                    <b>{comentario.autor}:</b> {comentario.texto}

                    {utilizadorAtual && utilizadorAtual.eAdmin && (
                        <button
                            className="delete-button"
                            onClick={() => apagarComentario(comentario.id)}
                        >
                            Apagar
                        </button>
                    )}
                </p>
            ))}

        </div>
    );
}

export default Receita;