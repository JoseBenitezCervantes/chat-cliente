import React, { useState, useEffect, useRef } from "react";
import socket from "../../sockets";
import { Paper } from "@material-ui/core";
// import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "../../components/Messages";
import useStyles from "./styles";
import { InputMessages } from "../../components/InputMessages";
import { formatDate } from "../../misc";

const Chat = ({ nombreUser }) => {
  const [mensajes, setMensajes] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    socket.emit("conectado", nombreUser);
    //Se recuperan mensajes anteriores
    socket.on("mensajesHistory", (mensajesServer) => {
      setMensajes(mensajesServer);
    });
  }, [nombreUser]);

  useEffect(() => {
    //Se escuchan mensajes entrantes
    socket.on("mensajes", (mensajesServer) => {
      setMensajes([...mensajes, mensajesServer]);
    });
    return () => {
      socket.off(nombreUser);
    };
  }, [mensajes]);

  //Referencia del scroll
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const rederMessage = ({ mensaje, nombre, date }, key) => {
    switch (nombre) {
      case "Servidor":
        return <h5 key={key}>{mensaje}</h5>;
      case nombreUser:
        return (
          <MessageRight
            key={key}
            message={mensaje}
            timestamp={formatDate(date)}
            displayName={nombre}
          />
        );
      default:
        return (
          <MessageLeft
            key={key}
            message={mensaje}
            timestamp={formatDate(date)}
            photoURL="https://randomuser.me/api/portraits/thumb/men/75.jpg"
            displayName={nombre}
            avatarDisp={true}
          />
        );
    }
  };

  return (
    <Paper className={classes.paper}>
      <Paper id="style-1" className={classes.messagesBody}>
        {mensajes.length ? (
          mensajes.map((item, key) => rederMessage(item, key))
        ) : (
          <h4>Sin mensajes...</h4>
        )}
        <div ref={divRef}></div>
      </Paper>
      <InputMessages {...{ nombreUser }} />
    </Paper>
  );
};

export default Chat;
