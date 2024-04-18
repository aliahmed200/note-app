import { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import { NoteContext } from "../../Context/NoteContext.jsx";
import Loading from "../Loading/Loading.jsx";
import Note from "../Note/Note.jsx";
import { getAllNotes } from "../../utils/Note.js";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Home() {
  const { notes, setNotes } = useContext(NoteContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    getAllNotes({ token, updater: setNotes });
  }, []);

  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>

      {notes === null ? (
        <Loading />
      ) : notes.length === 0 ? (
        <h2>No Notes found</h2>
      ) : (
        <div className={styles.notes}>
          {notes.map((note) => (
            <Note noteobj={note} key={note._id} />
          ))}
        </div>
      )}
    </>
  );
}
