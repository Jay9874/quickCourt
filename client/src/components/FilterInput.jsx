import React from 'react'

const FilterInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  options = [],
  className = ''
}) => {
  if (type === 'select') {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className='block text-sm font-semibold text-secondary-700'>
          {label}
        </label>
        <select name={name} value={value} onChange={onChange} className=''>
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
      <label className='block text-sm font-semibold text-secondary-700'>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className='border border-gray-400 px-2 py-1 rounded-md outline-none'
      />
    </div>
  )
}

export default FilterInput
