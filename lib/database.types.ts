export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  role: 'admin' | 'student' | string
  created_at: string
}

export type Course = {
  id: string
  title: string
  description: string | null
  youtube_url: string
  level: string
  position: number | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string }
        Update: Partial<Profile>
      }
      courses: {
        Row: Course
        Insert: Omit<Course, 'id' | 'created_at'> & Partial<Pick<Course, 'id' | 'created_at'>>
        Update: Partial<Course>
      }
    }
  }
}