import React from "react";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import socket from "../../sockets";
import { useForm } from "../../Hooks/useForm";

export const InputMessages = ({ nombreUser }) => {
  const classes = useStyles();
  const initialForm = {
    textMessage: "",
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);

  const onClick = (e) => {
    socket.emit("mensaje", nombreUser, formValues.textMessage);
    reset();
  };

  return (
    <div className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="Escribir mensaje"
        className={classes.wrapText}
        onChange={handleInputChange}
        value={formValues.textMessage}
        name="textMessage"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClick}
      >
        <SendIcon />
      </Button>
    </div>
  );
};
