import HeroCard from "../HeroCard/HeroCard";
import { useEffect, useState } from "react";
import ComicModal from "../ComicModal/ComicModal";

function HeroesGrid({ heroes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [comicList, setComicList] = useState([]);

  useEffect(()=>{
    if(selectedCard){
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${selectedCard?.id}/comics?orderBy=-onsaleDate&limit=100&apikey=798a820405391028076a4b49bc50f7f5`
    )
      .then((res) => res.json())
      .then((data) => {
        setComicList(data.data.results);
      });}
      
  },[selectedCard])

  const openModal = (hero) => {
    setSelectedCard(hero);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="heroes-grid">
      {heroes ? (
        heroes.map((hero) => (
          <HeroCard
            hero={hero}
            key={hero.id}
            openModal={() => openModal(hero)}
          />
        ))
      ) : (
        <p>Loading Heroes...</p>
      )}
      {comicList.length > 0&&<ComicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        heroName={selectedCard?.name}
        heroId={selectedCard?.id}
        comicList={comicList}
      />}      
   </div>
  );
}

export default HeroesGrid;
