import type { Provider } from '../api/client'

export type MockProvider = Provider & { experience?: string }

const MOCK_BY_SLUG: Record<string, MockProvider[]> = {
  plumbing: [
    { id: 'mock-plumbing-1', name: 'Rajesh Kumar', phone: '919876543210', category_slug: 'plumbing', area: 'Nizamabad city', rating: 4.8, rating_count: 24, verified: true, experience: '8 years experience' },
    { id: 'mock-plumbing-2', name: 'Suresh Reddy', phone: '919123456789', category_slug: 'plumbing', area: 'Armoor', rating: 4.5, rating_count: 12, verified: false, experience: '5 years experience' },
    { id: 'mock-plumbing-3', name: 'Venkatesh Naidu', phone: '918765432109', category_slug: 'plumbing', area: 'Bodhan', rating: 4.6, rating_count: 8, verified: true, experience: '6+ years experience' },
  ],
  electrician: [
    { id: 'mock-electrician-1', name: 'Priya Sharma', phone: '919876543211', category_slug: 'electrician', area: 'Nizamabad city', rating: 4.7, rating_count: 18, verified: true, experience: '10 years experience' },
    { id: 'mock-electrician-2', name: 'Ramesh Gupta', phone: '919234567890', category_slug: 'electrician', area: 'Nizamabad rural', rating: 4.4, rating_count: 9, verified: false, experience: '4 years experience' },
    { id: 'mock-electrician-3', name: 'Anil Kumar', phone: '918712345678', category_slug: 'electrician', area: 'Armoor', rating: 4.6, rating_count: 14, verified: true, experience: '7 years experience' },
  ],
  'vehicle-auto': [
    { id: 'mock-vehicle-1', name: 'Kiran Mehta', phone: '919876543212', category_slug: 'vehicle-auto', area: 'Nizamabad city', rating: 4.6, rating_count: 22, verified: true, experience: '12 years experience' },
    { id: 'mock-vehicle-2', name: 'Mahesh Patel', phone: '919345678901', category_slug: 'vehicle-auto', area: 'Bodhan', rating: 4.5, rating_count: 11, verified: false, experience: '6 years experience' },
  ],
  'home-cleaning': [
    { id: 'mock-cleaning-1', name: 'Lakshmi Devi', phone: '919876543213', category_slug: 'home-cleaning', area: 'Nizamabad city', rating: 4.5, rating_count: 30, verified: true, experience: '5 years experience' },
    { id: 'mock-cleaning-2', name: 'Sunita Rao', phone: '919456789012', category_slug: 'home-cleaning', area: 'Armoor', rating: 4.4, rating_count: 7, verified: false, experience: '3+ years experience' },
  ],
  'bathroom-tiles': [
    { id: 'mock-tiles-1', name: 'Ravi Shankar', phone: '919876543214', category_slug: 'bathroom-tiles', area: 'Nizamabad city', rating: 4.7, rating_count: 16, verified: true, experience: '9 years experience' },
    { id: 'mock-tiles-2', name: 'Prakash Joshi', phone: '919567890123', category_slug: 'bathroom-tiles', area: 'Nizamabad rural', rating: 4.5, rating_count: 10, verified: false, experience: '5 years experience' },
  ],
  painting: [
    { id: 'mock-painting-1', name: 'Vijay Singh', phone: '919876543215', category_slug: 'painting', area: 'Nizamabad city', rating: 4.6, rating_count: 20, verified: true, experience: '8 years experience' },
    { id: 'mock-painting-2', name: 'Srinivas Murthy', phone: '919678901234', category_slug: 'painting', area: 'Bodhan', rating: 4.5, rating_count: 13, verified: false, experience: '4 years experience' },
  ],
  'carpentry-furniture': [
    { id: 'mock-carpentry-1', name: 'Nagaraju Yadav', phone: '919876543216', category_slug: 'carpentry-furniture', area: 'Nizamabad city', rating: 4.5, rating_count: 15, verified: true, experience: '7 years experience' },
    { id: 'mock-carpentry-2', name: 'Gopal Krishnan', phone: '919789012345', category_slug: 'carpentry-furniture', area: 'Armoor', rating: 4.4, rating_count: 8, verified: false, experience: '5 years experience' },
  ],
  'pest-control': [
    { id: 'mock-pest-1', name: 'Arun Kumar', phone: '919876543217', category_slug: 'pest-control', area: 'Nizamabad city', rating: 4.8, rating_count: 28, verified: true, experience: '6 years experience' },
    { id: 'mock-pest-2', name: 'Manoj Reddy', phone: '919890123456', category_slug: 'pest-control', area: 'Nizamabad rural', rating: 4.6, rating_count: 9, verified: false, experience: '3+ years experience' },
  ],
  'ac-appliance': [
    { id: 'mock-ac-1', name: 'Deepak Verma', phone: '919876543218', category_slug: 'ac-appliance', area: 'Nizamabad city', rating: 4.6, rating_count: 19, verified: true, experience: '9 years experience' },
    { id: 'mock-ac-2', name: 'Santosh Nair', phone: '919901234567', category_slug: 'ac-appliance', area: 'Bodhan', rating: 4.5, rating_count: 11, verified: false, experience: '5 years experience' },
  ],
  'locks-security': [
    { id: 'mock-locks-1', name: 'Raju Bhai', phone: '919876543219', category_slug: 'locks-security', area: 'Nizamabad city', rating: 4.7, rating_count: 14, verified: true, experience: '10 years experience' },
    { id: 'mock-locks-2', name: 'Kishore Das', phone: '919012345678', category_slug: 'locks-security', area: 'Armoor', rating: 4.5, rating_count: 6, verified: false, experience: '4 years experience' },
  ],
  photography: [
    { id: 'mock-photo-1', name: 'Aditya Rao', phone: '919876543220', category_slug: 'photography', area: 'Nizamabad city', rating: 4.5, rating_count: 25, verified: true, experience: '7 years experience' },
    { id: 'mock-photo-2', name: 'Kavitha Menon', phone: '919123456780', category_slug: 'photography', area: 'Nizamabad rural', rating: 4.4, rating_count: 12, verified: false, experience: '5 years experience' },
  ],
  'catering-tiffin': [
    { id: 'mock-catering-1', name: 'Lakshmi Caterers', phone: '919876543221', category_slug: 'catering-tiffin', area: 'Nizamabad city', rating: 4.6, rating_count: 40, verified: true, experience: '12 years experience' },
    { id: 'mock-catering-2', name: 'Savitri Tiffin', phone: '919234567801', category_slug: 'catering-tiffin', area: 'Armoor', rating: 4.5, rating_count: 18, verified: false, experience: '6 years experience' },
  ],
  'agriculture-farm': [
    { id: 'mock-agri-1', name: 'Ramu Tractor Services', phone: '919876543222', category_slug: 'agriculture-farm', area: 'Nizamabad rural', rating: 4.7, rating_count: 32, verified: true, experience: '15 years experience' },
    { id: 'mock-agri-2', name: 'Sreenivas Farm Labour', phone: '919345678902', category_slug: 'agriculture-farm', area: 'Bodhan', rating: 4.5, rating_count: 14, verified: false, experience: '8 years experience' },
  ],
}

export function getMockProvidersForService(slug: string): MockProvider[] {
  return MOCK_BY_SLUG[slug] ?? []
}
