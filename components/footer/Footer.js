import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-8 mt-auto relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-600">
                <img src={"/island_logo.png"} alt="Logo" className="w-8 h-6" />
                <span className="font-semibold">Island 360</span>
              </div>
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} Island 360. All rights reserved.
              </p>
            </div>
        </div>
      </footer>
  )
}

export default Footer