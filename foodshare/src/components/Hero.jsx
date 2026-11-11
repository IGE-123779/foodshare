import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="hero">

            <div className="hero-text">

                <p className="hero-subtitle">
                    BEM-VINDO AO FOODSHARE
                </p>

                <h1>
                    Descobre. Cozinha.
                    <span> Partilha.</span>
                </h1>

                <p className="hero-description">
                    Descobre novas receitas, partilha os teus pratos
                    favoritos e inspira uma comunidade apaixonada
                    pela culinária.
                </p>

                <div className="hero-buttons">
                    <button className="explore-button" onClick={() => navigate("/explorar")}>
                        Explorar receitas
                    </button>

                    <button className="publish-button" onClick={() => navigate("/publicar")}>
                        Publicar receita
                    </button>
                </div>

            </div>

            <div className="hero-image">
                <img
                    src="/src/assets/1Imagem.jpg"
                    alt="Imagem FoodShare"
                />
            </div>

        </section>
    );
}

export default Hero;