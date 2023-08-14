import React from "react";
import Tour from "./Tour";

const Tours = ({ data }) => {
  return (
    <section>
      <div className="title">
        <h2>Our Tours</h2>
      </div>
      <div className="tours">
        {data.map((d) => {
          return <Tour key={d.id} {...d} />;
        })}
      </div>
    </section>
  );
};

export default React.memo(Tours);
