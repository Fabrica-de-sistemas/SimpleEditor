import Circle from "../components/Circle";
import "./configurations/style.css";

export default function ConfigurationsList() {
  return (
    <section className="configurations_list">
      <h4>Configurations</h4>
      <ul>
        <li> <Circle size={32} backgroundColor={"grey"}></Circle> Configurações</li>
        <li> <Circle size={32} backgroundColor={"grey"}></Circle> Logout</li>
      </ul>
    </section>
  );
}