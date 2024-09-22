import React from "react";
import { useTheme } from "../hooks/ThemeContext";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <footer className={`footer xl:px-24 py-10 px-4 text-base-content ${
          isDarkMode ? "dark" : "" // Apply dark mode class
        }`}>
        <aside>
          <img src="/logo.png" alt="Logo" />
          <p className="my-3 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav>
          <header className="footer-title text-black">Useful links</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link link-hover">example@email.com</a>
          <a className="link link-hover">+64 958 248 966</a>
          <a className="link link-hover">Social media</a>
        </nav>
      </footer>
      <hr />
      <footer className={`footer items-center xl:px-24 px-4 py-4 mt-2 ${
          isDarkMode ? "dark" : "" // Apply dark mode class
        }`}>
        <aside className="items-center grid-flow-col">
          <p>Copyright © 2023 - All rights reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors duration-200">
            <FaFacebook className="fill-current h-6 w-6" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors duration-200">
            <FaLinkedin className="fill-current h-6 w-6" />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-gray-700 transition-colors duration-200">
            <FaGithub className="fill-current h-6 w-6" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-600 transition-colors duration-200">
            <FaInstagram className="fill-current h-6 w-6" />
          </a>
          <a href="#" aria-label="LeetCode" className="hover:text-orange-500 transition-colors duration-200">
            <SiLeetcode className="fill-current h-6 w-6" />
          </a>
          <a href="#" aria-label="Code" className="hover:text-yellow-500 transition-colors duration-200">
            <FaCode className="fill-current h-6 w-6" />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
