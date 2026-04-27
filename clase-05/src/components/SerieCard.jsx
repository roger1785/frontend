function SerieCard({ serie }) {
  return (
    <article className="card">
      <h3>{serie.title}</h3>
      <p>Año: {serie.year}</p>
    </article>
  );
}
export default SerieCard;