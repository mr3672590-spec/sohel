import "../styles/home.css";
import web from "../assets/web.jpg";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <img src={web} className="avatar" />

        <h1>Hi, I'm Sohel Rana</h1>
        <h2>Web Developer</h2>

        <p>
          I build modern responsive websites.
        </p>

        <div className="socials">
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="preview">
        <h2>About Me</h2>
        <p>I am a passionate Web Developer from Bangladesh.</p>
      </section>

    </div>
  );
}