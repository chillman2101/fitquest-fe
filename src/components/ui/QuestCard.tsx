import { motion } from 'framer-motion';
import RankBadge, { Rank } from './RankBadge';

export interface Quest {
  id: string;
  title: string;
  description: string;
  rank: Rank;
  xpReward: number;
  coinReward?: number;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  progress?: number;
  total?: number;
  timeLimit?: string;
  isCompleted?: boolean;
}

interface QuestCardProps {
  quest: Quest;
  onClick?: () => void;
  showProgress?: boolean;
}

const typeStyles = {
  daily: {
    border: 'border-neon-cyan/30',
    badge: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan',
    icon: '🌅',
  },
  weekly: {
    border: 'border-neon-purple/30',
    badge: 'bg-neon-purple/10 text-neon-purple border-neon-purple',
    icon: '🗓️',
  },
  special: {
    border: 'border-rank-S/30',
    badge: 'bg-rank-S/10 text-rank-S border-rank-S',
    icon: '⭐',
  },
};

const difficultyColors = {
  easy: 'text-rank-D',
  medium: 'text-rank-C',
  hard: 'text-rank-A',
  extreme: 'text-rank-S',
};

export default function QuestCard({ quest, onClick, showProgress = true }: QuestCardProps) {
  const typeStyle = typeStyles[quest.type];
  const progressPercentage = quest.progress && quest.total
    ? (quest.progress / quest.total) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        relative quest-card group
        border-2 ${typeStyle.border}
        ${quest.isCompleted ? 'opacity-60' : ''}
      `}
    >
      {/* Completed Overlay */}
      {quest.isCompleted && (
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-6xl mb-2"
            >
              ✓
            </motion.div>
            <p className="text-neon-blue font-gaming font-bold text-xl">
              QUEST COMPLETED
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeStyle.icon}</span>
          <div>
            <h3 className="text-lg font-gaming font-bold text-white group-hover:text-neon-blue transition-colors">
              {quest.title}
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)} Quest
            </p>
          </div>
        </div>
        <RankBadge rank={quest.rank} size="sm" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
        {quest.description}
      </p>

      {/* Progress Bar */}
      {showProgress && quest.progress !== undefined && quest.total !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-gaming text-gray-400">PROGRESS</span>
            <span className="text-xs font-mono text-neon-blue">
              {quest.progress} / {quest.total}
            </span>
          </div>
          <div className="relative w-full h-2 bg-dark-700 rounded-full overflow-hidden border border-dark-500">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-neon-blue to-primary-600 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-dark-600">
        {/* Difficulty & Time Limit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xs font-gaming text-gray-500">DIFFICULTY:</span>
            <span className={`text-xs font-gaming font-bold uppercase ${difficultyColors[quest.difficulty]}`}>
              {quest.difficulty}
            </span>
          </div>
          {quest.timeLimit && (
            <div className="flex items-center gap-1 text-gray-400">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-mono">{quest.timeLimit}</span>
            </div>
          )}
        </div>

        {/* Rewards */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">✨</span>
            <span className="text-xs font-bold text-status-xp">
              +{quest.xpReward} XP
            </span>
          </div>
          {quest.coinReward && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">💰</span>
              <span className="text-xs font-bold text-yellow-400">
                {quest.coinReward}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${
            quest.type === 'daily'
              ? 'rgba(0, 255, 255, 0.05)'
              : quest.type === 'weekly'
              ? 'rgba(177, 156, 217, 0.05)'
              : 'rgba(239, 68, 68, 0.05)'
          }, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

// Quest List Component
export function QuestList({ quests, onQuestClick }: {
  quests: Quest[];
  onQuestClick?: (quest: Quest) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onClick={() => onQuestClick?.(quest)}
        />
      ))}
    </div>
  );
}
