import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import "./RecipeCard.css";

function RecipeCard(props) {
    const [gostos, setGostos] = useState(0);
    const { listaReceitas, setListaReceitas } = useContext(ReceitasContext);
    const { utilizadorAtual } = useContext(UtilizadorContext);
    const navigate = useNavigate();

    const apagarReceita = () => {
        const receitasRestantes = listaReceitas.filter(receita => receita.id !== props.receita.id);
        setListaReceitas(receitasRestantes);
    };

    return (
        <div className="recipe-card">

            <img
                src={props.receita.imagem}
                alt={props.receita.titulo}
            />

            <div className="recipe-info">

                <p className="recipe-category">
                    {props.receita.categoria}
                </p>

                <h3>{props.receita.titulo}</h3>

                <p className="recipe-author">
                    Por {props.receita.autor}
                </p>

                <button
                    className="like-button"
                    onClick={() => setGostos(gostos + 1)}
                >
                    ♥ {gostos}
                </button>

                <button
                    className="like-button"
                    onClick={() => navigate("/receita", { state: { receita: props.receita } })}
                >
                    Ver receita
                </button>

                {utilizadorAtual && utilizadorAtual.eAdmin && (
                    <button className="delete-button" onClick={apagarReceita}>
                        Apagar
                    </button>
                )}

            </div>

        </div>
    );
}

export default RecipeCard;