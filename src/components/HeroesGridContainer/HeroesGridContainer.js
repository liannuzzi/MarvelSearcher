"use client";

import HeroesGrid from "../HeroesGrid/HeroesGrid";
import { useSearchBarContext } from "@/app/context/SearchBarContext";

function HeroesGridContainer() {
  const { searchResults } = useSearchBarContext();

  return (
    <div>
      {searchResults.length>0?
      <HeroesGrid heroes={searchResults} />:
      <p>No results for the search</p>
    }
    </div>
  );
}

export default HeroesGridContainer;
