import React from "react";

function SelectMenu({ id, name, label, error, options,defaultOption, value, onChange }) {
  return (
    <div className="input-container">
      <label htmlFor={id}> {label} </label>

      <select 
      id={id} 
      name={name} 
      value={value} 
      onChange={onChange}>
        
        {/* If deafultOption is provided then only it will show
        default option o/w first option will be shown */}
        {
          defaultOption && 
          (<option value="" hidden> {defaultOption} </option>)
        }

        {options.map( (indiOption, ind) => (
          <option key={ind} value={indiOption}> {indiOption} </option>
        ))}
      </select>

      <p className="error">{error}</p>
    </div>
  );
}

export default SelectMenu;
