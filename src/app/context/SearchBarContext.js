import { createContext, useContext, useState, useEffect } from "react";

export const SearchBarContext = createContext({});

export function useSearchBarContext() {
  return useContext(SearchBarContext);
}

export function SearchBarContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * (1561 - 1 + 1)) + 1
  );

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * (1561 - 1 + 1)) + 1);
    searchTerm === ""
      ? fetch(
          `http://gateway.marvel.com/v1/public/characters?orderBy=name&offset=${randomId}&limit=1&apikey=798a820405391028076a4b49bc50f7f5&hash=ff9f3b6fdf656a1b6f8c8250040cfb6e`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data.data.results);
          })
      : fetch(
          `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&orderBy=name&limit=100&ts=1&apikey=798a820405391028076a4b49bc50f7f5&hash=ff9f3b6fdf656a1b6f8c8250040cfb6e`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data.data.results);
          });
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
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
