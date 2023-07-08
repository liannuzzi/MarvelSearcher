import Link from 'next/link'
import SearchBar from '../SearchBar/SearchBar';

function Navigation() {
    return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img id="marvel-logo" src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"></img>
    <div className='d-flex'>
    <SearchBar/>
    <span id='favorites-search-bar'>
        <i class="bi bi-star"></i>
    </span>
    </div>
    </nav>
 </div>
    );
}

export default Navigation;
