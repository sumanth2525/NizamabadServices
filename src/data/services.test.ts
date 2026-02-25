import { describe, it, expect } from 'vitest'
import { getServiceBySlug, SERVICES } from './services'

describe('services', () => {
  it('getServiceBySlug returns service for valid slug', () => {
    const s = getServiceBySlug('plumbing')
    expect(s).toBeDefined()
    expect(s?.name).toBe('Plumbing')
    expect(s?.slug).toBe('plumbing')
  })

  it('getServiceBySlug returns undefined for invalid slug', () => {
    expect(getServiceBySlug('invalid')).toBeUndefined()
  })

  it('SERVICES has 13 categories', () => {
    expect(SERVICES).toHaveLength(13)
  })
})
