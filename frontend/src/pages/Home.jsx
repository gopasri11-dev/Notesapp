import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Home() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);


  // =========================
  // FETCH NOTES
  // =========================
  const fetchNotes = async () => {
    try {

      const res = await API.get("/notes");

      setNotes(res.data);

    } catch (error) {
      console.error("Fetch Notes Error:", error);
      alert("Failed to fetch notes");
    }
  };


  useEffect(() => {
    fetchNotes();
  }, []);


  // =========================
  // ADD NOTE
  // =========================
  const addNote = async () => {

    if (!content.trim()) {
      return alert("Content is required");
    }

    try {

      await API.post("/notes", {
        title,
        content
      });

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {
      console.error(error);
      alert("Failed to add note");
    }
  };


  // =========================
  // DELETE NOTE
  // =========================
  const deleteNote = async (id) => {

    try {

      await API.delete(`/notes/${id}`);

      fetchNotes();

    } catch (error) {
      console.error(error);
      alert("Failed to delete note");
    }
  };


  // =========================
  // START EDIT
  // =========================
  const startEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };


  // =========================
  // UPDATE NOTE
  // =========================
  const updateNote = async () => {

    if (!content.trim()) {
      return alert("Content is required");
    }

    try {

      await API.put(`/notes/${editingId}`, {
        title,
        content
      });

      setEditingId(null);
      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {
      console.error(error);
      alert("Failed to update note");
    }
  };


  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };


  return (
    <>
      <Navbar />

      <div className="home">

        <h1>My Notes</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {
          editingId ? (
            <>
              <button onClick={updateNote}>
                Update Note
              </button>

              <button onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={addNote}>
              Add Note
            </button>
          )
        }

        <div className="notes-container">

          {notes.map((note) => (
            <div className="note-card" key={note._id}>

              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <button onClick={() => startEdit(note)}>
                Edit
              </button>

              <button onClick={() => deleteNote(note._id)}>
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Home;