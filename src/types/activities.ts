export interface ActivityItem {
  id: number
  name: string
  summary: string
  description: string
  image: string
  type: string
  color?: string
}

export interface ActivitiesCTA {
  label: string
  href: string
}

export interface ActivitiesContent {
  title: string
  subtitle: string
  activities: ActivityItem[]

  /** CTA at bottom of activities section */
  exploreCTA: ActivitiesCTA
}
