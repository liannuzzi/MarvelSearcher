import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const SearchBarContext = createContext({});

export function useSearchBarContext() {
  return useContext(SearchBarContext);
}

function debounce(func, delay) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

function extractNumberFromURL(url) {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}

export function SearchBarContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (1561 - 1 + 1)) + 1
  );
  const [apiCalledForEmptySearch, setApiCalledForEmptySearch] = useState(false);
  const [characterIdsWithFavorites, setCharacterIdsWithFavorites] = useState(
    []
  );
  const delayedAPICallRef = useRef(null);
  const router = useRouter();

  const apikey = "b801ecfcc69a63855fa551806cf20296";
  const hash = "1df3d49570e36411d700b0edf856d649";

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * (1561 - 1 + 1)) + 1);
    const characterIds = getCharacterIdsWithFavorites();
    setCharacterIdsWithFavorites(characterIds);
    if (searchTerm !== "") {
      setApiCalledForEmptySearch(false);
    }

    if (!delayedAPICallRef.current) {
      delayedAPICallRef.current = debounce((term) => {
        if (term === "") {
          if (!apiCalledForEmptySearch) {
            fetch(
              `https://gateway.marvel.com/v1/public/characters?orderBy=name&offset=${randomId}&limit=1&apikey=${apikey}&hash=${hash}`
            )
              .then((res) => res.json())
              .then((data) => {
                setSearchResults(data.data.results);
                setApiCalledForEmptySearch(true);
              });
          }
        } else if (term.includes("marvel.com/comics/issue/")) {
          const comicId = extractNumberFromURL(term);
          router.push(`/comics/${comicId}`);
        } else {
          fetch(
            `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${term}&orderBy=name&limit=100&ts=1&apikey=${apikey}&hash=${hash}`
          )
            .then((res) => res.json())
            .then((data) => {
              setSearchResults(data.data.results);
              setApiCalledForEmptySearch(false);
            });
        }
      }, 300);
    }

    delayedAPICallRef.current(searchTerm);

    return () => {
      delayedAPICallRef.current.cancel();
    };
  }, [searchTerm]);

  function searchText(text) {
    text === "" ? setSearchTerm("") : setSearchTerm(text);
  }

  function getFavoriteComics() {
    return JSON.parse(localStorage.getItem("favoriteComics")) || [];
  }

  function getCharacterIdsWithFavorites() {
    const favorites = getFavoriteComics();
    const characterIds = favorites.reduce((ids, comic) => {
      for (const character of comic.characters.items) {
        const characterId = extractCharacterIdFromURI(character.resourceURI);
        if (characterId && !ids.includes(characterId)) {
          ids.push(characterId);
        }
      }
      return ids;
    }, []);
    return characterIds;
  }

  function extractCharacterIdFromURI(uri) {
    const parts = uri.split("/");
    const characterId = parts[parts.length - 1];
    return characterId;
  }

  return (
    <SearchBarContext.Provider
      value={{
        searchTerm,
        searchResults,
        searchText,
        apikey,
        hash,
        characterIdsWithFavorites,
        setCharacterIdsWithFavorites,
        setSearchResults,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
