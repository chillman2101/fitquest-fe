import { motion } from 'framer-motion';
import RankBadge, { Rank } from './RankBadge';

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  rank: Rank;
  type: 'solo' | 'party' | 'guild';
  floors: number;
  currentFloor?: number;
  recommendedLevel: number;
  recommendedPower?: number;
  maxPartySize?: number;
  rewards: {
    xp: number;
    coins: number;
    items?: string[];
  };
  cooldown?: string;
  status?: 'available' | 'in_progress' | 'completed' | 'locked' | 'cooldown';
  participants?: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme' | 'nightmare';
  hasBoss?: boolean;
}

interface DungeonCardProps {
  dungeon: Dungeon;
  onClick?: () => void;
}

const typeStyles = {
  solo: {
    border: 'border-neon-blue/40',
    gradient: 'from-neon-blue/20 via-transparent to-transparent',
    icon: '⚔️',
    label: 'SOLO',
    color: 'text-neon-blue',
  },
  party: {
    border: 'border-neon-purple/40',
    gradient: 'from-neon-purple/20 via-transparent to-transparent',
    icon: '👥',
    label: 'PARTY',
    color: 'text-neon-purple',
  },
  guild: {
    border: 'border-rank-S/40',
    gradient: 'from-rank-S/20 via-transparent to-transparent',
    icon: '🏰',
    label: 'GUILD RAID',
    color: 'text-rank-S',
  },
};

const difficultyStars = {
  easy: 1,
  medium: 2,
  hard: 3,
  extreme: 4,
  nightmare: 5,
};

const statusConfig = {
  available: {
    badge: 'bg-rank-D/20 text-rank-D border-rank-D',
    text: 'AVAILABLE',
    clickable: true,
  },
  in_progress: {
    badge: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan',
    text: 'IN PROGRESS',
    clickable: true,
  },
  completed: {
    badge: 'bg-status-xp/20 text-status-xp border-status-xp',
    text: 'COMPLETED',
    clickable: false,
  },
  locked: {
    badge: 'bg-gray-500/20 text-gray-500 border-gray-500',
    text: 'LOCKED',
    clickable: false,
  },
  cooldown: {
    badge: 'bg-rank-A/20 text-rank-A border-rank-A',
    text: 'COOLDOWN',
    clickable: false,
  },
};

export default function DungeonCard({ dungeon, onClick }: DungeonCardProps) {
  const typeStyle = typeStyles[dungeon.type];
  const status = dungeon.status || 'available';
  const statusStyle = statusConfig[status];
  const isClickable = statusStyle.clickable && onClick;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isClickable ? { y: -6, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      onClick={isClickable ? onClick : undefined}
      className={`
        dungeon-card
        border-2 ${typeStyle.border}
        relative overflow-hidden
        ${isClickable ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}
        ${status === 'locked' ? 'grayscale' : ''}
      `}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${typeStyle.gradient} opacity-50`}
      />

      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={isClickable ? { scale: [1, 1.2, 1] } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="text-4xl"
            >
              {typeStyle.icon}
            </motion.div>
            <div>
              <h3 className="text-xl font-gaming font-bold text-white mb-1">
                {dungeon.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-gaming font-semibold ${typeStyle.color}`}>
                  {typeStyle.label}
                </span>
                {dungeon.hasBoss && (
                  <span className="text-xs font-gaming text-rank-S">
                    👑 BOSS
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <RankBadge rank={dungeon.rank} size="sm" />
            <span className={`text-[10px] px-2 py-0.5 rounded border ${statusStyle.badge} font-gaming font-bold`}>
              {statusStyle.text}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {dungeon.description}
        </p>

        {/* Progress (if in progress) */}
        {status === 'in_progress' && dungeon.currentFloor !== undefined && (
          <div className="mb-4 p-3 bg-dark-900/50 rounded-lg border border-neon-cyan/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-gaming text-gray-400">CURRENT FLOOR</span>
              <span className="text-sm font-gaming font-bold text-neon-cyan">
                {dungeon.currentFloor} / {dungeon.floors}
              </span>
            </div>
            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(dungeon.currentFloor / dungeon.floors) * 100}%` }}
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue"
              />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-dark-900/50 p-3 rounded-lg border border-dark-600">
            <p className="text-xs font-gaming text-gray-500 mb-1">FLOORS</p>
            <p className="text-lg font-gaming font-bold text-white">{dungeon.floors}</p>
          </div>
          <div className="bg-dark-900/50 p-3 rounded-lg border border-dark-600">
            <p className="text-xs font-gaming text-gray-500 mb-1">REC. LEVEL</p>
            <p className="text-lg font-gaming font-bold text-neon-blue">
              Lv. {dungeon.recommendedLevel}
            </p>
          </div>
        </div>

        {/* Difficulty Stars */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-gaming text-gray-500">DIFFICULTY:</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < difficultyStars[dungeon.difficulty]
                    ? 'text-rank-A'
                    : 'text-gray-700'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs font-gaming font-bold text-rank-A uppercase ml-1">
            {dungeon.difficulty}
          </span>
        </div>

        {/* Party Info */}
        {dungeon.type !== 'solo' && (
          <div className="flex items-center gap-4 mb-4 text-xs">
            {dungeon.maxPartySize && (
              <div className="flex items-center gap-1 text-gray-400">
                <span>👥</span>
                <span className="font-mono">
                  Max: <span className="text-white font-bold">{dungeon.maxPartySize}</span>
                </span>
              </div>
            )}
            {dungeon.participants !== undefined && (
              <div className="flex items-center gap-1 text-gray-400">
                <span className="font-mono">
                  Current: <span className="text-neon-blue font-bold">{dungeon.participants}</span>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Cooldown Info */}
        {dungeon.cooldown && status === 'cooldown' && (
          <div className="mb-4 p-2 bg-rank-A/10 border border-rank-A/30 rounded-lg">
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-rank-A" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-gaming text-rank-A">Available in: {dungeon.cooldown}</span>
            </div>
          </div>
        )}

        {/* Rewards */}
        <div className="pt-4 border-t border-dark-600">
          <p className="text-xs font-gaming text-gray-500 mb-2">REWARDS</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">✨</span>
              <span className="text-sm font-bold text-status-xp">
                +{dungeon.rewards.xp.toLocaleString()} XP
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">💰</span>
              <span className="text-sm font-bold text-yellow-400">
                {dungeon.rewards.coins.toLocaleString()}
              </span>
            </div>
            {dungeon.rewards.items && dungeon.rewards.items.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-purple-400">🎁</span>
                <span className="text-sm font-bold text-purple-400">
                  +{dungeon.rewards.items.length} Items
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corner Accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${typeStyle.gradient} blur-3xl opacity-30`} />
    </motion.div>
  );
}

// Dungeon List Component
export function DungeonList({ dungeons, onDungeonClick }: {
  dungeons: Dungeon[];
  onDungeonClick?: (dungeon: Dungeon) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {dungeons.map((dungeon) => (
        <DungeonCard
          key={dungeon.id}
          dungeon={dungeon}
          onClick={() => onDungeonClick?.(dungeon)}
        />
      ))}
    </div>
  );
}
