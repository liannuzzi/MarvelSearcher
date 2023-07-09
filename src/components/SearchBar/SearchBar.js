"use client";
import { useSearchBarContext } from "@/app/context/SearchBarContext";

function SearchBar() {
  const { searchTerm, searchText } = useSearchBarContext();

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
