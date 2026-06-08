import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="logo">
          Portfolio<span>.</span>
        </NavLink>
        <nav>
          <ul className="nav-links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
