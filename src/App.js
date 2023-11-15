import React, { useState } from 'react';
import TareaForm from './TareaForm';
import ListaTareas from './ListaTareas';
import Filtros from './Filtros';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function TareaRow({ tarea, onEditar, onEliminar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tarea.tarea);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditar(tarea.id, editedText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button type="submit" className="btn btn-danger mb-2" onClick={handleSaveClick}>
            Guardar
          </button>
        </>
      ) : (
        
        <>
          
          <Button variant="outlined" color="secondary" onClick={() => onEliminar(tarea.id)}>
            Eliminar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleEditClick}>
            Editar
          </Button>
        </>
      )}
    </div>
  );
}
function App() {
  const [tareas, setTareas] = useState([
    
  ]);
  const [filtro, setFiltro] = useState("Todas");
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const agregarTarea = (texto) => {
    const nuevaTarea = { texto, completada: false, fecha: new Date() };
    setTareas([...tareas, nuevaTarea]);
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  const editarTarea = (index, nuevoTexto) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].texto = nuevoTexto;
    setTareas(nuevasTareas);
  };

  const toggleCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);
  };

  const filtrarTareas = (filtro) => {
    setFiltro(filtro);
  };

  const cambiarOrden = () => {
    setOrdenAscendente(!ordenAscendente);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'tarea', headerName: 'Tarea', width: 200 },
    { field: 'completada', headerName: 'Completada', width: 120 },
    { field: 'fecha', headerName: 'Fecha', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 500,
      renderCell: (params) => (
        <TareaRow
          tarea={params.row}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      ),
    },
  ];
  
  const rows = tareas.map((tarea, index) => ({
    id: index + 1,
    tarea: tarea.texto,
    completada: tarea.completada ? 'Sí' : 'No',
    fecha: tarea.fecha ? tarea.fecha.toLocaleString() : 'Fecha no disponible',
  }));
  
  const handleEliminar = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
  };

  const handleEditar = (id, nuevoTexto) => {
    // Implementa la lógica de edición según tus necesidades
    console.log(`Editar tarea con ID: ${id} y nuevo texto: ${nuevoTexto}`);
  };

  let tareasFiltradas = tareas;
  if (filtro === "Pendientes") {
    tareasFiltradas = tareas.filter((tarea) => !tarea.completada);
  } else if (filtro === "Completadas") {
    tareasFiltradas = tareas.filter((tarea) => tarea.completada);
  }

  return (
    
    <div className="container mt-5">
      
      <p className="h1">Lista de Tareas</p>

      <TareaForm agregarTarea={agregarTarea} />
      <Filtros filtrarTareas={filtrarTareas} cambiarOrden={cambiarOrden} />
      <ListaTareas
        tareas={tareasFiltradas}
        eliminarTarea={eliminarTarea}
        editarTarea={editarTarea}
        toggleCompletada={toggleCompletada}
        ordenAscendente={ordenAscendente}
      />
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}

export default App;
