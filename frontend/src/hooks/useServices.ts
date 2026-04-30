import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '../services/api'

const DEFAULT_REFRESH_INTERVAL_MS = 5000

interface UseServicesOptions {
  refreshIntervalMs?: number
}

function areServicesEqual(current: string[], next: string[]) {
  return current.length === next.length && current.every((service, index) => service === next[index])
}

export function useServices(options?: UseServicesOptions) {
  const [services, setServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refreshIntervalMs = options?.refreshIntervalMs ?? DEFAULT_REFRESH_INTERVAL_MS

  const fetchServices = useCallback(async (background = false) => {
    if (!background) {
      setLoading(true)
    }

    setError(null)

    try {
      const data = await apiClient.getServices()
      const nextServices = data.filter((service) => service.trim().length > 0)

      setServices((current) => (areServicesEqual(current, nextServices) ? current : nextServices))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch services'))
    } finally {
      if (!background) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    void fetchServices()

    if (refreshIntervalMs <= 0) {
      return
    }

    const intervalId = window.setInterval(() => {
      void fetchServices(true)
    }, refreshIntervalMs)

    return () => window.clearInterval(intervalId)
  }, [fetchServices, refreshIntervalMs])

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
  }
}
