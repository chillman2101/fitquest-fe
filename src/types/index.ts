export interface User {
  id: number;
  email: string;
  name: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  fitness_goal?: string;
  activity_level?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface UpdateProfileData {
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  fitness_goal?: string;
  activity_level?: string;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  category: string;
  muscle_group: string;
  difficulty: string;
  sets: number;
  reps: number;
  duration: number;
  rest_time: number;
  calories_burn: number;
}

export interface WorkoutPlan {
  id: number;
  user_id: number;
  name: string;
  description: string;
  days_per_week: number;
  duration: number;
  exercises?: Exercise[];
  created_at: string;
  updated_at: string;
}

export interface WorkoutLog {
  id: number;
  user_id: number;
  exercise_id: number;
  workout_date: string;
  sets_completed: number;
  reps_completed: number;
  duration: number;
  calories_burned: number;
  notes: string;
  exercise?: Exercise;
  created_at: string;
  updated_at: string;
}
