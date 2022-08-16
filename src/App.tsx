import { Alert, Snackbar } from "@mui/material";
import "./App.css";
import AddNoteForm, { Note } from "./Components/AddNoteForm";
import Layout from "./Components/Layout";
import Notes from "./Components/Notes";
import { useDataContext } from "./Contexts/DataContext";

function App() {
  const { notes, error, setError } = useDataContext();
  const pinnedNotes = notes.filter((note: Note) => note.isPinned);
  const unpinnedNotes = notes.filter((note: Note) => !note.isPinned);

  const handleClose = () => {
    setError({ set: false, message: "" });
  };

  return (
    <Layout>
      <AddNoteForm />
      {pinnedNotes.length > 0 && (
        <Notes notes={pinnedNotes} notesType="pinned" />
      )}
      {unpinnedNotes.length > 0 && (
        <Notes
          notes={unpinnedNotes}
          notesType={pinnedNotes.length > 0 ? "unpinned" : null}
        />
      )}
      <Snackbar open={error.set} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error?.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
}

export default App;
