import React from 'react';

const Bgimage = ({ backgroundImage, children }) => {
    return (
        <div className="flex flex-col items-center overflow-hidden relative min-h-screen justify-center font-bold">
            <div
                className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black"
                style={{ backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-black opacity-40" />
            <div className="flex flex-col items-center w-full max-w-md p-6 bg-opacity-80 bg-gray-900 rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default Bgimage;