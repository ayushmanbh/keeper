import { Box, ClickAwayListener, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useRef, useState } from "react";
import { useDataContext } from "../../Contexts/DataContext";
import { v4 as uuid } from "uuid";

export interface Note {
  id: string;
  title: string;
  tagline: string;
  body: string;
  isPinned: boolean;
  created: string;
  updated: string;
}

export const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
`;

const AddNoteForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [showTextfield, setShowTextfield] = useState(false);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  const { addNote } = useDataContext();

  const handleClickAway = (): void => {
    setShowTextfield(false);
    if (formRef.current) formRef.current.style.minHeight = "30px";
    setTitle("");
    setTagline("");
    setBody("");

    if (!title) {
      return;
    }

    const currentDate = new Date();
    addNote({
      id: uuid(),
      title,
      tagline,
      body,
      isPinned: false,
      created: currentDate,
      updated: currentDate,
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Form ref={formRef}>
        {showTextfield && (
          <>
            <TextField
              id="title"
              placeholder="Title"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ mb: 1 }}
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
            />
            <TextField
              id="tagline"
              placeholder="Tagline"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ mb: 1 }}
              value={tagline}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTagline(event.target.value)
              }
            />
          </>
        )}
        <TextField
          id="body"
          placeholder="Take a note..."
          variant="standard"
          InputProps={{ disableUnderline: true }}
          multiline
          value={body}
          onClick={() => setShowTextfield(true)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBody(event.target.value);
            if (formRef.current) formRef.current.style.minHeight = "70px";
          }}
        />
      </Form>
    </ClickAwayListener>
  );
};

export default AddNoteForm;
