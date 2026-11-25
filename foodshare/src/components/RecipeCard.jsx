import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import "./RecipeCard.css";

const URL_RECIPE = "http://localhost:8000/receitas/api/recipe/";

function RecipeCard(props) {
    const { getReceitas } = useContext(ReceitasContext);
    const { utilizadorAtual } = useContext(UtilizadorContext);
    const navigate = useNavigate();

    const darGosto = () => {
        const receitaAtualizada = { ...props.receita };
        receitaAtualizada.gostos = receitaAtualizada.gostos + 1;

        axios.put(URL_RECIPE + props.receita.id, receitaAtualizada).then(() => {
            getReceitas();
        });
    };

    const apagarReceita = () => {
        axios.delete(URL_RECIPE + props.receita.id).then(() => {
            getReceitas();
        });
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

                <button className="like-button" onClick={darGosto}>
                    ♥ {props.receita.gostos}
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