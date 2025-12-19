// types/team.ts
export interface TeamMember {
  id: string;
  fullName: string;
  village: string;
  mobile: string;
  email: string;
  designation: string;
  photo: string;
}

export interface TeamSection {
  title: string;
  members: TeamMember[];
}

export type TeamRole = 'trustees' | 'committee1' | 'committee2';