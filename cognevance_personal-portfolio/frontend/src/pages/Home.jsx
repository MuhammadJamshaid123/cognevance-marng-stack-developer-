import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <p className="eyebrow">MERN Stack Developer</p>
        <h1>Hi, I&apos;m a Full-Stack Developer building modern web applications.</h1>
        <p className="subtitle">
          Passionate about creating responsive, user-friendly experiences with React, Node.js, and MongoDB.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
          <Link to="/contact" className="btn btn-outline">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}
