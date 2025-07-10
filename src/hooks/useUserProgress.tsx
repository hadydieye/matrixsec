import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Tables } from '@/integrations/supabase/types';

type UserProgress = Tables<'user_progress'>;

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        setProgress(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  const getModuleProgress = (moduleId: string) => {
    return progress.find(p => p.module_id === moduleId);
  };

  const startModule = async (moduleId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          status: 'in_progress',
          progress_percentage: 0
        });

      if (error) throw error;

      // Refresh progress
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      setProgress(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start module');
    }
  };

  return { progress, loading, error, getModuleProgress, startModule };
};