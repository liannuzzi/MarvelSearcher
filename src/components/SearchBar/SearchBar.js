'use client'
import { useState,useEffect } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&orderBy=name&limit=100&ts=1&apikey=798a820405391028076a4b49bc50f7f5&hash=ff9f3b6fdf656a1b6f8c8250040cfb6e`)
    .then((res) => res.json())
    .then((data) => {
        setSearchResults(data.data.results)
    })
}, [searchTerm])

  return (
    <div>
      <form class="form-inline my-2 my-lg-0">
        <div class="input-group">
          <span class="input-group-text " id="basic-addon1">
            <i class="bi bi-search"></i>
          </span>
          <input
            id="search-bar"
            class="form-control mr-sm-2 "
            value={searchTerm}
            onInput={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
