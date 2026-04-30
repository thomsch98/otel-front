import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { useServices } from './useServices'

const getServicesMock = vi.fn()

vi.mock('../services/api', () => ({
  apiClient: {
    getServices: () => getServicesMock(),
  },
}))

function ServicesProbe() {
  const { services } = useServices({ refreshIntervalMs: 1000 })

  return <div data-testid="services">{services.join(',')}</div>
}

describe('useServices', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    getServicesMock.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('refreshes the service list when new services arrive', async () => {
    getServicesMock
      .mockResolvedValueOnce(['service-a'])
      .mockResolvedValueOnce(['service-a', 'service-b'])

    render(<ServicesProbe />)

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByTestId('services')).toHaveTextContent('service-a')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.getByTestId('services')).toHaveTextContent('service-a,service-b')
  })
})


