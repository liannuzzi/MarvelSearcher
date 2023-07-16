"use client";

import HeroesGrid from "../HeroesGrid/HeroesGrid";
import { useSearchBarContext } from "@/app/context/SearchBarContext";

function HeroesGridContainer() {
  const { searchResults, searchTerm } = useSearchBarContext();

  return (
    <div>
      {searchResults.length===0 && searchTerm!==''?
      <p>No results for the search</p>:
      <HeroesGrid heroes={searchResults} />
    }
    </div>
  );
}

export default HeroesGridContainer;
