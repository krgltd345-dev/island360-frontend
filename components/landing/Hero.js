"use client";
import { motion } from 'framer-motion';
import { Waves } from 'lucide-react';

export const Hero = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-pink-300/5 to-pink-500/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Island 360
              <span className="block text-amber-300">Bookings</span>
            </h1>
            <p className="text-lg text-blue-50 mb-8 max-w-xl">
              From thrilling boat charters to scenic scooter rides, discover and book your next adventure with ease.
            </p>
          </motion.div>
        </div>

        {/* Wave decoration */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

    </>
  )
}
