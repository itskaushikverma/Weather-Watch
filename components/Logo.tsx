'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  timeOfDay?: 'morning' | 'evening' | 'night';
  circle?: boolean;
}

export default function Logo({
  size = 'md',
  animated = true,
  timeOfDay,
  circle = true,
}: LogoProps) {
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<'morning' | 'evening' | 'night'>(
    timeOfDay || 'morning',
  );

  const dimensions = {
    xs: { width: 30, height: 30 },
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 },
    xl: { width: 120, height: 120 },
  };

  useEffect(() => {
    if (timeOfDay) {
      setCurrentTimeOfDay(timeOfDay);
      return;
    }
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 16) {
      setCurrentTimeOfDay('morning');
    } else if (hour >= 16 && hour < 19) {
      setCurrentTimeOfDay('evening');
    } else {
      setCurrentTimeOfDay('night');
    }
  }, [timeOfDay]);

  const colorSchemes = {
    morning: {
      primary: '#60a5fa',
      secondary: '#93c5fd',
      accent: '#3b82f6',
      glow: '#2563eb',
    },
    evening: {
      primary: '#c084fc',
      secondary: '#a855f7',
      accent: '#8b5cf6',
      glow: '#7c3aed',
    },
    night: {
      primary: '#2dd4bf',
      secondary: '#14b8a6',
      accent: '#0d9488',
      glow: '#0f766e',
    },
  };

  const colors = colorSchemes[currentTimeOfDay];

  return (
    <div
      className="relative"
      style={{ width: dimensions[size].width, height: dimensions[size].height }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(0,0,0,0) 30%, ${colors.primary}40 100%)`,
            boxShadow: `0 0 20px ${colors.glow}80`,
          }}
          animate={animated ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute"
          style={{
            width: '90%',
            height: '90%',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            border: `2px solid ${colors.primary}`,
            boxShadow: `0 0 10px ${colors.glow}`,
          }}
          animate={
            animated
              ? {
                  rotate: 360,
                  borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '50% 50% 50% 50%',
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                  ],
                }
              : {}
          }
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute"
          style={{
            width: '70%',
            height: '70%',
            borderRadius: '50% 50% 50% 50% / 60% 40% 60% 40%',
            border: `2px solid ${colors.secondary}`,
            boxShadow: `0 0 10px ${colors.glow}`,
          }}
          animate={
            animated
              ? {
                  rotate: -360,
                  borderRadius: [
                    '50% 50% 50% 50% / 60% 40% 60% 40%',
                    '40% 60% 40% 60% / 50% 50% 50% 50%',
                    '50% 50% 50% 50% / 60% 40% 60% 40%',
                  ],
                }
              : {}
          }
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            width: '50%',
            height: '50%',
            background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.accent} 100%)`,
            borderRadius: '50%',
            boxShadow: `0 0 15px ${colors.glow}`,
          }}
          animate={animated ? { scale: [1, 1.1, 1] } : {}}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '60%', height: '60%', color: '#fff' }}
          >
            {currentTimeOfDay === 'morning' ? (
              <>
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </>
            ) : currentTimeOfDay === 'evening' ? (
              <>
                <path d="M17 18a5 5 0 0 0-10 0"></path>
                <line x1="12" y1="9" x2="12" y2="2"></line>
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
                <line x1="1" y1="18" x2="3" y2="18"></line>
                <line x1="21" y1="18" x2="23" y2="18"></line>
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
                <line x1="23" y1="22" x2="1" y2="22"></line>
                <polyline points="8 6 12 2 16 6"></polyline>
              </>
            ) : (
              <>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                <circle cx="7" cy="10" r="1" fill="#fff"></circle>
                <circle cx="15" cy="8" r="1" fill="#fff"></circle>
              </>
            )}
          </svg>
        </motion.div>

        {circle && (
          <motion.div
            className="absolute h-3 w-3 rounded-full"
            style={{
              background: colors.secondary,
              boxShadow: `0 0 10px ${colors.glow}`,
            }}
            animate={
              animated
                ? {
                    x: Math.cos(Math.PI / 4) * dimensions[size].width * 0.4,
                    y: Math.sin(Math.PI / 4) * dimensions[size].height * 0.4,
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
    </div>
  );
}
