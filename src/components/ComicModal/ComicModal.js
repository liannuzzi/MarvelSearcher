import { useEffect } from "react";
import Link from "next/link";

function ComicModal({ isOpen, onClose, heroName, heroId, comicList }) {
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      const myModal = new bootstrap.Modal(document.getElementById("myModal"));
      myModal.show();
    }
  }, [isOpen]);

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
                <ul className="modal-comic-list">
                  {comicList.map((comic) => {
                    return (
                      <Link
                        href={`/comics/${comic.id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <li
                          className="modal-comic-item"
                          key={comic.id}
                          data-bs-dismiss="modal"
                          style={{ cursor: "pointer" }}
                        >
                          <div>
                            <img
                              className="modal-comic-img"
                              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              alt={comic.title}
                            ></img>
                          </div>
                          <div className="modal-comic-information">
                            <p className="modal-comic-title">{comic.title}</p>
                            <p className="modal-comic-description">
                              {comic.description}
                            </p>
                          </div>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComicModal;
