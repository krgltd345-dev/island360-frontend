"use client";
import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';
import { Button } from '../ui/button';

export const Hero = () => {
  return (
    <div className="relative flex items-center justify-center md:min-h-[80vh] overflow-hidden bg-blue-900/30 text-white">
      <div className="absolute inset-0 bg-[url('/cover1.jpeg')] bg-cover bg-top opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-pink-300/5 to-pink-500/20" />
      <div className='max-w-7xl w-full flex items-start'>
        <div className="relative px-4 sm:px-10 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-amber-300 mb-4">
              <Waves className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">Adventure Awaits</span>
            </div>
            <h1 className="text-4xl sm:text-7xl font-figtree mb-6 leading-tight text-white">
              Island 360
              <span className="block text-amber-300">Bookings</span>
            </h1>
            {/* <Button className={}>
            Explore
          </Button> */}
          </motion.div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
        </svg>
      </div>
    </div>
  )
}
