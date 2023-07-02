import React from "react";

function TasteItem({ tasteItem, onClick, isSelected }) {
  return (
    <div
      className={`taste-item ${isSelected ? "select" : ""}`}
      onClick={() => onClick(tasteItem.tasteId)}
    >
      <img src={tasteItem.tasteImg} alt={`taste-img-${tasteItem.tasteId}`} />
      <span>{tasteItem.tasteDesc}</span>
    </div>
  );
}

export default React.memo(TasteItem);
