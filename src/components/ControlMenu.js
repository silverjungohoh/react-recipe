import React from "react";

function ControlMenu({ value, onChange, optionList }) {
  return (
    <select
      className="control-menu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
}

export default React.memo(ControlMenu);
