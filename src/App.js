import { useState } from 'react';
import Chat from './views/Chat';
import Resgistro from './views/Registro';
import useStyles from "./styles";

function App() {
  const [nombreUser, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {!registrado && (
        <Resgistro {...{setNombre, setRegistrado, nombreUser}}/>
      )}

      {registrado && <Chat nombreUser={nombreUser} />}
    </div>
  );
}

export default App;
