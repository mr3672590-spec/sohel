import "../styles/services.css";

const services = [
  "Web Development",
  "E-commerce",
  "Shopify",
  "Landing Page",
  "Bug Fixing",
  "SEO"
];

export default function Services() {
  return (
    <div className="services">
      <h1>My Services</h1>

      {services.map((s, i) => (
        <div key={i} className="card">
          {s}
        </div>
      ))}
    </div>
  );
}