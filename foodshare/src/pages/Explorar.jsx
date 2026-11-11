import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import "./Explorar.css";

function Explorar() {
    const { listaReceitas } = useContext(ReceitasContext);
    const [textoPesquisa, setTextoPesquisa] = useState("");

    const receitasFiltradas = listaReceitas.filter(receita =>
        receita.titulo.toLowerCase().includes(textoPesquisa.toLowerCase())
    );

    return (
        <div className="explorar-container">

            <h1>Explorar receitas</h1>

            <input
                type="text"
                className="explorar-pesquisa"
                placeholder="Pesquisar receita..."
                value={textoPesquisa}
                onChange={(e) => setTextoPesquisa(e.target.value)}
            />

            <div className="explorar-lista">
                {receitasFiltradas.map(receita => (
                    <RecipeCard key={receita.id} receita={receita} />
                ))}
            </div>

            {receitasFiltradas.length === 0 && (
                <p>Não foram encontradas receitas.</p>
            )}

        </div>
    );
}

export default Explorar;