import Circle from "../../../../components/Circle";
import "./note_card/style.css";
interface noteCardProps {
  title: string;
  paragraph: string;  
}

export default function NoteCard(props: noteCardProps) {
  return (
    <article className="note-card">
      <Circle size={16} backgroundColor={"blue"} className="edit_icon"></Circle>
      <h4>
        {props.title}
      </h4>
      <p>
        {props.paragraph}
      </p>
    </article>
  );
}