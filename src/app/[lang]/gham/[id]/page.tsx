import { api } from '@/lib/api'
import { ArrowLeft, MapPin, Home, BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { VillageDetail } from '@/types/village'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

/* =========================
   Types
========================= */
type PageProps = {
    params: Promise<{
        lang: string
        id: string
    }>
}

/* =========================
   API Call
========================= */
async function getVillageDetails(
    id: string,
    lang: string
): Promise<VillageDetail | null> {
    try {
        const { data } = await api.get(`/gham/${id}?lang=${lang}`)
        return data.data || null
    } catch (error) {
        console.error('Error fetching village detail:', error)
        return null
    }
}

/* =========================
   Page
========================= */
export default async function VillageDetailPage({ params }: PageProps) {
    const { lang, id } = await params

    const village = await getVillageDetails(id, lang)

    if (!village) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Village Not Found
                    </h2>
                    <p className="text-gray-600 mb-4">
                        The village you are looking for does not exist.
                    </p>
                    <Link
                        href={`/${lang}/gham`}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Back to Villages
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Back Button */}
                <Link
                    href={`/${lang}/gham`}
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Villages
                </Link>

                {/* Main Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

                    {/* Header */}
                    <div className="h-64 bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                        <Home className="w-32 h-32 text-white opacity-80" />
                    </div>

                    <div className="p-8 space-y-8">

                        {/* Name */}
                        <h1 className="text-4xl font-bold text-gray-800">
                            {village.name}
                        </h1>

                        {/* Basic Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {village.district && (
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <MapPin className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            District
                                        </p>
                                        <p className="text-lg font-semibold">
                                            {village.district}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {village.description && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                    <BookOpen className="w-6 h-6 text-gray-600" />
                                    About
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {village.description}
                                </p>
                            </div>
                        )}

                        {/* Committee Members */}
                        {(village.committee_members?.length ?? 0) > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Committee Members
                                </h2>
                                <div className="space-y-2">
                                    {(village.committee_members ?? []).map(
                                        (member) => (
                                            <div
                                                key={member.name}
                                                className="p-4 border rounded-lg"
                                            >
                                                <p className="font-semibold">
                                                    {member.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {member.role}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contact Details */}
                        {village.contact_details && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Contact Details
                                </h2>
                                <p>
                                    <strong>Phone:</strong>{' '}
                                    {village.contact_details.phone}
                                </p>
                                <p>
                                    <strong>Email:</strong>{' '}
                                    {village.contact_details.email}
                                </p>
                                <p>
                                    <strong>Address:</strong>{' '}
                                    {village.contact_details.address}
                                </p>
                            </div>
                        )}

                        {/* Facilities */}
                        {village.facilities &&
                            Object.keys(village.facilities).length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        Facilities
                                    </h2>
                                    <ul className="list-disc pl-6">
                                        {Object.entries(
                                            village.facilities
                                        ).map(([key, val]) => (
                                            <li key={key}>
                                                <strong>{key}:</strong>{' '}
                                                {val.available
                                                    ? 'Available'
                                                    : 'Not Available'}
                                                {val.details &&
                                                    ` - ${val.details}`}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        {/* Gallery */}
                        {village.gallery &&
                            village.gallery.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                        Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {village.gallery.map((img, i) => (
                                            <Image
                                                key={i}
                                                src={img}
                                                alt={`${village.name} image ${
                                                    i + 1
                                                }`}
                                                className="w-full h-40 object-cover rounded-lg shadow-md"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* Google Map */}
                        {village.mapEmbedUrl && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Location
                                </h2>
                                <iframe
                                    src={village.mapEmbedUrl}
                                    className="w-full h-64 rounded-lg shadow-md"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

