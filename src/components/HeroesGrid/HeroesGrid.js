import HeroCard from "../HeroCard/HeroCard";

function HeroesGrid({heroes}) {
  
  return (
    <div>
      {heroes.map((hero)=><HeroCard hero={hero} />)}
    </div>
  );
}

export default HeroesGrid;
