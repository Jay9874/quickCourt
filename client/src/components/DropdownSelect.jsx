import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const DropdownSelect = ({
  label,
  value,
  placeholder,
  options,
  onSelect,
  type = 'list', // 'list' or 'calendar'
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const renderOptions = () => {
    if (type === 'calendar') {
      return renderCalendar();
    }
    return renderList();
  };

  const renderList = () => {
    return (
      <div className="dropdown-options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`dropdown-option ${
              selectedValue === option ? 'selected' : ''
            } ${option.disabled ? 'disabled' : ''}`}
            onClick={() => !option.disabled && handleSelect(option)}
          >
            {option.label || option}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendar = () => {
    // For calendar type, we'll render a simple calendar grid
    const days = options || [];
    return (
      <div className="dropdown-calendar">
        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <span key={day} className="weekday">{day}</span>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((day, index) => (
            <button
              key={index}
              className={`calendar-day ${!day ? 'empty' : ''} ${
                day?.isPast ? 'disabled' : ''
              } ${day?.isSelected ? 'selected' : ''}`}
              onClick={() => {
                if (day && !day.isPast) {
                  handleSelect(day);
                }
              }}
              disabled={!day || day.isPast}
            >
              {day?.day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`dropdown-select ${className}`} ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>
      <div
        className={`dropdown-trigger ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={toggleDropdown}
      >
        <span className="dropdown-value">
          {selectedValue ? (selectedValue.label || selectedValue) : placeholder}
        </span>
        <FaChevronDown className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          {renderOptions()}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
