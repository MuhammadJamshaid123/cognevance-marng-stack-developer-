export default function About() {
  return (
    <section className="page-section">
      <div className="container narrow">
        <h2>About Me</h2>
        <p>
          I am a MERN stack developer with hands-on experience building full-stack web applications.
          I enjoy turning complex problems into simple, elegant solutions through clean code and thoughtful design.
        </p>
        <p>
          My focus areas include REST API development, responsive UI design, authentication systems,
          and database-driven applications using MongoDB.
        </p>
        <div className="info-grid">
          <div className="info-card">
            <h3>Education</h3>
            <p>B.Tech in Computer Science</p>
          </div>
          <div className="info-card">
            <h3>Location</h3>
            <p>India</p>
          </div>
          <div className="info-card">
            <h3>Availability</h3>
            <p>Open to opportunities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
