import { useState, useEffect } from 'react';
import { statsAPI } from '../services/api/stats';
import { UserStats } from '../types';
import { friendlyError } from '../utils/friendlyError';

export const useStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const data = await statsAPI.getStats();
      setStats(data);
      setError(null);
    } catch (err: unknown) {
      setError(friendlyError(err, 'Could not load stats. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
