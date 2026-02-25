import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { AREAS } from '../data/constants'

const STORAGE_KEY = 'nizamabad-services-area'

export type AreaValue = (typeof AREAS)[number] | ''

function getStoredArea(): AreaValue {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === '') return ''
    if (AREAS.includes(v as (typeof AREAS)[number])) return v as (typeof AREAS)[number]
  } catch {}
  return ''
}

interface AreaContextValue {
  area: AreaValue
  setArea: (area: AreaValue) => void
  areas: readonly string[]
}

const AreaContext = createContext<AreaContextValue | null>(null)

export function AreaProvider({ children }: { children: ReactNode }) {
  const [area, setAreaState] = useState<AreaValue>(getStoredArea)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, area)
    } catch {}
  }, [area])

  const setArea = useCallback((a: AreaValue) => {
    setAreaState(a)
  }, [])

  return (
    <AreaContext.Provider value={{ area, setArea, areas: AREAS }}>
      {children}
    </AreaContext.Provider>
  )
}

export function useArea() {
  const ctx = useContext(AreaContext)
  if (!ctx) throw new Error('useArea must be used within AreaProvider')
  return ctx
}
