import RecipeCard from "./RecipeCard";
import { useContext } from "react";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import "./FeaturedRecipes.css";

function FeaturedRecipes() {
    const { listaReceitas } = useContext(ReceitasContext);
    return (
        <section className="featured-section">

            <div className="featured-header">
                <p>INSPIRA-TE NA COZINHA</p>

                <h2>Receitas em destaque</h2>

                <span>
                    Descobre algumas das receitas favoritas
                    da nossa comunidade.
                </span>
            </div>

            <div className="recipes-container">
                {listaReceitas.map(receita => (
                    <RecipeCard key={receita.id} receita={receita} />
                ))}
            </div>

        </section>
    );
}

export default FeaturedRecipes;