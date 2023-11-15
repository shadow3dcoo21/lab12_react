import React from 'react';

function Filtros({ filtrarTareas, cambiarOrden }) {
  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={() => filtrarTareas("Todas")}>Todas</button>
      <button type="button" className="btn btn-secondary" onClick={() => filtrarTareas("Pendientes")}>Pendientes</button>
      <button type="button" className="btn btn-secondary" onClick={() => filtrarTareas("Completadas")}>Completadas</button>
      <button type="button" className="btn btn-secondary" onClick={cambiarOrden}>
        {cambiarOrden ? "Ordenar Ascendente" : "Ordenar Descendente"}
      </button>
    </div>
  );
}

export default Filtros;
