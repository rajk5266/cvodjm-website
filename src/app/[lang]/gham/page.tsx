import React from 'react'
import { VillagesList } from './components/VillageList'
import { api } from '@/lib/api'

/* =========================
   Types
========================= */
interface Village {
  id: number
  name: string
  taluka: string
  district: string
  population: number
  famousFor?: string
}

type PageProps = {
  params: Promise<{
    lang: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

/* =========================
   Constants
========================= */
const ITEMS_PER_PAGE = 12

/* =========================
   Page
========================= */
export default async function GhamPage({
  params,
  searchParams,
}: PageProps) {
  const { lang } = await params
  const { page } = await searchParams

  const currentPage = Number(page) || 1

  /* =========================
     API Call
  ========================= */
  const res = await api.get(
    `/gham?lang=${lang}&page=1&limit=1000`
  )

  if (!res?.data?.data) {
    throw new Error('Failed to fetch villages data')
  }

  const allVillages: Village[] = res.data.data
  const totalPages = Math.ceil(allVillages.length / ITEMS_PER_PAGE)

  /* =========================
     Pagination
  ========================= */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentVillages = allVillages.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Villages of 42/52 Gham, Gujarat
      </h1>

      <VillagesList
        villages={currentVillages}
        page={currentPage}
        totalPages={totalPages}
        lang={lang}
      />
    </div>
  )
}
