import React, { useState } from 'react';

const ToggleSwitch = () => {
    const [checked, setChecked] = useState(false);
  
    const handleChange = () => {
      setChecked(!checked);
    };
  
    return (
        <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={handleChange}
          />
          <div className="toggle__line w-12 h-5 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`toggle__dot absolute w-6 h-5 bg-white rounded-full shadow inset-y-0 ${checked ? 'left-0 bg-[#ccb681]' : 'right-0'}`}
          ></div>
        </div>
      </label>
    );
}

export default ToggleSwitch;