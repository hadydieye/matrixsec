import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Module = Tables<'modules'>;

export const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('modules')
          .select('*')
          .eq('is_published', true)
          .order('order_index');

        if (error) throw error;
        setModules(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return { modules, loading, error };
};