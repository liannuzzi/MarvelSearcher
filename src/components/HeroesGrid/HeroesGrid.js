import HeroCard from "../HeroCard/HeroCard";
import { useEffect, useState } from "react";
import ComicModal from "../ComicModal/ComicModal";
import { useSearchBarContext } from "@/context/SearchBarContext";

function HeroesGrid({ heroes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [comicList, setComicList] = useState([]);
  const { apikey } = useSearchBarContext();

  useEffect(() => {
    if (selectedCard) {
      fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${selectedCard?.id}/comics?orderBy=-onsaleDate&limit=100&apikey=${apikey}`
      )
        .then((res) => res.json())
        .then((data) => {
          setComicList(data.data.results);
        });
    }
  }, [selectedCard]);

  const openModal = (hero) => {
    setSelectedCard(hero);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isFavoriteCharacter = (heroId) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteComics")) || [];
    return favorites.some((comic) =>
      comic.characters?.items.some((character) =>
        character.resourceURI.endsWith(`/${heroId}`)
      )
    );
  };

  return (
    <div className="heroes-grid">
      {heroes ? (
        heroes.map((hero) => (
          <HeroCard
            hero={hero}
            key={hero.id}
            openModal={() => openModal(hero)}
            isFavoriteCharacter={isFavoriteCharacter(hero.id)}
          />
        ))
      ) : (
        <p>Loading Heroes...</p>
      )}
      {comicList.length > 0 && (
        <ComicModal
          isOpen={isModalOpen}
          onClose={closeModal}
          heroName={selectedCard?.name}
          comicList={comicList}
        />
      )}
    </div>
  );
}

export default HeroesGrid;
