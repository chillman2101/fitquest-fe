# FitQuest - Solo Leveling Fitness Gamification PWA

A fitness gamification progressive web app (PWA) inspired by the Solo Leveling anime. Transform your fitness journey into an epic adventure with quests, dungeons, and RPG-style progression.

## Project Structure

```
fitness/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/   # Custom Solo Leveling themed components
│   │   ├── App.tsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── backend/           # Go + Gin + PostgreSQL (to be implemented)
```

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom Solo Leveling theme
- **Animations**: Framer Motion
- **State Management**: Zustand (to be implemented)
- **Data Fetching**: React Query
- **Routing**: React Router (to be implemented)

### Backend (Coming Soon)
- **Framework**: Gin (Go)
- **ORM**: GORM
- **Database**: PostgreSQL
- **Authentication**: JWT-go

## Custom Components Created

### 1. StatBar
Dynamic stat bars with animated progress and glow effects.
- HP, Stamina, Mana, XP variants
- Customizable sizes (sm, md, lg)
- Animated fill and shimmer effects

```tsx
<StatBar
  label="Health Points"
  currentValue={850}
  maxValue={1200}
  type="hp"
  size="lg"
/>
```

### 2. RankBadge
Rank badges with Solo Leveling rank system (E, D, C, B, A, S).
- Animated entrance
- Glow effects per rank
- Custom colors for each tier

```tsx
<RankBadge rank="S" size="lg" showLabel animated />
```

### 3. GlowCard
Versatile card component with hover glow effects.
- Multiple variants (default, primary, success, warning, danger)
- Hover animations
- StatCard variant for displaying stats

```tsx
<GlowCard variant="primary" size="lg">
  {children}
</GlowCard>
```

### 4. QuestCard
Quest display cards with progress tracking.
- Daily, weekly, and special quest types
- Progress bars
- Difficulty indicators
- XP and coin rewards
- Time limits

```tsx
<QuestCard
  quest={questData}
  onClick={handleQuestClick}
/>
```

### 5. DungeonCard
Dungeon portal cards with detailed information.
- Solo, party, and guild raid types
- Floor progression tracking
- Status indicators (available, in progress, completed, locked, cooldown)
- Difficulty rating with stars
- Boss indicators
- Recommended level and power

```tsx
<DungeonCard
  dungeon={dungeonData}
  onClick={handleDungeonClick}
/>
```

## Color Palette

### Solo Leveling Theme
- **Neon Blue/Cyan**: Primary accent colors
- **Dark Backgrounds**: #0a0a0a to #2e2e2e
- **Rank Colors**:
  - E-Rank: Gray (#8b8b8b)
  - D-Rank: Green (#4ade80)
  - C-Rank: Blue (#3b82f6)
  - B-Rank: Purple (#a855f7)
  - A-Rank: Orange (#f59e0b)
  - S-Rank: Red (#ef4444)
- **Status Colors**:
  - HP: Red (#ef4444)
  - Stamina: Green (#22c55e)
  - Mana: Blue (#3b82f6)
  - XP: Purple (#a855f7)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

## Features Demo

The current implementation includes a demo showcasing:
- User profile with stats (Level, Rank, HP, Stamina, Mana, XP)
- Animated stat bars
- Sample quests (daily, weekly, special)
- Sample dungeons (solo, party, guild raids)
- Responsive grid layouts
- Hover animations and glow effects

## Next Steps

### Phase 1: Frontend Enhancement
- [ ] Implement React Router for navigation
- [ ] Add authentication pages (login/register)
- [ ] Create user profile page
- [ ] Build quest management system
- [ ] Implement dungeon interface
- [ ] Add state management with Zustand
- [ ] Implement PWA features (service worker, offline support)
- [ ] Add responsive mobile design

### Phase 2: Backend Development
- [ ] Set up Go project with Gin framework
- [ ] Configure PostgreSQL database
- [ ] Implement user authentication (JWT)
- [ ] Create REST API endpoints
- [ ] Build quest system backend
- [ ] Implement dungeon system
- [ ] Add progression system (XP, leveling, stats)
- [ ] Create guild/party system

### Phase 3: Integration & Polish
- [ ] Connect frontend to backend APIs
- [ ] Implement real-time features (WebSocket for party/guild)
- [ ] Add notification system
- [ ] Implement leaderboard
- [ ] Add achievement/badge system
- [ ] Performance optimization
- [ ] Testing (unit, integration, e2e)
- [ ] Deploy to production

## Design Philosophy

The UI follows Solo Leveling's aesthetic:
- Dark, immersive backgrounds
- Neon blue/cyan accent colors
- Glowing effects on interactive elements
- RPG-style stat displays
- Game-like UI with clear visual hierarchy
- Smooth animations and transitions

## Contributing

This is a personal project. Feel free to fork and customize for your own use.

## License

MIT License - feel free to use this project as inspiration for your own fitness gamification app!
