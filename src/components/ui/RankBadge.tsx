import { motion } from 'framer-motion';

export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

interface RankBadgeProps {
  rank: Rank;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
}

const rankConfig = {
  E: {
    color: 'text-rank-E',
    borderColor: 'border-rank-E',
    bgColor: 'bg-rank-E/10',
    shadowColor: 'shadow-[0_0_20px_rgba(139,139,139,0.5)]',
    label: 'E-Rank',
  },
  D: {
    color: 'text-rank-D',
    borderColor: 'border-rank-D',
    bgColor: 'bg-rank-D/10',
    shadowColor: 'shadow-[0_0_20px_rgba(74,222,128,0.5)]',
    label: 'D-Rank',
  },
  C: {
    color: 'text-rank-C',
    borderColor: 'border-rank-C',
    bgColor: 'bg-rank-C/10',
    shadowColor: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
    label: 'C-Rank',
  },
  B: {
    color: 'text-rank-B',
    borderColor: 'border-rank-B',
    bgColor: 'bg-rank-B/10',
    shadowColor: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
    label: 'B-Rank',
  },
  A: {
    color: 'text-rank-A',
    borderColor: 'border-rank-A',
    bgColor: 'bg-rank-A/10',
    shadowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    label: 'A-Rank',
  },
  S: {
    color: 'text-rank-S',
    borderColor: 'border-rank-S',
    bgColor: 'bg-rank-S/10',
    shadowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    label: 'S-Rank',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-6 py-2.5 text-lg',
};

export default function RankBadge({
  rank,
  size = 'md',
  showLabel = false,
  animated = true,
  glowEffect = true,
}: RankBadgeProps) {
  const config = rankConfig[rank];

  return (
    <motion.div
      initial={animated ? { scale: 0, rotate: -180 } : {}}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      whileHover={animated ? { scale: 1.05 } : {}}
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        rounded-md
        font-gaming font-bold tracking-wider
        border-2
        ${config.color}
        ${config.borderColor}
        ${config.bgColor}
        ${glowEffect ? config.shadowColor : ''}
        transition-all duration-300
        relative overflow-hidden
      `}
    >
      {/* Background Pulse Effect */}
      {glowEffect && (
        <motion.div
          className={`absolute inset-0 ${config.bgColor}`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10">
        {showLabel ? config.label : rank}
      </span>

      {/* Shine Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
}

// Optional: Export rank utility function
export function getRankFromLevel(level: number): Rank {
  if (level < 10) return 'E';
  if (level < 25) return 'D';
  if (level < 50) return 'C';
  if (level < 75) return 'B';
  if (level < 100) return 'A';
  return 'S';
}
