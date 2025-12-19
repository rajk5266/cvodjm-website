'use client'

import React from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import Link from 'next/link'

interface Village {
  id: number
  name: string
  taluka: string
  district: string
  population: number
  famousFor?: string
}

interface VillagesListProps {
  villages: Village[]
  page: number
  totalPages: number
  lang: string
}

export const VillagesList: React.FC<VillagesListProps> = ({
  villages,
  page,
  totalPages,
  lang,
}) => {
  const prevPage = page > 1 ? page - 1 : 1
  const nextPage = page < totalPages ? page + 1 : totalPages

  return (
    <div className="w-full">
      {/* 🌾 Villages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {villages.map((village) => (
          <Link key={village.id} href={`/${lang}/gham/${village.id}`}>
            <Card className="hover:shadow-lg transition-all duration-200 border rounded-2xl bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {village.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600">
                  <strong>Taluka:</strong> {village.taluka}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>District:</strong> {village.district}
                </p>
                {village.famousFor && (
                  <p className="text-sm text-gray-600 italic mt-1">
                    🌿 {village.famousFor}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4">
        <Link
          href={`/${lang}/gham?page=${prevPage}`}
        >
          <Button variant="outline" disabled={page === 1}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
        </Link>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <Link
          href={`/${lang}/gham?page=${nextPage}`}
        >
          <Button variant="outline" disabled={page === totalPages}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
