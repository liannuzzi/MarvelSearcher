function HeroCard({ hero, openModal }) {

  const handleFavClick = (e) => {
    e.stopPropagation();

    console.log("Fav icon clicked");
  };

  return (
    <div>
      {/* <Link href={`/characters/${hero.id}`}> </Link> */}
        <div
          id="hero-card"
          className="card text-bg-dark"
          onClick={openModal}
        >
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            class="card-img"
            alt="..."
          />

          <div className="card-img-overlay d-flex align-items-end">
            <h5 class="card-title">{hero.name}</h5>
          </div>
          <div className="card-img-overlay d-flex align-items-start justify-content-end">
            <i class="bi bi-star" onClick={handleFavClick}></i>
          </div>
        </div>
     
    </div>
  );
}

export default HeroCard;
