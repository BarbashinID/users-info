import React from 'react';

const MySelect = ({options, defaultValue, value, onChange, dv}) => {
    
    return (
    <div className='sel'>
    <label>{defaultValue}: </label>
    <select
        value={value}
        onChange={e => onChange([e.target.value, defaultValue, dv]) }
    >
       <option disabled value="">{defaultValue}</option>
       {options.map(option =>
        <option key ={option.index} value={option.value}>
            {option.name}
        </option>)}
     </select>
     </div>
      );
}

export default MySelect;