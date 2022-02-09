import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import SaveIcon from "@material-ui/icons/Save";

const Resgistro = ({ setRegistrado, setNombre, nombreUser }) => {
  const [error, setError] = useState(false);
  
  const onClick = () => {
    if (nombreUser !== "") {
      setRegistrado(true);
    } else {
      setError(true);
    }
  };

  return (
    <Box display={{ display: "flex" }}>
      <h2>Registro</h2>
      <TextField
        id="outlined-basic"
        value={nombreUser}
        label="Introduzca su nombre"
        variant="outlined"
        onChange={(e) => setNombre(e.target.value)}
        error={error}
        helperText={error ? "Ingrese un nombre" : ""}
      />
      <Box mt={2} display="flex" alignItems="flex-start">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={onClick}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default Resgistro;
