import React, { useState } from 'react';

const ToggleSwitch = () => {
    const [checked, setChecked] = useState(false);
  
    const handleChange = () => {
        setChecked(!checked);
    };
  
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative border-2 border-[#ccb681] rounded-full p-1 transition-colors duration-300 ease-in-out hover:border-[#e7cc8d]">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={checked}
                    onChange={handleChange}
                />
                <div className={`toggle__line w-12 h-5 rounded-full shadow-inner ${checked ? 'bg-gray-400': 'bg-[#ccb681]'}`}></div>
                <div
                    className={`toggle__dot absolute w-6 h-6 rounded-full shadow inset-y-0 bg-white ${checked ? 'left-0' : 'right-0'}`}
                ></div>
            </div>
        </label>
    );
}

export default ToggleSwitch;