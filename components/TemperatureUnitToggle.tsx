'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TemperatureUnitToggleProps {
  unit: 'C' | 'F';
  onUnitChange: (unit: 'C' | 'F') => void;
}

export default function TemperatureUnitToggle({ unit, onUnitChange }: TemperatureUnitToggleProps) {
  const handleChange = (newUnit: 'C' | 'F') => {
    if (unit !== newUnit) {
      onUnitChange(newUnit);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex h-8 overflow-hidden rounded-xl border border-white/10 bg-white/20 backdrop-blur-md dark:bg-black/20"
        title="Change temperature unit"
      >
        <button
          onClick={() => handleChange('C')}
          className={cn(
            'w-10 cursor-pointer text-sm font-medium transition-colors',
            unit === 'C'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-200/20 dark:text-blue-400'
              : 'text-white/80 hover:bg-white/10',
          )}
        >
          °C
        </button>
        <button
          onClick={() => handleChange('F')}
          className={cn(
            'w-10 cursor-pointer text-sm font-medium transition-colors',
            unit === 'F'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-200/20 dark:text-blue-400'
              : 'text-white/80 hover:bg-white/10',
          )}
        >
          °F
        </button>
      </div>
    </motion.div>
  );
}
