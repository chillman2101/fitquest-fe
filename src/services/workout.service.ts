import api from '../lib/api';
import type { ApiResponse, Exercise, WorkoutPlan, WorkoutLog } from '../types';

export const workoutService = {
  // Exercises
  async getExercises(params?: {
    category?: string;
    muscle_group?: string;
  }): Promise<ApiResponse<Exercise[]>> {
    const response = await api.get<ApiResponse<Exercise[]>>('/exercises', {
      params,
    });
    return response.data;
  },

  async getExercise(id: number): Promise<ApiResponse<Exercise>> {
    const response = await api.get<ApiResponse<Exercise>>(`/exercises/${id}`);
    return response.data;
  },

  // Workout Plans
  async getWorkoutPlans(): Promise<ApiResponse<WorkoutPlan[]>> {
    const response = await api.get<ApiResponse<WorkoutPlan[]>>('/workout-plans');
    return response.data;
  },

  async createWorkoutPlan(
    data: Partial<WorkoutPlan>
  ): Promise<ApiResponse<WorkoutPlan>> {
    const response = await api.post<ApiResponse<WorkoutPlan>>(
      '/workout-plans',
      data
    );
    return response.data;
  },

  // Workout Logs
  async getWorkoutLogs(limit?: number): Promise<ApiResponse<WorkoutLog[]>> {
    const response = await api.get<ApiResponse<WorkoutLog[]>>('/workout-logs', {
      params: { limit },
    });
    return response.data;
  },

  async createWorkoutLog(
    data: Partial<WorkoutLog>
  ): Promise<ApiResponse<WorkoutLog>> {
    const response = await api.post<ApiResponse<WorkoutLog>>(
      '/workout-logs',
      data
    );
    return response.data;
  },
};
