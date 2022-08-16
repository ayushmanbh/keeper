import { createContext, useContext, useEffect, useState } from "react";
import startDatabase from "../Firebase/config";
import { set, ref, onValue, remove, update } from "firebase/database";

export const DataContext = createContext({
  notes: [],
  loading: false,
  error: { set: false, message: "" },
  addNote: (value) => {},
  deleteNote: (value) => {},
  updateNote: (value) => {},
  setError: (value) => {},
});

const DataProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ set: false, message: "" });

  const db = startDatabase();

  useEffect(() => {
    setLoading(true);
    onValue(
      ref(db),
      (snapshot) => {
        setNotes([]);
        const data = snapshot.val();
        if (data) {
          Object.values(data.notes).forEach((item) => {
            setNotes((prevState) => [...prevState, item]);
          });
        }
        setLoading(false);
      },
      (error) => {
        setError({ set: true, message: error.message });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    set(ref(db, `notes/${note.id}`), { ...note }).catch((error) => {
      setError({ set: true, message: error.message });
    });
  };

  const updateNote = (updatedNote) => {
    if (updatedNote.id.length > 0) {
      const { id } = updatedNote;
      setNotes(
        notes.map((note) => {
          if (note.id === id) {
            return {
              ...updatedNote,
            };
          }
          return note;
        })
      );

      update(ref(db, `notes/${id}`), { ...updatedNote }).catch((error) => {
        setError({ set: true, message: error.message });
      });
    }
  };

  const deleteNote = (note) => {
    if (note.id.length > 0) {
      const { id } = note;
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      remove(ref(db, `notes/${id}`)).catch((error) => {
        setError({ set: true, message: error.message });
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        notes,
        addNote,
        error,
        deleteNote,
        updateNote,
        loading,
        setError,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};

export default DataProvider;
