function HeroCard({ hero, openModal }) {

  return (
    <div>
      <div id="hero-card" className="card text-bg-dark" onClick={openModal}>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          class="card-img"
          alt="..."
        />

        <div className="card-img-overlay d-flex align-items-end">
          <h5 class="card-title">{hero.name}</h5>
        </div>
        <div className="card-img-overlay d-flex align-items-start justify-content-end">
          <i class="bi bi-star"></i>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
