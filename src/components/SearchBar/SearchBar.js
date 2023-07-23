"use client";
import { useSearchBarContext } from "@/context/SearchBarContext";

function SearchBar() {
  const { searchTerm, searchText } = useSearchBarContext();

  return (
    <div className="container-fluid">
      <form class="form-inline my-2 my-lg-0">
        <div class="input-group">
          <input
            id="search-bar"
            class="form-control mr-sm-2 "
            value={searchTerm}
            onInput={(e) => searchText(e.target.value)}
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
