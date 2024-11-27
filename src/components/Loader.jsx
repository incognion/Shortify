import React from 'react'
import { FallingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <FallingLines
                color="#222"
                width="80"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    )
}

export default Loader
