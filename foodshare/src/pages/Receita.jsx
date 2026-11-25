import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import "./Receita.css";

const URL_RECIPE = "http://localhost:8000/receitas/api/recipe/";
const URL_COMMENTS = "http://localhost:8000/receitas/api/comments/";
const URL_COMMENT = "http://localhost:8000/receitas/api/comment/";

function Receita() {
    const location = useLocation();
    const navigate = useNavigate();
    const receita = location.state ? location.state.receita : null;
    const { utilizadorAtual } = useContext(UtilizadorContext);
    const { getReceitas } = useContext(ReceitasContext);

    const [listaComentarios, setListaComentarios] = useState([]);
    const [textoComentario, setTextoComentario] = useState("");

    const getComentarios = () => {
        axios.get(URL_COMMENTS + receita.id).then((request) => {
            setListaComentarios(request.data);
        });
    };

    useEffect(() => {
        if (receita) {
            getComentarios();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoComentario = {
            receita: receita.id,
            autor: utilizadorAtual.nome,
            texto: textoComentario,
        };

        axios.post(URL_COMMENTS + receita.id, novoComentario).then(() => {
            getComentarios();
            setTextoComentario("");
        });
    };

    const apagarComentario = (idComentario) => {
        axios.delete(URL_COMMENT + idComentario).then(() => {
            getComentarios();
        });
    };

    const apagarReceita = () => {
        axios.delete(URL_RECIPE + receita.id).then(() => {
            getReceitas();
            navigate("/explorar");
        });
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
                {receita.ingredientes.split("\n").map(ingrediente => (
                    <li key={ingrediente}>{ingrediente}</li>
                ))}
            </ul>

            <h2>Modo de preparação</h2>
            <ol>
                {receita.passos.split("\n").map(passo => (
                    <li key={passo}>{passo}</li>
                ))}
            </ol>

            <h2>Vídeo</h2>
            <iframe
                src={receita.link_video}
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
                        required
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