import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";

function Navigation() {
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
              <i class="bi bi-star fs-5"></i>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
