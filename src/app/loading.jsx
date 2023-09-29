'use client'
import {ThreeCircles} from 'react-loader-spinner'
const LoadingState = () => {
    return ( 
        <div className="flex h-screen justify-center items-center text-green-500">
            <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
            />
            <p className='text-black'> loading please wait...</p>
        </div> 
    );
}
 
export default LoadingState;