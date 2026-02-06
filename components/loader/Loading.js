import React from 'react'
import { Spinner } from '../ui/spinner'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className='flex flex-col items-center gap-5'>
        <img src={"/island_logo.png"} alt="Logo" className="w-52 h-40" />
        <Spinner className={"size-10"} />
      </div>
    </div>
  )
}

export default LoadingScreen