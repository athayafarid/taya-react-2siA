import Card from "./Card";

function Skills() {
  return (
    <section>
      <h2>Skills</h2>
      <Card title="HTML" desc="Struktur web" />
      <Card title="CSS" desc="Styling & layout" />
      <Card title="JavaScript" desc="Logic web" />
      <Card title="React" desc="Frontend modern" />
    </section>
  );
}

export default Skills;