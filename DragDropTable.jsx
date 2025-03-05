import React, { useState } from "react";
import { FiList } from "react-icons/fi";
import "./dragDropTable.css";

const DragDropTable = () => {
  const [rows, setRows] = useState([
    ["Ragga Muffin", "Breakfast", "35 min", "2"],
    ["Rasta Salata", "Vegan", "25 min", "4"],
    ["Green Park", "Lunch", "90 min", "6"],
    ["Pasta", "Breakfast", "35 min", "2"],
    ["Salat", "Vegan", "25 min", "4"],
    ["Steak", "Lunch", "90 min", "6"],
    ["Avocado Toast", "Breakfast", "35 min", "2"],
    ["Greek Yogurt Parfait", "Vegan", "25 min", "4"],
    ["Turkey", "Lunch", "90 min", "6"],
    ["Quinoa Bowl", "Breakfast", "35 min", "2"],
    ["Veggie Wrap", "Vegan", "25 min", "4"],
    ["Grilled Chicken Salad", "Lunch", "90 min", "6"],
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const editRow = (index) => {
    alert(`Редактирование строки ${index + 1}`);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== index) {
      const updatedRows = [...rows];
      const draggedRow = updatedRows[draggedIndex];
      updatedRows.splice(draggedIndex, 1);
      updatedRows.splice(index, 0, draggedRow); 
      setRows(updatedRows);
    }
  };

  return (
    <div className="DragDropTable p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="tr">
            <th className="recipe">Recipe Name</th>
            <th className="text-left">Meal Type</th>
            <th className="text-left">Prep. Time</th>
            <th className="servers">Servers</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="tr"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`${
                    cellIndex === 0 ? "left-cell" : ""
                  }`} 
                >
                  {cellIndex === 0 ? <FiList className="fi" /> : ""} {cell}{" "}
                </td>
              ))}
              <td className="text-right">
                <button
                  onClick={() => editRow(index)}
                  className="edit"
                >
                  EDIT RECIPE
                </button>
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-900 font-bold hover:text-red-700 hover:border-red-700"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DragDropTable;
