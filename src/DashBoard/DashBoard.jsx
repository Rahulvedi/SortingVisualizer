import React, { useState, useEffect } from 'react'
import './DashBoard.css'
import { Form, Button } from 'react-bootstrap'
import Visualizer from '../Visualizer/Visualizer'
import { getMergeSortAnimations, getBubbleSortAnimation, getSelectionSortAnimation } from '../SortingAlgorithums'
const DashBoard = () => {
    var options = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort']
    const [Method, setMethod] = useState('Bubble Sort')
    const [SizeOfArray, setSizeOfArray] = useState(50)
    const [SpeedOfSorting, setSpeedOfSorting] = useState(10)
    // const [IsSorting, setIsSorting] = useState(false)
    const [Array, setArray] = useState([]);
    // const [Max, setMax] = useState(100);
    const ResetArray = () => {
        const array = [];
        for (let i = 0; i <= SizeOfArray; i++) {
            array.push(randomIntFromInterval(10, 100));
        }
        setArray(array);
    }
    useEffect(() => {
        ResetArray();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleMethodChange = (e) => {
        setMethod(e.target.value)
    }
    const OnSizeChange = (e) => {
        setSizeOfArray(e.target.value)
        ResetArray();
    }
    const OnSpeedChange = (e) => {
        setSpeedOfSorting(e.target.value)
    }
    const StartSorting = () => {
        switch (Method) {
            case 'Merge Sort':
                mergeSort()
                break
            case 'Bubble Sort':
                bubbleSort()
                break
            case 'Selection Sort':
                selectionsort()
                break
            default:
                bubbleSort();
        }
    }
    const mergeSort = () => {
        const animations = getMergeSortAnimations(Array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'white';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SpeedOfSorting);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight * 5}px`;
                }, i * SpeedOfSorting);
            }
        }
    }
    const bubbleSort = () => {
        const animations = getBubbleSortAnimation(Array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? 'red' : 'white';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SpeedOfSorting);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight * 5}px`;
                }, i * SpeedOfSorting);
            }
        }
    }
    const selectionsort = () => {
        const animations = getSelectionSortAnimation(Array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 2===0;
            if (isColorChange) {
                const [barOneIdx] = animations[i];
                const [barTwoIdx] = animations[i + 1];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';
                }, i * SpeedOfSorting*10);
            } else {
                const [barOneIdx, barOneHeight] = animations[i - 1];
                const [barTwoIdx, barTwoHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'white';
                    barTwoStyle.backgroundColor = 'white';
                    barOneStyle.height = `${barOneHeight * 5}px`;
                    barTwoStyle.height = `${barTwoHeight * 5}px`;
                }, i * SpeedOfSorting*10);
            }
        }
    }
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return (
        <div className='dashboard'>
            {/* <FormSection/> */}
            <div className='form-section'>
                <h1 style={{
                    'color':'white',
                    'fontFamily':'cursive'
                }}>Sorting Visualizer</h1>
                <Form className='d-flex flex-column justify-content-center'>
                    <Form.Group className='p-3'>
                        <Form.Label className='label'>Sorting Methods</Form.Label>
                        <Form.Select type='text' list="SortingMethods" onChange={handleMethodChange}>
                            {options.map(
                                (opt, i) => <option key={i}>{opt}</option>
                            )}
                        </Form.Select>
                    </Form.Group >
                    <Form.Group className='p-3'>
                        <Form.Label className='label' >Size of Array</Form.Label>
                        <Form.Range min='20' max='80' onChange={OnSizeChange} />
                    </Form.Group>
                    <Form.Group className='p-3'>
                        <Form.Label className='label'>Speed of Sorting</Form.Label>
                        <Form.Range min='10' max='50' onChange={OnSpeedChange} />
                    </Form.Group>
                    <Form.Group className='p-2'>
                        <Button className='mb-4 btn' onClick={ResetArray}>Genrate New Array</Button>
                        <Button className='mb-4 btn' onClick={StartSorting}>START SORTING</Button>
                    </Form.Group>
                </Form>
            </div>
            <Visualizer SizeOfArray={SizeOfArray} Array={Array} />
        </div>
    )
}

export default DashBoard
