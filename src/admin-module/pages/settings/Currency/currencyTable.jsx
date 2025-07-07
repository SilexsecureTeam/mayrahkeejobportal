import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";

const CurrencyTable = ({ title, currencies, onDelete, onViewDetails }) => {
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <button
        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
        onClick={() => onViewDetails(rowData)}
      >
        <FaEye />
      </button>
      <button
        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
        onClick={() => onDelete(rowData.id)}
      >
        <FaTrash />
      </button>
    </div>
  );

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <DataTable
        value={currencies}
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={10}
      >
        <Column field="name" header="Name" />
        <Column field="code" header="Code" />
        <Column field="name" header="Country" />
        {title !== "Overview" && (
          <Column header="Actions" body={actionBodyTemplate} />
        )}
      </DataTable>
    </div>
  );
};

export default CurrencyTable;
