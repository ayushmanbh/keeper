import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { ChangeEvent } from "react";
import { Note } from "../AddNoteForm/index";
import { useDataContext } from "../../Contexts/DataContext";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

interface Props {
  noteToEdit: Note | null;
  setOpen: (value: boolean) => void;
  open: boolean;
}

const EditNoteModal = (props: Props) => {
  const { noteToEdit, open, setOpen } = props;
  const { updateNote, deleteNote } = useDataContext();

  console.log(noteToEdit);

  const [editedTitle, setEditedTitle] = useState(noteToEdit?.title);
  const [editedTagline, setEditedTagline] = useState(noteToEdit?.tagline);
  const [editedBody, setEditedBody] = useState(noteToEdit?.body);

  useEffect(() => {
    if (noteToEdit != null) {
      setEditedTitle(noteToEdit.title);
      setEditedTagline(noteToEdit.tagline);
      setEditedBody(noteToEdit.body);
    }
  }, [noteToEdit]);

  const handleClose = () => {
    updateNote({
      ...noteToEdit,
      title: editedTitle,
      tagline: editedTagline,
      body: editedBody,
      updated: new Date(),
    });
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <TextField
                id="title"
                placeholder="Title"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{ mb: 1 }}
                value={editedTitle}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEditedTitle(event.target.value)
                }
              />
              <TextField
                id="tagline"
                placeholder="Tagline"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{ mb: 1 }}
                value={editedTagline}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEditedTagline(event.target.value)
                }
              />
              <TextField
                id="body"
                placeholder="Take a note..."
                variant="standard"
                InputProps={{ disableUnderline: true }}
                multiline
                value={editedBody}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEditedBody(event.target.value)
                }
              />
            </CardContent>
            <CardActions>
              <Tooltip title="Delete">
                <IconButton
                  sx={{ ml: "auto" }}
                  size="small"
                  onClick={() => deleteNote(noteToEdit)}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Done">
                <IconButton size="small" onClick={handleClose}>
                  <DoneOutlinedIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditNoteModal;
