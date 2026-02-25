import type { LucideIcon } from 'lucide-react'
import {
  Wrench,
  Zap,
  Car,
  Home,
  Bath,
  Paintbrush,
  Hammer,
  Bug,
  Wind,
  Lock,
  Camera,
  UtensilsCrossed,
  Tractor,
} from 'lucide-react'

export interface ServiceItem {
  slug: string
  name: string
  nameTe: string
  description: string
  descriptionTe: string
  icon: LucideIcon
  providerCount: number
  rating: number
}

export const SERVICES: ServiceItem[] = [
  { slug: 'plumbing', name: 'Plumbing', nameTe: 'ప్లంబింగ్', description: 'Pipes, taps, repairs', descriptionTe: 'పైపులు, ట్యాప్‌లు, మరమ్మత్తులు', icon: Wrench, providerCount: 8, rating: 4.8 },
  { slug: 'electrician', name: 'Electrician', nameTe: 'ఎలక్ట్రీషియన్', description: 'Wiring, fittings, repairs', descriptionTe: 'వైరింగ్, ఫిట్టింగ్‌లు', icon: Zap, providerCount: 10, rating: 4.7 },
  { slug: 'vehicle-auto', name: 'Vehicle & Auto', nameTe: 'వాహనం మరియు ఆటో', description: 'Repairs, servicing', descriptionTe: 'మరమ్మత్తులు, సర్వీసింగ్', icon: Car, providerCount: 6, rating: 4.6 },
  { slug: 'home-cleaning', name: 'Home Cleaning', nameTe: 'ఇంటి శుభ్రత', description: 'Deep clean, regular', descriptionTe: 'డీప్ క్లీన్, రెగ్యులర్', icon: Home, providerCount: 7, rating: 4.5 },
  { slug: 'bathroom-tiles', name: 'Bathroom & Tiles', nameTe: 'బాత్రూమ్ మరియు టైల్స్', description: 'Tiling, bathroom work', descriptionTe: 'టైలింగ్, బాత్రూమ్ పని', icon: Bath, providerCount: 5, rating: 4.7 },
  { slug: 'painting', name: 'Painting', nameTe: 'పెయింటింగ్', description: 'Interior, exterior', descriptionTe: 'ఇంటీరియర్, బాహ్య', icon: Paintbrush, providerCount: 6, rating: 4.6 },
  { slug: 'carpentry-furniture', name: 'Carpentry & Furniture', nameTe: 'కార్పెంట్రీ మరియు ఫర్నిచర్', description: 'Woodwork, repairs', descriptionTe: 'వుడ్‌వర్క్, మరమ్మత్తులు', icon: Hammer, providerCount: 5, rating: 4.5 },
  { slug: 'pest-control', name: 'Pest Control', nameTe: 'పీస్ట్ కంట్రోల్', description: 'Spray, fumigation', descriptionTe: 'స్ప్రే, ఫ్యూమిగేషన్', icon: Bug, providerCount: 4, rating: 4.8 },
  { slug: 'ac-appliance', name: 'AC & Appliance', nameTe: 'AC మరియు ఉపకరణం', description: 'AC, fridge, washing', descriptionTe: 'AC, ఫ్రిజ్, వాషింగ్', icon: Wind, providerCount: 7, rating: 4.6 },
  { slug: 'locks-security', name: 'Locks & Security', nameTe: 'లాక్‌లు మరియు భద్రత', description: 'Locks, grilles', descriptionTe: 'లాక్‌లు, గ్రిల్లెస్', icon: Lock, providerCount: 4, rating: 4.7 },
  { slug: 'photography', name: 'Photography', nameTe: 'ఫోటోగ్రఫీ', description: 'Events, portraits', descriptionTe: 'ఈవెంట్‌లు, పోర్ట్రెయిట్‌లు', icon: Camera, providerCount: 6, rating: 4.5 },
  { slug: 'catering-tiffin', name: 'Catering & Tiffin', nameTe: 'కేటరింగ్ మరియు టిఫిన్', description: 'Events, daily tiffin', descriptionTe: 'ఈవెంట్‌లు, రోజువారీ టిఫిన్', icon: UtensilsCrossed, providerCount: 8, rating: 4.6 },
  { slug: 'agriculture-farm', name: 'Agriculture & Farm', nameTe: 'వ్యవసాయం మరియు వ్యవసాయం', description: 'Tractor, spraying, bore, labour', descriptionTe: 'ట్రాక్టర్, స్ప్రేయింగ్, బోర్, శ్రమ', icon: Tractor, providerCount: 12, rating: 4.7 },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
