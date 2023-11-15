import React, { useState } from 'react';

function TareaForm({ agregarTarea }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState(""); // Asegúrate de importar useState

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el texto no esté en blanco o sea demasiado largo
    if (texto.trim() === "") {
      setError("La tarea no puede estar en blanco.");
      return;
    }

    if (texto.length > 50) {
      setError("La tarea es demasiado larga. Debe tener menos de 50 caracteres.");
      return;
    }

    // Si pasa las validaciones, agregar la tarea
    agregarTarea(texto);
    setTexto("");
    setError(""); // Limpiar el mensaje de error
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="form-group mx-sm-3 mb-2">
        <input
          type="text"
          placeholder="Añadir tarea..."
          className="form-control"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mb-2">Agregar Tarea</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
}

export default TareaForm;
