import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">Shop<span>Hub</span></Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <div className="nav-auth">
          {user ? (
            <>
              <span className="user-name">{user.name}</span>
              <button className="btn btn-sm btn-outline" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
