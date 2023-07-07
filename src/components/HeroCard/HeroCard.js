function HeroCard({ hero }) {
  return (
    <div>
      <div class="card text-bg-dark">
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          class="card-img"
          alt="..."
        />
        <div class="card-img-overlay d-flex align-items-end">
          <h5 class="card-title">{hero.name}</h5>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
