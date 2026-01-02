import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import GlowCard from "../components/ui/GlowCard";
import { userService } from "../services";
export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    fitness_goal: "",
    activity_level: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    // Populate form with user data
    if (user) {
      setFormData({
        name: user.name || "",
        age: user.age || 0,
        gender: user.gender || "",
        height: user.height || 0,
        weight: user.weight || 0,
        fitness_goal: user.fitness_goal || "",
        activity_level: user.activity_level || "",
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const numberFields = ["age", "height", "weight"];
    const isNumberField = numberFields.includes(name);

    setFormData((prev) => ({
      ...prev,
      [name]: isNumberField ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("form data", formData);
      // Call API to update profile
      const response = await userService.updateProfile(formData);

      // Update auth store with new user data
      if (response.success && response.data) {
        updateUser(response.data);
        setSuccess("Profile updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setIsEditing(false);
          setSuccess(null);
        }, 3000);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone!",
    );

    if (!confirmed) return;

    try {
      setIsLoading(true);

      // Call API to delete account
      await userService.deleteAccount();

      // Logout and redirect
      logout();
      navigate("/login");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to delete account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatterDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedMonthYearShort = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(date);
    return formattedMonthYearShort;
  };

  return (
    <div className="min-h-screen bg-dark-900 p-4">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-gaming font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">
              HUNTER PROFILE
            </h1>
            <p className="text-gray-400">Manage your hunter information</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-dark-700 border border-dark-500 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors font-gaming"
            >
              BACK
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-300 rounded-lg hover:bg-red-500/30   transition-colors font-gaming"
            >
              LOGOUT
            </button>
          </div>
        </motion.div>
      </div>
      {/* PROFILE INFO CARD */}
      <motion.div
        className="max-w-4xl mx-auto mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlowCard variant="primary">
          <div className="flex items-center gap-6">
            {/* AVATAR */}
            <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-primary-600 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>

            {/* USER INFO */}
            <div className="flex-1">
              <h2 className="text-2xl font-gaming text-white mb-1">
                {user.name}
              </h2>
              <p className="text-gray-400 text-sm mb-2"> {user?.email}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">
                  Member since{" "}
                  <b>{formatterDate(user?.created_at.toString())}</b>
                </span>
              </div>
            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              className={`px-6 py-2 ${isEditing ? "bg-red-500/20 border border-red-500 text-red-300 rounded-lg hover:bg-red-500/30" : " bg-neon-blue/20 border border-neon-blue/50 text-neon-blue rounded-lg hover:bg-neon-blue/30"} transition-colors font-gaming`}
            >
              {isEditing ? "CANCEL EDIT" : "EDIT"}
            </button>
          </div>
        </GlowCard>
      </motion.div>

      {/* FORM EDIT PROFILE */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="max-w-4xl mx-auto mb-6"
        >
          <GlowCard variant="primary" size="lg">
            <h3 className="text-xl font-gaming text-white mb-6 border-b border-dark-600 pb-3">
              EDIT PROFILE
            </h3>

            {/*ERROR / Success Message*/}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 mb-4">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Hunter Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="input-glow"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    value={formData.age || ""}
                    className="input-glow"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Gender Field - Select Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Gender
                  </label>
                  <select
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                    className="input-glow"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Height Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    onChange={handleChange}
                    value={formData.height || ""}
                    className="input-glow"
                    placeholder="Enter your height"
                  />
                </div>

                {/* Weight Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    onChange={handleChange}
                    value={formData.weight || ""}
                    className="input-glow"
                    placeholder="Enter your weight"
                  />
                </div>

                {/* Fitness Goal - Select Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Fitness Goal
                  </label>
                  <select
                    name="fitness_goal"
                    onChange={handleChange}
                    value={formData.fitness_goal}
                    className="input-glow"
                  >
                    <option value="">Select goal</option>
                    <option value="lose_weight">Lose Weight</option>
                    <option value="gain_muscle">Gain Muscle</option>
                    <option value="maintain">Maintain</option>
                    <option value="improve_endurance">Improve Endurance</option>
                  </select>
                </div>

                {/* Activity Level - Select Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-gaming text-gray-300 uppercase">
                    Activity Level
                  </label>
                  <select
                    name="activity_level"
                    onChange={handleChange}
                    value={formData.activity_level}
                    className="input-glow"
                  >
                    <option value="">Select level</option>
                    <option value="sedentary">
                      Sedentary (Little/No exercise)
                    </option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="very_active">
                      Very Active (2x per day)
                    </option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-dark-700 border border-dark-500 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors font-gaming"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 btn-glow disabled:opacity-50 font-gaming"
                >
                  {isLoading ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </GlowCard>
        </motion.div>
      )}

      {/* DANGER ZONE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <GlowCard variant="primary">
          <div className="border-2 border-red-500/30 rounded-lg p-6">
            <h3 className="text-xl font-gaming text-red-400 mb-2 flex items-center gap-2">
              <span>⚠️</span> DANGER ZONE
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Once you delete your account, all your data will be permanently
              lost.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="px-6 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-gaming"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}
