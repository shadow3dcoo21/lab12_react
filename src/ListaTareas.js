import React from 'react';
import Tarea from './Tarea';

function ListaTareas({ tareas, eliminarTarea, editarTarea, toggleCompletada, ordenAscendente }) {
  const tareasOrdenadas = [...tareas].sort((a, b) => {
    const fechaA = a.fecha;
    const fechaB = b.fecha;

    return ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
  });

  return (
    <ul className="list-group">
      {tareasOrdenadas.map((tarea, index) => (
        <Tarea
          key={index}
          tarea={tarea.texto}
          completada={tarea.completada}
          fecha={tarea.fecha ? tarea.fecha.toLocaleString() : "Fecha no disponible"}
          onDelete={() => eliminarTarea(index)}
          onEdit={(nuevoTexto) => editarTarea(index, nuevoTexto)}
          onToggleCompletada={() => toggleCompletada(index)}
        />
      ))}
    </ul>
  );
}

export default ListaTareas;