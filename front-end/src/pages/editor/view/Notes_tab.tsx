import NoteCard from "./notes_tab/note_card";
import NotesTextArea from "./notes_tab/note_textarea";
import "./notes_tab/style.css";

export default function NotesTab() {
  return (
    <section className="notes-tab">
      <h3>Notas</h3>
      <hr />
      <NotesTextArea></NotesTextArea>
      <NoteCard title={"Organização Financeira"} paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quidem?"}></NoteCard>
      <NoteCard title={"Banco de dados"} paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quidem?"}></NoteCard>
    </section>
  );
}