import foto from "../assets/keken.jpg";

function Hero() {
  return (
    <section className="hero">
      
      <img src={foto} alt="foto" className="profile" />

      <h1>Halo, Gue Keken 👋</h1>
      <p>Frontend Developer | UI/UX Enthusiast</p>

    </section>
  );
}

export default Hero;