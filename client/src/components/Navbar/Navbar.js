import "./Navbar.scss";

function Navbar({ className }) {
  const items = ["Про нас", "Персонал", "Меню", "Новини", "Контакти"];
  return (
    <nav className={`${`navbar ${className}`}`}>
      <ul className="navbar__list">
        {items.map((item, i) => (
          <li className="navbar__item" key={i}>
            <a href="#" className="navbar__link">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
