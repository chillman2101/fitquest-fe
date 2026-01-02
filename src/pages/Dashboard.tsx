import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores/authStore";
import GlowCard from "../components/ui/GlowCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-gaming font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan mb-2">
              FITQUEST DASHBOARD
            </h1>
            <p className="text-gray-400">
              Welcome back, <span className="text-neon-blue">{user.name}</span>!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-gaming"
          >
            LOGOUT
          </button>
        </motion.div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlowCard variant="primary" onClick={() => navigate("/profile")}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-dark-600 pb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-primary-600 rounded-lg flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-xl font-gaming text-white">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Age:</span>
                    <span className="text-white">{user.age || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gender:</span>
                    <span className="text-white capitalize">
                      {user.gender || "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Height:</span>
                    <span className="text-white">
                      {user.height ? `${user.height} cm` : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-white">
                      {user.weight ? `${user.weight} kg` : "Not set"}
                    </span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlowCard variant="success">
              <div className="space-y-3">
                <h3 className="text-lg font-gaming text-white border-b border-dark-600 pb-2">
                  FITNESS GOAL
                </h3>
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">🎯</p>
                  <p className="text-neon-cyan font-gaming uppercase">
                    {user.fitness_goal?.replace("_", " ") || "Not set"}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlowCard variant="warning">
              <div className="space-y-3">
                <h3 className="text-lg font-gaming text-white border-b border-dark-600 pb-2">
                  ACTIVITY LEVEL
                </h3>
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">⚡</p>
                  <p className="text-yellow-400 font-gaming uppercase">
                    {user.activity_level?.replace("_", " ") || "Not set"}
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <GlowCard variant="primary" size="lg">
            <div className="text-center py-12">
              <p className="text-5xl mb-4">🚧</p>
              <h2 className="text-2xl font-gaming text-white mb-2">
                SYSTEM UNDER CONSTRUCTION
              </h2>
              <p className="text-gray-400">
                More features coming soon! Workouts, exercises, and progress
                tracking.
              </p>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
}
