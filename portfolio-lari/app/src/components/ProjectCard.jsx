export default function ProjectCard({ project }) {
  const { title, category, description, image, techs } = project
  return (
    <article className="card">
      <p className="card__heading">
        <span className="accent">{title}</span> // {category}
      </p>
      <div className="card__box">
        {image ? (
          <img className="card__img" src={image} alt={title} />
        ) : (
          <div className="card__img card__img--empty" />
        )}
        <div className="card__body">
          <p>{description}</p>
          <p className="muted">{techs.join(' · ')}</p>
          <button className="btn">más-info</button>
        </div>
      </div>
    </article>
  )
}
