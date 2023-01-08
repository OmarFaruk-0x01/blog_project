
import type { FC } from 'react';
import type {SkeletonProps} from './Skeleton.interface'

const Skeleton: FC<SkeletonProps> = () => {


    return (
       <div>
            <div className="mx-auto  w-full rounded-md">
                <div className="flex h-full animate-pulse flex-row items-start justify-center space-x-5">
                    <div className="flex w-full flex-col space-y-3 ">
                        <div className="h-6 w-14 rounded-md bg-gray-100 "></div>
                        <div className="h-12 w-full rounded-md bg-gray-100 "></div>
                        <div className="h-56 w-full rounded-md bg-gray-100 "></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Skeleton;
