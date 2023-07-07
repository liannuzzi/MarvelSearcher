import HeroCard from "../HeroCard/HeroCard";

async function fetchHeroes() {
  const res = await fetch(
    "http://gateway.marvel.com/v1/public/characters?offset=5&limit=8&ts=1&apikey=798a820405391028076a4b49bc50f7f5&hash=ff9f3b6fdf656a1b6f8c8250040cfb6e"
  );
  const data = await res.json();
  return data.data.results;
}

async function HeroesGrid() {
  const heroes = await fetchHeroes();
  return (
    <ul className="list-group">
      <HeroCard/>
      {heroes.map((heroe) => (
        <li className="list-group-item" key={heroe.id}>
          <p>{heroe.name}</p>
          <img
            src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`}
          ></img>
        </li>
      ))}
    </ul>
  );
}

export default HeroesGrid;
