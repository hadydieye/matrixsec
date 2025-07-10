import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserStats {
  totalModules: number;
  completedModules: number;
  totalTimeMinutes: number;
  totalXP: number;
  level: string;
  badgesCount: number;
  currentStreak: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>({
    totalModules: 0,
    completedModules: 0,
    totalTimeMinutes: 0,
    totalXP: 0,
    level: 'Débutant',
    badgesCount: 0,
    currentStreak: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setStats({
        totalModules: 0,
        completedModules: 0,
        totalTimeMinutes: 0,
        totalXP: 0,
        level: 'Débutant',
        badgesCount: 0,
        currentStreak: 0
      });
      setLoading(false);
      return;
    }

    const fetchUserStats = async () => {
      try {
        setLoading(true);

        // Get user profile for XP and level
        const { data: profile } = await supabase
          .from('profiles')
          .select('xp, level, total_time_minutes, streak_days')
          .eq('user_id', user.id)
          .single();

        // Get total modules count
        const { count: totalModules } = await supabase
          .from('modules')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true);

        // Get user progress
        const { data: progress, count: completedCount } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .eq('status', 'completed');

        // Get user badges count
        const { count: badgesCount } = await supabase
          .from('user_badges')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // Calculate total time from progress
        const totalTimeFromProgress = progress?.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0) || 0;

        setStats({
          totalModules: totalModules || 0,
          completedModules: completedCount || 0,
          totalTimeMinutes: profile?.total_time_minutes || totalTimeFromProgress,
          totalXP: profile?.xp || 0,
          level: profile?.level || 'Débutant',
          badgesCount: badgesCount || 0,
          currentStreak: profile?.streak_days || 0
        });

      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const getProgressPercentage = () => {
    if (stats.totalModules === 0) return 0;
    return Math.round((stats.completedModules / stats.totalModules) * 100);
  };

  return { 
    stats, 
    loading, 
    error, 
    progressPercentage: getProgressPercentage() 
  };
};