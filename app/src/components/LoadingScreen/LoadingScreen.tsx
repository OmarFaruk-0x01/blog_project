
import type { FC } from 'react';
import type { LoadingScreenProps } from './LoadingScreen.interface'

const LoadingScreen: FC<LoadingScreenProps> = () => {


    return (
        <div className='flex items-center justify-center fixed inset-0 bg-white'>
            <img src='/umed.png' className='object-contain w-[80px] animate-pulse' />
        </div>
    );
}


export default LoadingScreen;
