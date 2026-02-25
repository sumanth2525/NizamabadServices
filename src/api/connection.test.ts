/**
 * Connection tests: API client behaviour with and without backend, and when fetch succeeds/fails.
 * Run with: npm run test -- src/api/connection.test.ts
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// When VITE_API_URL is unset, BASE is '' - we test that path with the default client
import * as clientNoBackend from './client'

describe('API connection (no backend URL)', () => {
  it('healthCheck returns no-backend when BASE is empty', async () => {
    const result = await clientNoBackend.healthCheck()
    expect(result).toEqual({ status: 'no-backend' })
  })

  it('getProvidersByCategory returns empty array when BASE is empty', async () => {
    const result = await clientNoBackend.getProvidersByCategory('plumbing')
    expect(result).toEqual([])
  })

  it('getProvidersByCategory with area returns empty array when BASE is empty', async () => {
    const result = await clientNoBackend.getProvidersByCategory('plumbing', 'Nizamabad city')
    expect(result).toEqual([])
  })

  it('getMyRequests returns empty array when BASE is empty', async () => {
    const result = await clientNoBackend.getMyRequests('9876543210')
    expect(result).toEqual([])
  })

  it('getMyRequests returns empty array when phone is empty', async () => {
    const result = await clientNoBackend.getMyRequests('')
    expect(result).toEqual([])
  })

  it('createRequest returns error when BASE is empty', async () => {
    const result = await clientNoBackend.createRequest({
      name: 'Test',
      phone: '9876543210',
      address: 'Somewhere',
      service_slug: 'plumbing',
    })
    expect(result.ok).toBe(false)
    expect(result.error).toContain('No API configured')
  })

  it('createProvider returns error when BASE is empty', async () => {
    const result = await clientNoBackend.createProvider({
      name: 'Test',
      phone: '9876543210',
      category_slug: 'plumbing',
      area: 'Nizamabad city',
    })
    expect(result.ok).toBe(false)
    expect(result.error).toContain('No API configured')
  })
})

describe('API connection (with backend URL, mocked fetch)', () => {
  const BASE = 'http://test-api.example.com'
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('VITE_API_URL', BASE)
    vi.resetModules()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('healthCheck calls fetch with correct URL and returns status when backend is ok', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', time: '2024-01-01T00:00:00Z' }),
    })

    const result = await client.healthCheck()

    expect(fetchMock).toHaveBeenCalledWith(`${BASE}/health`)
    expect(result).toEqual({ status: 'ok', time: '2024-01-01T00:00:00Z' })
  })

  it('healthCheck throws when backend returns non-ok', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({ ok: false })

    await expect(client.healthCheck()).rejects.toThrow('Health check failed')
    expect(fetchMock).toHaveBeenCalledWith(`${BASE}/health`)
  })

  it('getProvidersByCategory calls fetch with category URL and optional area param', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) })

    await client.getProvidersByCategory('electrician')

    expect(fetchMock).toHaveBeenCalledWith(`${BASE}/providers/electrician`)
  })

  it('getProvidersByCategory appends area query when provided', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) })

    await client.getProvidersByCategory('plumbing', 'Armoor')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/providers/plumbing'))
    expect(fetchMock.mock.calls[0][0]).toContain('area=Armoor')
  })

  it('getMyRequests calls fetch with phone query param', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve([]) })

    await client.getMyRequests('9876543210')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('requests?'))
    expect(fetchMock.mock.calls[0][0]).toContain('phone=9876543210')
  })

  it('createRequest sends POST with correct body and returns request_id on success', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ok: true, request_id: 'req-123' }),
    })

    const result = await client.createRequest({
      name: 'Customer',
      phone: '9876543210',
      address: 'Address',
      details: 'Details',
      service_slug: 'plumbing',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/requests`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body).toMatchObject({
      name: 'Customer',
      phone: '9876543210',
      address: 'Address',
      details: 'Details',
      service_slug: 'plumbing',
    })
    expect(result.ok).toBe(true)
    expect(result.request_id).toBe('req-123')
  })

  it('createProvider sends POST with correct body and returns provider_id on success', async () => {
    const client = await import('./client')
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ok: true, provider_id: 'prov-456' }),
    })

    const result = await client.createProvider({
      name: 'Provider',
      phone: '9876543210',
      category_slug: 'electrician',
      area: 'Bodhan',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/providers`,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body).toMatchObject({
      name: 'Provider',
      phone: '9876543210',
      category_slug: 'electrician',
      area: 'Bodhan',
    })
    expect(result.ok).toBe(true)
    expect(result.provider_id).toBe('prov-456')
  })
})
