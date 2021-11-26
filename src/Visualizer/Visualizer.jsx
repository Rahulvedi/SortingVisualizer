import React from 'react'
import './Visualizer.css'
const Visualizer = ({SizeOfArray,Array}) => {
    return (
        <div className='visualizer'>
            <div className="array-box">
            {Array.map((value,index)=>(
                <div className='array-bar'key={index} style={{'height':`${value*5}px`}}></div>
            ))}
            </div>
        </div>
    )
}

export default Visualizer
