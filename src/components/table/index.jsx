import React from "react";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  // Render the UI for your table
  return (
    <div className="App">
            <table>
                <tr>
                    <th>{columns[0]}</th>
                    <th>{columns[1]}</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.columns[0]}</td>
                            <td>{val.columns[1]}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
  );
}

export default Table;