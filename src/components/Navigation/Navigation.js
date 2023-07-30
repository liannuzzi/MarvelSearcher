import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchBarContext } from "@/context/SearchBarContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Navigation() {
  const {
    characterIdsWithFavorites,
    setCharacterIdsWithFavorites,
    apikey,
    setSearchResults,
    searchResults,
  } = useSearchBarContext();
  const [isStarActive, setIsStarActive] = useState(false);
  const router = useRouter();

  const fetchHeroesWithFavorites = () => {
    // Clear searchResults before fetching data for characters with favorites
    setSearchResults([]);

    // Fetch hero data for characters with favorite comics
    Promise.all(
      characterIdsWithFavorites.map((characterId) =>
        fetch(
          `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${apikey}`
        ).then((res) => res.json())
      )
    )
      .then((results) => {
        const heroesWithFavoritesData = results.map(
          (result) => result.data.results[0]
        );
        // Update the searchResults state with the data for characters with favorite comics
        setSearchResults((prevSearchResults) => [
          ...prevSearchResults,
          ...heroesWithFavoritesData,
        ]);
      })
      .catch((error) => {
        console.error("Error fetching heroes with favorite comics:", error);
        setSearchResults([]);
      });
  };
  useEffect(() => {
    // Fetch characterIds with favorite comics when the component mounts
    fetchHeroesWithFavorites();
  }, []);

  const handleStarClick = () => {
    setIsStarActive(!isStarActive);
    !isStarActive
      ? fetchHeroesWithFavorites(characterIdsWithFavorites)
      : window.location.reload();
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link href="/">
            <img
              id="marvel-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            ></img>
          </Link>
          <div
            className="d-flex align-items-center container-fluid"
            id="nav-container"
          >
            <SearchBar />
            <span id="favorites-search-bar">
              <i
                class={`bi bi-star fs-5 ${isStarActive ? "text-warning" : ""}`}
                onClick={handleStarClick}
              ></i>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
