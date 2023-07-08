import HeroCard from "../HeroCard/HeroCard";

function HeroesGrid({heroes}) {
  
  return (
    <div className="heroes-grid">
      {heroes?heroes.map((hero)=><HeroCard hero={hero} />):<p>Loading Heroes...</p>}
    </div>
  );
}

export default HeroesGrid;
