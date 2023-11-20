import React from "react";
import "./style.css";

function Table({ columns, data, showTitle}) {
   const key1 = columns[0];
   const key2 = columns[1];
  // Render the UI for your table
  return (
    <div className="table-box">
        <table>
            {showTitle ? <tr>
                <th>{key1}</th>
                <th>{key2}</th>
            </tr>
            : ''}
            {data.map((val, key) => {
                return (
                    <tr key={key}>
                        <td>{val[key1]}</td>
                        <td>{val[key2]}</td>
                    </tr>
                )
            })}
        </table>
    </div>

  );
}

export default Table;