"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import styles from "./header.module.css";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function logout() {
    try {
      const res = await axios.get("/api/logout");
      route.push("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className={styles.header}>
      <h2 className="text-lg text-black font-bold">BOOK STORE</h2>
      <nav className={styles.largeScreenLinks}>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/books"}>Books</Link>
          </li>
          <li>
            <Link href={"/category"}>category</Link>
          </li>
        </ul>
      </nav>
      <button className={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
      <nav
        className={`${isOpen ? styles.navBurgerOpen : styles.navBurgerClose}`}
      >
        <ul>
          <li>
            <Link href={"/"} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href={"/books"} onClick={() => setIsOpen(false)}>
              Books
            </Link>
          </li>
          <li>
            <Link href={"/category"} onClick={() => setIsOpen(false)}>
              category
            </Link>
          </li>
          <button className={styles.logoutBtnBurger} onClick={logout}>
            Logout
          </button>
        </ul>
      </nav>

      <div className={styles.contrelorBurgerMenu}>
        {isOpen ? (
          <span className={styles.closeMenu} onClick={() => setIsOpen(false)}>
            ✖
          </span>
        ) : (
          <GiHamburgerMenu
            className={styles.openMenu}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
