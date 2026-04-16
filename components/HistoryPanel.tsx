import { motion } from 'framer-motion';
import React from 'react';
import { Button } from './ui/button';
import CloseIcon from '@mui/icons-material/Close';
import LocationStore from '@/stores/location-store';

export default function HistoryPanel({
  setIsSidePanelOpen,
  fetchWeatherData,
  unit,
  historyMenuRef,
}: {
  isSidePanelOpen: boolean;
  unit: string;
  historyMenuRef: React.RefObject<HTMLDivElement | null>;
  fetchWeatherData: ({ lat, lon, unit }: { lat: number; lon: number; unit: string }) => void;
  setIsSidePanelOpen: (isSidePanelOpen: boolean) => void;
}) {
  const HistoryItem: { name: string; lat: number; lon: number }[] = localStorage.getItem('history')
    ? JSON.parse(localStorage.getItem('history')!)
    : [];
  const updateLocation = LocationStore((state) => state.updateLocation);

  const handleClick = (item: { lat: number; lon: number; name: string }) => {
    updateLocation(item.lat, item.lon);
    fetchWeatherData({
      lat: item.lat,
      lon: item.lon,
      unit: unit,
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };
  return (
    <>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'linear' }}
        className="fixed z-[51] min-h-screen w-full overflow-hidden backdrop-blur-sm"
      />

      <motion.div
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'linear' }}
        className={`fixed top-0 right-0 z-[54] flex min-h-screen w-3xs flex-col gap-4 border-l border-white/20 bg-black/20 p-5 backdrop-blur-2xl transition-all duration-300 ease-in-out md:w-1/6`}
      >
        <div className="absolute top-3 right-3" ref={historyMenuRef}>
          <Button
            onClick={() => setIsSidePanelOpen(false)}
            variant={'default'}
            className="h-8 w-10 cursor-pointer"
          >
            <CloseIcon className="text-xs" />
          </Button>
        </div>
        <div className="w-full">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-widest">History</h2>
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {HistoryItem.length > 0 ? (
              HistoryItem.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="w-full"
                  onClick={() => handleClick(item)}
                >
                  <h3 className="cursor-pointer rounded-sm px-2 py-2 text-sm transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white">
                    {item?.name}
                  </h3>
                </motion.div>
              ))
            ) : (
              <motion.div variants={itemVariants} className="text-center text-white/50">
                No History Found
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
