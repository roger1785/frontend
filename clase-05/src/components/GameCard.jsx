function GameCard({ game }) {   
    return (
        <article className="card">   
            <h3>{game.title}</h3>
            <p>Plataforma: {game.platform}</p>
        </article>
    );
}

export default GameCard;