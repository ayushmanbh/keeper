import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Note } from "../AddNoteForm";
import NoteCard from "../NoteCard";
import EditNoteModal from "../EditNoteModal";

interface OwnProps {
  notes: Note[];
  notesType?: string | null;
}

const Notes = (props: OwnProps) => {
  const { notes, notesType } = props;
  const [open, setOpen] = useState(false);
  const [selectedNote, setselectedNote] = useState<Note | null>(null);

  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        fontSize="small"
        sx={{ textTransform: "uppercase", fontWeight: 500 }}
        color="text.secondary"
      >
        {notesType}
      </Typography>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          {notes.map((note: Note) => (
            <Grid item xs={4} key={note.id}>
              <NoteCard
                note={note}
                setNoteToEdit={setselectedNote}
                setOpen={setOpen}
              />
            </Grid>
          ))}
        </Grid>

        <EditNoteModal
          noteToEdit={selectedNote}
          open={open}
          setOpen={setOpen}
        />
      </Box>
    </Box>
  );
};

export default Notes;
