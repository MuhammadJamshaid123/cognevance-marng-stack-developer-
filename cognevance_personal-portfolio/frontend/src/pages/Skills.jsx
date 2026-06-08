const skills = [
  { category: 'Frontend', items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'React Router'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'bcrypt'] },
  { category: 'Database', items: ['MongoDB', 'Mongoose', 'Schema Design'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Vite', 'Postman', 'Render/Vercel'] },
];

export default function Skills() {
  return (
    <section className="page-section">
      <div className="container">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map(({ category, items }) => (
            <div key={category} className="skill-card">
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
