'use client'

import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    }>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
