import "./App.css";

function App() {
  // const series = [
  //   "La casa de papel",
  //   "Élite",
  //   "La que se avecina",
  //   "Vis a vis",
  // ];
  // console.log(series);

  // const newSeries = series.map((title) => "Serie: " + title);
  // console.log(newSeries);

  // const games = [
  //   "Fortnite",
  //   "The Last of Us",
  //   "Call of Duty",
  //   "League of Legends",
  //   "Starcraft",
  //   "Mir4",
  // ];
  // console.log(games);

  // const newGames = games.map((game) => `Juego: ${game}`);
  // console.log(newGames);

  const series = [
    { id: 1, title: "La casa de papel", year: 2017 },
    { id: 2, title: "Élite", year: 2018 },
    { id: 3, title: "La que se avecina", year: 2007 },
    { id: 4, title: "Vis a vis", year: 2015 },
  ];

  const games = [
    { id: 1, title: "Fortnite", platform: "PC" },
    { id: 2, title: "The Last of Us", platform: "PlayStation" },
    { id: 3, title: "Call of Duty", platform: "Xbox" },
    { id: 4, title: "League of Legends", platform: "PC" },
    { id: 5, title: "Starcraft", platform: "PC" },
    { id: 6, title: "Mir4", platform: "PC" },
  ];

  return (
    <>
      <h1>Welcome to React</h1>

      <h2>Series</h2>

      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            {/* {"Serie: " + serie.title + ", " + "año: " + serie.year} */}
            {`Serie: ${serie.title}, año: ${serie.year}`}
          </li>
        ))}
      </ul>

      {/* <ul>
        {games.map((game) => (
          <li key={games.id}>
            {`Serie: ${game.title}, plataforma: ${game.platform}`}
          </li>
        ))}
      </ul> */}

      {/* <ul>
        {games.map((juego) => (
          <li
            key={juego.id}
          >{`Juego: ${juego.title}, plataforma: ${juego.platform}`}</li>
        ))}
      </ul> */}

      {/* <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title} - {game.platform}
          </li>
        ))}
      </ul> */}

      {/* <ul>
        {games.map((game) => (
          <li key={`game-${game.id}`}>
            {`Serie: ${game.title}, plataforma: ${game.platform}`}
          </li>
        ))}
      </ul> */}

      {/* <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title} {game.platform}
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default App;
