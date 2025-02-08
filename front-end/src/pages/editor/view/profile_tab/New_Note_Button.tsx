import Circle from "../../../../components/Circle";
import "./new_note_button/style.css";

export default function NewNoteButton() {
  return (
    <button >
      <Circle {...{size: 32, backgroundColor: "white"}}></Circle>
      <span>Nova nota</span>
    </button>
  );
}