import React from 'react'

const FilterInput = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  options = [],
  className = "" 
}) => {
  if (type === "select") {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-semibold text-secondary-700">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          className="select-field"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-secondary-700">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  )
}

export default FilterInput
