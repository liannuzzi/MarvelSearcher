import { createContext, useContext, useState, useEffect, useRef } from "react";

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

export function SearchBarContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (1561 - 1 + 1)) + 1
  );
  const [apiCalledForEmptySearch, setApiCalledForEmptySearch] = useState(false);
  const delayedAPICallRef = useRef(null);

  const apikey = "798a820405391028076a4b49bc50f7f5";
  const hash = "ff9f3b6fdf656a1b6f8c8250040cfb6e";

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * (1561 - 1 + 1)) + 1);
    if (searchTerm !== "") {
      setApiCalledForEmptySearch(false);
    }

    if (!delayedAPICallRef.current) {
      delayedAPICallRef.current = debounce((term) => {
        if (term === "") {
          if (!apiCalledForEmptySearch) {
            fetch(
              `http://gateway.marvel.com/v1/public/characters?orderBy=name&offset=${randomId}&limit=1&apikey=${apikey}&hash=${hash}`
            )
              .then((res) => res.json())
              .then((data) => {
                setSearchResults(data.data.results);
                setApiCalledForEmptySearch(true);
                console.log("Se ejecutó fetch vacio");
              });
          }
        } else {
          fetch(
            `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${term}&orderBy=name&limit=100&ts=1&apikey=${apikey}&hash=${hash}`
          )
            .then((res) => res.json())
            .then((data) => {
              setSearchResults(data.data.results);
              setApiCalledForEmptySearch(false);
              console.log("Se ejecutó fetch con contenido");
            });
        }
      }, 2000);
    }

    delayedAPICallRef.current(searchTerm);

    return () => {
      delayedAPICallRef.current.cancel();
    };
  }, [searchTerm]);

  function searchText(text) {
    text === "" ? setSearchTerm("") : setSearchTerm(text);
  }

  return (
    <SearchBarContext.Provider
      value={{
        searchTerm,
        searchResults,
        searchText,
        apikey,
        hash,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
