import React from "react";
import Skeleton from "../loader/Skeleton";

const Sources = ({ sources }) => {
  return (
    <section>
      <div className="sources-wrapper">
        <h3>Sources</h3>

        {sources ? (
          <ul className="sources-list">
            {sources &&
              sources.map((item, index) => (
                <li key={index}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </li>
              ))}
          </ul>
        ) : (
          <Skeleton />
        )}
      </div>
    </section>
  );
};

export default Sources;
