const BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV && import.meta.env.MODE !== 'test' ? 'http://localhost:8000' : '')

export interface CreateRequestBody {
  name: string
  phone: string
  address: string
  details?: string
  service_slug: string
}

export interface CreateRequestResponse {
  ok: boolean
  request_id?: string
  error?: string
}

export interface CreateProviderBody {
  name: string
  phone: string
  category_slug: string
  area: string
}

export interface CreateProviderResponse {
  ok: boolean
  provider_id?: string
  error?: string
}

export interface Provider {
  id: string
  name: string
  phone: string
  category_slug: string
  area: string
  rating?: number
  rating_count?: number
  verified?: boolean
  created_at?: string
}

export interface ServiceRequest {
  id: string
  name: string
  phone: string
  address: string
  details?: string
  service_slug: string
  status: string
  created_at: string
}

export async function healthCheck(): Promise<{ status: string; time?: string }> {
  if (!BASE) return { status: 'no-backend' }
  const res = await fetch(`${BASE}/health`)
  if (!res.ok) throw new Error('Health check failed')
  return res.json()
}

export async function createRequest(body: CreateRequestBody): Promise<CreateRequestResponse> {
  if (!BASE) return { ok: false, error: 'No API configured' }
  const res = await fetch(`${BASE}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return { ok: false, error: data.detail?.[0]?.msg || data.error || res.statusText }
  return data
}

export async function createProvider(body: CreateProviderBody): Promise<CreateProviderResponse> {
  if (!BASE) return { ok: false, error: 'No API configured' }
  const res = await fetch(`${BASE}/providers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) return { ok: false, error: data.detail?.[0]?.msg || data.error || res.statusText }
  return data
}

export async function getProvidersByCategory(
  categorySlug: string,
  area?: string
): Promise<Provider[]> {
  if (!BASE) return []
  const url = new URL(`${BASE}/providers/${encodeURIComponent(categorySlug)}`)
  if (area && area.trim()) url.searchParams.set('area', area.trim())
  const res = await fetch(url.toString())
  if (!res.ok) return []
  const data = await res.json().catch(() => [])
  return Array.isArray(data) ? data : []
}

export async function getMyRequests(phone: string): Promise<ServiceRequest[]> {
  if (!BASE || !phone) return []
  const res = await fetch(`${BASE}/requests?phone=${encodeURIComponent(phone)}`)
  if (!res.ok) return []
  const data = await res.json().catch(() => [])
  return Array.isArray(data) ? data : []
}

export interface Analytics {
  requests_per_day: number[]
  total_requests: number
  total_providers: number
  last_week_requests: number
  goals_done: number
  goals_total: number
  days_with_requests: boolean[]
}

export async function getAnalytics(): Promise<Analytics | null> {
  if (!BASE) return null
  const res = await fetch(`${BASE}/analytics`)
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  return data as Analytics
}
