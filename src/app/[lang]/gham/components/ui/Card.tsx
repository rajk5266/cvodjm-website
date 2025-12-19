// components/ui/card.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-50/50 before:via-transparent before:to-pink-50/50 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
        'after:absolute after:inset-0 after:rounded-2xl after:ring-2 after:ring-orange-400/0 after:transition-all after:duration-500 hover:after:ring-orange-400/20',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative p-6 pb-4 bg-gradient-to-br from-gray-50 to-white rounded-t-2xl border-b border-gray-100',
        'group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-pink-50 transition-all duration-500',
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'relative z-10 text-2xl font-bold leading-tight tracking-tight',
        'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent',
        'group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-500',
        className
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'relative z-10 mt-2 text-sm text-gray-600 leading-relaxed',
        'group-hover:text-gray-700 transition-colors duration-300',
        className
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        'relative z-10 p-6 pt-4',
        className
      )} 
      {...props} 
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative z-10 flex items-center p-6 pt-0',
        className
      )}
      {...props}
    />
  )
}

// Example usage component showing beautiful card designs
export function CardShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-pink-50/30 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          Beautiful Card Components
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Simple */}
          <Card className="cursor-pointer hover:scale-105">
            <CardHeader>
              <CardTitle>Village Name</CardTitle>
              <CardDescription>
                A beautiful village in Gujarat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-sm">Ahmedabad District</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  <span className="text-sm">Population: 25,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - With Icon */}
          <Card className="cursor-pointer hover:scale-105">
            <div className="h-32 bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
              <svg className="w-16 h-16 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <CardHeader>
              <CardTitle>Heritage Village</CardTitle>
              <CardDescription>
                Rich cultural history and traditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Explore the ancient architecture and local crafts that make this village unique.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 - Stats */}
          <Card className="cursor-pointer hover:scale-105">
            <CardHeader>
              <CardTitle>Village Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100">
                  <p className="text-2xl font-bold text-orange-600">42</p>
                  <p className="text-xs text-gray-600 mt-1">Total Villages</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100">
                  <p className="text-2xl font-bold text-pink-600">52</p>
                  <p className="text-xs text-gray-600 mt-1">Districts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 - Featured */}
          <Card className="cursor-pointer hover:scale-105 md:col-span-2">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>Featured Destination</CardTitle>
                  <CardDescription>
                    Discover the most visited village this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Experience authentic Gujarati culture, traditional crafts, and warm hospitality in this stunning village nestled in the heart of Gujarat.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Cultural</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">Historic</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Popular</span>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* Card 5 - Info Card */}
          <Card className="cursor-pointer hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Quick Info</h4>
                  <p className="text-sm text-gray-600">
                    Click any village card to view detailed information and statistics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 6 - Action Card */}
          <Card className="cursor-pointer hover:scale-105 bg-gradient-to-br from-orange-500 to-pink-600 border-none text-white">
            <CardHeader className="bg-transparent border-none">
              <CardTitle className="text-white bg-transparent bg-clip-text">
                Explore More
              </CardTitle>
              <CardDescription className="text-white/90">
                Discover all 42 villages of Gujarat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button className="w-full py-2 px-4 rounded-lg bg-white text-orange-600 font-semibold hover:bg-gray-50 transition-colors">
                View All Villages
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}