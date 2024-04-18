import { useContext } from "react";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext.jsx";
import { NoteContext } from "../../Context/NoteContext.jsx";
import { showDeleteModal, showUpdatemodal } from "../../utils/Note.js";

export default function Note({ noteobj }) {
  const { token } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);

  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">
            {noteobj.title}
          </h2>
          <p className={`mb-0 mt-2`}>{noteobj.content}</p>
        </div>

        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer me-2"
            onClick={() =>
              showUpdatemodal({
                prevContent: noteobj.content,
                prevTitle: noteobj.title,
                noteID: noteobj._id,
                token,
                updater: setNotes,
              })
            }
          ></i>

          <i
            className="bi bi-archive-fill pointer"
            onClick={() =>
              showDeleteModal({ noteID: noteobj._id, token, updater: setNotes })
            }
          ></i>
        </div>
      </div>
    </>
  );
}
