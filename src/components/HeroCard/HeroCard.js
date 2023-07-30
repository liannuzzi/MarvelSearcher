import { useState } from "react";

function HeroCard({ hero, openModal, isFavoriteCharacter }) {
  return (
    <div>
      <div
        id="hero-card"
        className="card text-bg-dark"
        onClick={openModal}
        tabIndex={0}
      >
        {hero.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          <img
            src={"https://img.wattpad.com/cover/234231940-256-k917210.jpg"}
            class="card-img"
            alt="..."
          />
        ) : (
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            class="card-img"
            alt="..."
          />
        )}

        <div className="card-img-overlay d-flex align-items-end">
          <h5 class="card-title">{hero.name}</h5>
        </div>
        <div className="card-img-overlay d-flex align-items-start justify-content-end">
          <i
            className={`bi bi-star${
              isFavoriteCharacter ? "-fill text-warning" : ""
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
