"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Counter } from '@/components/ui/Counter';
import { stats } from '@/utils/data-dummy';



export default function ParallaxDesign() {
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const y1 = useTransform(smoothScroll, [0, 1], [0, -200]);
  const opacity = useTransform(smoothScroll, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/banner.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.countKey}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group"
            >
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                             hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-center mb-6">
                  <stat.icon className="w-8 h-8 text-white opacity-75" />
                </div>
                <div className="text-center space-y-2">
                  <Counter 
                    target={stat.value}
                    suffix={stat.suffix}
                    isRating={stat.countKey === 'rating'}
                  />
                  <p className="text-white font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}