'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Logo from './Logo';
import WeatherStore from '@/stores/weather-store';
import { WeatherStoreType } from '@/lib/types';

export default function PreLoader() {
  const store: WeatherStoreType = WeatherStore();
  const { isLoading } = store;
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  const timeOfDay = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 16) return 'morning';
    if (hour >= 16 && hour < 19) return 'evening';
    return 'night';
  }, []);

  const colorSchemes = useMemo(
    () => ({
      morning: {
        primary: '#FF6B6B',
        secondary: '#FFD166',
        accent: '#4ECDC4',
        glow: '#FF9E7D',
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
        particles: ['#FF6B6B', '#FFD166', '#4ECDC4', '#FF9E7D', '#FFA8A8'],
      },
      evening: {
        primary: '#845EC2',
        secondary: '#FF9671',
        accent: '#F9F871',
        glow: '#D65DB1',
        gradient: 'linear-gradient(135deg, #845EC2 0%, #D65DB1 50%, #FF9671 100%)',
        particles: ['#845EC2', '#FF9671', '#F9F871', '#D65DB1', '#B39CD0'],
      },
      night: {
        primary: '#00B8A9',
        secondary: '#5F7FFF',
        accent: '#7D5FFF',
        glow: '#0F3460',
        gradient: 'linear-gradient(135deg, #0F3460 0%, #5F7FFF 50%, #00B8A9 100%)',
        particles: ['#00B8A9', '#5F7FFF', '#7D5FFF', '#0F3460', '#00F5E9'],
      },
    }),
    [],
  );

  const colors = colorSchemes[timeOfDay];

  useEffect(() => {
    if (isLoading) {
      if (typeof window !== 'undefined') {
        setWindowHeight(window.innerHeight);
      }

      const showContentTimer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      return () => {
        clearTimeout(showContentTimer);
      };
    } else {
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  const orbitalElements = [
    { size: '80vw', color: colors.primary, duration: 60, scale: [1, 1.05, 1] },
    { size: '60vw', color: colors.primary, duration: 60, scale: [1, 1.05, 1] },
    { size: '40vw', color: colors.secondary, duration: 45, reverse: true },
    { size: '20vw', color: colors.accent, duration: 30 },
  ];

  const gradientLines = Array(5).fill(null);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -windowHeight,
            transition: { duration: 1, ease: [1, 1, 1, 1] },
          }}
        >
          {/* Background with dynamic gradient */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(45deg, #000000, #121212)` }}
            animate={{
              background: [
                `linear-gradient(45deg, #000000, #121212)`,
                `linear-gradient(45deg, #0a0a0a, #1a1a1a)`,
                `linear-gradient(45deg, #000000, #121212)`,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Color overlay */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: colors.gradient,
                filter: 'blur(100px)',
              }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(${colors.primary}20 1px, transparent 1px), 
                                 linear-gradient(90deg, ${colors.primary}20 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </motion.div>

          {/* Orbital rings and dynamic elements */}
          <div className="absolute inset-0 overflow-hidden">
            {orbitalElements.map((orbit, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute rounded-full opacity-10"
                style={{
                  width: orbit.size,
                  height: orbit.size,
                  border: `1px solid ${orbit.color}`,
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  rotate: orbit.reverse ? -360 : 360,
                  scale: orbit.scale,
                }}
                transition={{
                  rotate: {
                    duration: orbit.duration,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: orbit.scale
                    ? {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : undefined,
                }}
              />
            ))}

            {/* Dynamic gradient lines */}
            {gradientLines.map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute opacity-10"
                style={{
                  height: '1px',
                  width: '100vw',
                  background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
                  top: `${20 * i}%`,
                  transform: `rotate(${30 * i}deg)`,
                  transformOrigin: 'center',
                }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  top: [`${20 * i}%`, `${20 * i + 5}%`, `${20 * i}%`],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Glowing orbs */}
          <motion.div
            className="absolute rounded-full blur-[100px]"
            style={{
              width: '30vw',
              height: '30vw',
              background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute rounded-full blur-[100px]"
            style={{
              width: '30vw',
              height: '30vw',
              background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
              bottom: '20%',
              right: '20%',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Logo size="xl" timeOfDay={timeOfDay} />
          </motion.div>

          {/* Content text */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                className="absolute bottom-28 z-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h1 className="mb-2 text-5xl font-bold tracking-tight">
                  <span
                    style={{
                      background: colors.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: `0 2px 10px ${colors.glow}80`,
                    }}
                  >
                    Weather
                  </span>
                  <span className="font-light text-white">Watch</span>
                </h1>
                <p className="text-lg text-gray-300">Your personal weather companion</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
