// types/village.ts

// Facility details
export interface FacilityDetail {
  available: boolean
  details?: string
}

// Committee member details
export interface CommitteeMember {
  name: string
  role: string
  contact: string
}

// Contact details
export interface ContactDetails {
  phone: string
  email: string
  address: string
}

// Village details (main)
export interface VillageDetail {
  id: string
  name: string
  district: string
  description?: string
  committee_members?: CommitteeMember[]   // ✅ lowercase
  contact_details?: ContactDetails        // ✅ lowercase
  facilities?: Record<string, FacilityDetail>
  gallery?: string[]
  mapEmbedUrl?: string
}


// Contact details
export interface ContactDetails {
  phone: string
  email: string
  address: string
}

// Key place details
export interface KeyPlace {
  name: string
  description: string
}

// Review structure
export interface Review {
  name: string
  rating: number
  comment: string
}

// API response for list of villages
export interface VillagesListResponse {
  success: boolean
  count: number
  data: VillageDetail[]
}

// Pagination info
export interface PaginationProps {
  page: number
  totalPages: number
}
export interface CommitteeMember {
  name: string
  role: string
  contact: string
}


export interface ContactDetails {
  phone: string
  email: string
  address: string
}

export interface VillageDetail {
  id: string
  name: string
  district: string
  description?: string
  committee_members?: CommitteeMember[]
  contact_details?: ContactDetails
  facilities?: Record<string, FacilityDetail>
}
