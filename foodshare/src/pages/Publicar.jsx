import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReceitasContext } from "../contexto/ReceitasContext.js";
import { UtilizadorContext } from "../contexto/UtilizadorContext.js";
import "./Publicar.css";

function Publicar() {
    const { listaReceitas, setListaReceitas } = useContext(ReceitasContext);
    const navigate = useNavigate();
    const { utilizadorAtual } = useContext(UtilizadorContext);

    const [tituloReceita, setTituloReceita] = useState("");
    const [categoriaReceita, setCategoriaReceita] = useState("");
    const [descricaoReceita, setDescricaoReceita] = useState("");
    const [ingredientesReceita, setIngredientesReceita] = useState("");
    const [passosReceita, setPassosReceita] = useState("");
    const [imagemReceita, setImagemReceita] = useState("");
    const [linkVideoReceita, setLinkVideoReceita] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let idVideo = "";

        if (linkVideoReceita.includes("youtu.be/")) {
        idVideo = linkVideoReceita.split("youtu.be/")[1].split("?")[0];
        } else if (linkVideoReceita.includes("watch?v=")) {
        idVideo = linkVideoReceita.split("watch?v=")[1].split("&")[0];
        }

        const novaReceita = {
            id: Date.now(),
            titulo: tituloReceita,
            categoria: categoriaReceita.toUpperCase(),
            autor: utilizadorAtual.nome,
            imagem: imagemReceita,
            descricao: descricaoReceita,
            ingredientes: ingredientesReceita.split("\n").filter(linha => linha.trim() !== ""),
            passos: passosReceita.split("\n").filter(linha => linha.trim() !== ""),
            linkVideo: "https://www.youtube.com/embed/" + idVideo,
        };

        setListaReceitas([...listaReceitas, novaReceita]);
        navigate("/explorar");
    };

    if (!utilizadorAtual) {
    return (
        <div className="publicar-container">
            <h1>Publicar receita</h1>
            <p>Tens de entrar na tua conta para publicar uma receita.</p>
        </div>
    );
}

    return (
        <div className="publicar-container">

            <h1>Publicar receita</h1>

            <form onSubmit={handleSubmit}>

                <label>Título</label>
                <input
                    type="text"
                    value={tituloReceita}
                    onChange={(e) => setTituloReceita(e.target.value)}
                    required
                />

                <label>Categoria</label>
                <input
                    type="text"
                    placeholder="Ex.: Saladas, Massas, Sobremesas"
                    value={categoriaReceita}
                    onChange={(e) => setCategoriaReceita(e.target.value)}
                    required
                />

                <label>Descrição</label>
                <textarea
                    value={descricaoReceita}
                    onChange={(e) => setDescricaoReceita(e.target.value)}
                    required
                />

                <label>Ingredientes (um por linha)</label>
                <textarea
                    value={ingredientesReceita}
                    onChange={(e) => setIngredientesReceita(e.target.value)}
                    required
                />

                <label>Passos (um por linha)</label>
                <textarea
                    value={passosReceita}
                    onChange={(e) => setPassosReceita(e.target.value)}
                    required
                />

                <label>Link da imagem</label>
                <input
                    type="text"
                    value={imagemReceita}
                    onChange={(e) => setImagemReceita(e.target.value)}
                    required
                />

                <label>Link do vídeo do YouTube</label>
                <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={linkVideoReceita}
                    onChange={(e) => setLinkVideoReceita(e.target.value)}
                    required
                />

                <input type="submit" value="Publicar" />

            </form>

        </div>
    );
}

export default Publicar;