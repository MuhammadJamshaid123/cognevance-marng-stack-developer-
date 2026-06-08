const projects = [
  {
    title: 'Task Management System',
    description: 'Full-stack app with JWT auth, task CRUD, filtering, status updates, and deadlines.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
  },
  {
    title: 'E-Commerce Platform',
    description: 'Complete MERN e-commerce with cart, orders, payments, admin panel, and analytics.',
    tech: ['React', 'Express', 'Stripe', 'MongoDB'],
  },
  {
    title: 'Personal Portfolio',
    description: 'Responsive portfolio with React Router and MongoDB-backed contact form.',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
];

export default function Projects() {
  return (
    <section className="page-section">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
