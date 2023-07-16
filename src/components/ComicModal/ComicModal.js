import { useEffect, useState } from "react";

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
                <ul>
                  {comicList.map((comic) => {
                    {
                      console.log(comic.title);
                    }
                    return <li key={comic.id}>{comic.title}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ComicModal;
