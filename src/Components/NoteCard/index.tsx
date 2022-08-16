import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Note } from "../AddNoteForm";
import { useDataContext } from "../../Contexts/DataContext";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface OwnProps {
  note: Note;
  setNoteToEdit: (value: Note) => void;
  setOpen: (value: boolean) => void;
}

const NoteCard = (props: OwnProps) => {
  const { title, tagline, body, isPinned } = props.note;
  const { deleteNote, updateNote } = useDataContext();

  const handlePinNote = () => {
    if (props.note.isPinned) {
      updateNote({
        ...props.note,
        isPinned: false,
      });
    } else {
      updateNote({
        ...props.note,
        isPinned: true,
      });
    }
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {tagline}
        </Typography>
        <Typography variant="body2">
          {body.length > 50 ? body.slice(0, 30) + "..." : body}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Edit">
          <IconButton
            sx={{ ml: "auto" }}
            size="small"
            onClick={() => {
              props.setNoteToEdit({ ...props.note });
              props.setOpen(true);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={isPinned ? "Unpin" : "pin"}>
          <IconButton size="small" onClick={handlePinNote}>
            <PushPinOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={() => deleteNote(props.note)}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
