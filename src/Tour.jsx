import { useState } from "react";
// import custom hook
import { useAppContext } from "./App";

const Tour = ({ id, image, info, name, price }) => {
  // state
  const [showFullInfo, setShowFullInfo] = useState(false);

  // use custom hook
  const { deleteHandler } = useAppContext();

  // string.slice()
  const slicedInfo = info.slice(0, 150);
  console.log(slicedInfo);

  return (
    <article className="single-tour">
      <img src={image} alt={name} className="img" />
      <span className="tour-price">{price}</span>
      <div className="tour-info">
        <h5>{name}</h5>
        {/* ternary operator */}
        {/* button 是 inline-block，可以直接放到 block 元素裡面 */}
        {showFullInfo ? (
          <p>
            {info + " "}
            <button
              type="button"
              className="info-btn"
              onClick={() => setShowFullInfo(!showFullInfo)}
            >
              show less
            </button>
          </p>
        ) : (
          <p>
            {slicedInfo + "... "}
            <button
              type="button"
              className="info-btn"
              onClick={() => setShowFullInfo(!showFullInfo)}
            >
              read more
            </button>
          </p>
        )}
        <button
          type="button"
          className="btn delete-btn btn-block"
          onClick={() => {
            deleteHandler(id);
          }}
        >
          not interested
        </button>
      </div>
    </article>
  );
};

export default Tour;
