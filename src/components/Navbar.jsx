function Navbar() {
  return (
    <nav style={{
      position: "fixed",
      width: "100%",
      top: 0,
      background: "#020617",
      padding: "10px"
    }}>
      <a href="#">Home </a>
      <a href="#about"> About </a>
      <a href="#skills"> Skills </a>
      <a href="#projects"> Projects </a>
    </nav>
  );
}

export default Navbar;