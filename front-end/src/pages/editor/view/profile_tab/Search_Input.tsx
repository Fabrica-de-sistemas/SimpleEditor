import Circle from "../components/Circle";
import "./search_input/style.css";

export default function SearchInput() {
  return (
    <label className="search_input" htmlFor="procurar_texto">
      <Circle {...{size: 32, backgroundColor: "blue"}}></Circle>
      <input id="procurar_texto" type="text" placeholder="Procurar..." />
    </label>
  );
}