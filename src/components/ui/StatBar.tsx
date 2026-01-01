import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatBarProps {
  label: string;
  currentValue: number;
  maxValue: number;
  type?: 'hp' | 'stamina' | 'mana' | 'xp';
  showValues?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const typeColors = {
  hp: {
    bg: 'bg-status-hp/20',
    fill: 'bg-gradient-to-r from-status-hp to-red-600',
    text: 'text-status-hp',
    glow: 'shadow-glow-red',
  },
  stamina: {
    bg: 'bg-status-stamina/20',
    fill: 'bg-gradient-to-r from-status-stamina to-green-600',
    text: 'text-status-stamina',
    glow: 'shadow-glow',
  },
  mana: {
    bg: 'bg-status-mana/20',
    fill: 'bg-gradient-to-r from-status-mana to-blue-600',
    text: 'text-status-mana',
    glow: 'shadow-glow',
  },
  xp: {
    bg: 'bg-status-xp/20',
    fill: 'bg-gradient-to-r from-status-xp to-purple-600',
    text: 'text-status-xp',
    glow: 'shadow-glow-purple',
  },
};

const sizeClasses = {
  sm: 'h-3',
  md: 'h-6',
  lg: 'h-8',
};

export default function StatBar({
  label,
  currentValue,
  maxValue,
  type = 'hp',
  showValues = true,
  size = 'md',
  animated = true,
}: StatBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((currentValue / maxValue) * 100, 100);
  const colors = typeColors[type];

  useEffect(() => {
    if (animated) {
      const duration = 1000;
      const steps = 60;
      const increment = currentValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= currentValue) {
          setDisplayValue(currentValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(currentValue);
    }
  }, [currentValue, animated]);

  return (
    <div className="w-full space-y-2">
      {/* Label and Values */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-gaming text-gray-300 uppercase tracking-wider">
          {label}
        </span>
        {showValues && (
          <span className={`text-sm font-mono font-semibold ${colors.text}`}>
            {displayValue} / {maxValue}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-dark-700 rounded-full overflow-hidden border border-dark-500`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 1 : 0,
            ease: 'easeOut',
          }}
          className={`${sizeClasses[size]} ${colors.fill} rounded-full relative overflow-hidden ${colors.glow}`}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Percentage Text (for larger bars) */}
        {size === 'lg' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
