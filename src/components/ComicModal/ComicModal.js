import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import * as bootstrap from "bootstrap";
window.Modal = bootstrap.Modal;

function ComicModal({ isOpen, onClose, heroName, comicList }) {
  if (!isOpen) return null;

  const [favoriteComics, setFavoriteComics] = useState(
    JSON.parse(localStorage.getItem("favoriteComics")) || []
  );

  useEffect(() => {
    if (isOpen) {
      const myModal = new bootstrap.Modal(document.getElementById("myModal"));
      myModal.show();
    }
  }, [isOpen]);

  const isFavoriteComic = (comicId) => {
    return favoriteComics.some((comic) => comic.id === comicId);
  };

  const handleFavoriteToggle = (e, comicId) => {
    e.stopPropagation();
    const isComicInFavorites = favoriteComics.some(
      (comic) => comic.id === comicId
    );

    if (isComicInFavorites) {
      const updatedFavorites = favoriteComics.filter(
        (comic) => comic.id !== comicId
      );
      setFavoriteComics(updatedFavorites);
      localStorage.setItem("favoriteComics", JSON.stringify(updatedFavorites));
    } else {
      const comicToAdd = comicList.find((comic) => comic.id === comicId);
      if (comicToAdd) {
        setFavoriteComics([...favoriteComics, comicToAdd]);
        localStorage.setItem(
          "favoriteComics",
          JSON.stringify([...favoriteComics, comicToAdd])
        );
      }
    }
  };

  return (
    <div>
      <div class="modal" tabIndex="-1" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{heroName}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div class="modal-body">
              <div>
                {comicList.length === 0 ? (
                  <p>No comics for this character</p>
                ) : (
                  <ul className="modal-comic-list">
                    {comicList.map((comic) => {
                      return (
                        <li className="modal-comic-item" key={comic.id}>
                          <Link
                            href={`/comics/${comic.id}`}
                            style={{
                              color: "inherit",
                              textDecoration: "inherit",
                            }}
                          >
                            <div>
                              <img
                                className="modal-comic-img"
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                                data-bs-dismiss="modal"
                              ></img>
                            </div>
                          </Link>
                          <div className="modal-comic-information">
                            <p className="modal-comic-title">
                              {comic.title}
                              <i
                                className={`bi bi-star${
                                  isFavoriteComic(comic.id)
                                    ? "-fill text-warning"
                                    : ""
                                }`}
                                onClick={(e) =>
                                  handleFavoriteToggle(e, comic.id)
                                }
                                style={{ cursor: "pointer", marginLeft: "5px" }}
                              ></i>
                            </p>
                            <p className="modal-comic-description">
                              {comic.description}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicModal;
