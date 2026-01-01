import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: {
    border: 'border-dark-600 hover:border-neon-blue/50',
    glow: 'hover:shadow-glow',
    gradient: 'from-neon-blue/10',
  },
  primary: {
    border: 'border-primary-600/50 hover:border-primary-500',
    glow: 'hover:shadow-[0_0_20px_rgba(24,144,255,0.5)]',
    gradient: 'from-primary-500/10',
  },
  success: {
    border: 'border-rank-D/50 hover:border-rank-D',
    glow: 'hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]',
    gradient: 'from-rank-D/10',
  },
  warning: {
    border: 'border-rank-A/50 hover:border-rank-A',
    glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    gradient: 'from-rank-A/10',
  },
  danger: {
    border: 'border-rank-S/50 hover:border-rank-S',
    glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
    gradient: 'from-rank-S/10',
  },
};

const sizeClasses = {
  sm: 'p-3 rounded-lg',
  md: 'p-6 rounded-xl',
  lg: 'p-8 rounded-2xl',
};

export default function GlowCard({
  children,
  variant = 'default',
  size = 'md',
  hoverable = true,
  animated = true,
  className = '',
  onClick,
}: GlowCardProps) {
  const styles = variantStyles[variant];

  const cardContent = (
    <div
      className={`
        relative bg-dark-800
        ${sizeClasses[size]}
        border
        ${styles.border}
        ${hoverable ? `${styles.glow} cursor-pointer` : ''}
        transition-all duration-300
        ${className}
      `}
      onClick={onClick}
    >
      {/* Background Gradient on Hover */}
      <div
        className={`
          absolute inset-0 rounded-xl opacity-0
          ${hoverable ? 'group-hover:opacity-100' : ''}
          bg-gradient-to-br ${styles.gradient} to-transparent
          transition-opacity duration-300
        `}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom Glow Effect */}
      {hoverable && (
        <div
          className={`
            absolute -bottom-2 left-1/2 -translate-x-1/2
            w-3/4 h-1 blur-xl opacity-0
            ${hoverable ? 'group-hover:opacity-50' : ''}
            bg-gradient-to-r ${styles.gradient} to-transparent
            transition-opacity duration-300
          `}
        />
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={hoverable ? { y: -4 } : {}}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="group"
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className="group">{cardContent}</div>;
}

// Specialized Card Variants
export function StatCard({
  icon,
  label,
  value,
  subValue,
  variant = 'default',
}: {
  icon?: ReactNode;
  label: string;
  value: string | number;
  subValue?: string | number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}) {
  return (
    <GlowCard variant={variant} size="sm">
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div className="flex-1">
          <p className="text-xs font-gaming text-gray-400 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-gaming font-bold text-white">{value}</p>
          {subValue && (
            <p className="text-xs text-gray-500 font-mono">{subValue}</p>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
