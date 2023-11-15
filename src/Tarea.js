import React, { useState } from 'react';
import Button from '@mui/material/Button';

function Tarea({ tarea, onDelete, onEdit, completada, fecha }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tarea);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <li>
      <input type="checkbox" checked={completada} onChange={() => {}} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <Button variant="outlined" color="primary" onClick={handleSaveClick}>
            Guardar
          </Button>
        </>
      ) : (
        <>
          {tarea} - {fecha}
          <Button variant="outlined" color="secondary" onClick={() => onDelete()}>
            Eliminar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleEditClick}>
            Editar
          </Button>
        </>
      )}
    </li>
  );
}

export default Tarea;