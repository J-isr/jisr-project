export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      academy_courses: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          duration_hours: number | null
          ends_at: string | null
          graduates_count: number | null
          id: string
          is_published: boolean
          level: Database["public"]["Enums"]["course_level"] | null
          location_ar: string | null
          location_en: string | null
          mode: Database["public"]["Enums"]["course_mode"] | null
          registration_url: string | null
          seats: number | null
          slug: string
          sort_order: number
          starts_at: string | null
          status: Database["public"]["Enums"]["course_status"]
          title_ar: string
          title_en: string | null
          track: string | null
          trainer_name_ar: string | null
          trainer_name_en: string | null
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          duration_hours?: number | null
          ends_at?: string | null
          graduates_count?: number | null
          id?: string
          is_published?: boolean
          level?: Database["public"]["Enums"]["course_level"] | null
          location_ar?: string | null
          location_en?: string | null
          mode?: Database["public"]["Enums"]["course_mode"] | null
          registration_url?: string | null
          seats?: number | null
          slug: string
          sort_order?: number
          starts_at?: string | null
          status?: Database["public"]["Enums"]["course_status"]
          title_ar: string
          title_en?: string | null
          track?: string | null
          trainer_name_ar?: string | null
          trainer_name_en?: string | null
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          duration_hours?: number | null
          ends_at?: string | null
          graduates_count?: number | null
          id?: string
          is_published?: boolean
          level?: Database["public"]["Enums"]["course_level"] | null
          location_ar?: string | null
          location_en?: string | null
          mode?: Database["public"]["Enums"]["course_mode"] | null
          registration_url?: string | null
          seats?: number | null
          slug?: string
          sort_order?: number
          starts_at?: string | null
          status?: Database["public"]["Enums"]["course_status"]
          title_ar?: string
          title_en?: string | null
          track?: string | null
          trainer_name_ar?: string | null
          trainer_name_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          achievement_type: string
          awarded_at: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          icon: string | null
          id: string
          image_url: string | null
          member_id: string
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          achievement_type?: string
          awarded_at?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          member_id: string
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          achievement_type?: string
          awarded_at?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          member_id?: string
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          body_ar: string | null
          body_en: string | null
          created_at: string
          expires_at: string | null
          id: string
          image_url: string | null
          is_pinned: boolean
          link_url: string | null
          publish_status: Database["public"]["Enums"]["publish_status"]
          published_at: string | null
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          body_ar?: string | null
          body_en?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          link_url?: string | null
          publish_status?: Database["public"]["Enums"]["publish_status"]
          published_at?: string | null
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          body_ar?: string | null
          body_en?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_pinned?: boolean
          link_url?: string | null
          publish_status?: Database["public"]["Enums"]["publish_status"]
          published_at?: string | null
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string | null
          certificate_type: Database["public"]["Enums"]["certificate_type"]
          course_id: string | null
          created_at: string
          event_id: string | null
          file_path: string | null
          id: string
          is_verified: boolean
          issue_date: string | null
          member_id: string
          title_ar: string
          title_en: string | null
          updated_at: string
          verification_code: string | null
        }
        Insert: {
          certificate_number?: string | null
          certificate_type?: Database["public"]["Enums"]["certificate_type"]
          course_id?: string | null
          created_at?: string
          event_id?: string | null
          file_path?: string | null
          id?: string
          is_verified?: boolean
          issue_date?: string | null
          member_id: string
          title_ar: string
          title_en?: string | null
          updated_at?: string
          verification_code?: string | null
        }
        Update: {
          certificate_number?: string | null
          certificate_type?: Database["public"]["Enums"]["certificate_type"]
          course_id?: string | null
          created_at?: string
          event_id?: string | null
          file_path?: string | null
          id?: string
          is_verified?: boolean
          issue_date?: string | null
          member_id?: string
          title_ar?: string
          title_en?: string | null
          updated_at?: string
          verification_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "academy_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      committee_members: {
        Row: {
          committee_id: string
          created_at: string
          ended_at: string | null
          id: string
          is_lead: boolean
          member_id: string
          role_ar: string | null
          role_en: string | null
          started_at: string | null
          updated_at: string
        }
        Insert: {
          committee_id: string
          created_at?: string
          ended_at?: string | null
          id?: string
          is_lead?: boolean
          member_id: string
          role_ar?: string | null
          role_en?: string | null
          started_at?: string | null
          updated_at?: string
        }
        Update: {
          committee_id?: string
          created_at?: string
          ended_at?: string | null
          id?: string
          is_lead?: boolean
          member_id?: string
          role_ar?: string | null
          role_en?: string | null
          started_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "committee_members_committee_id_fkey"
            columns: ["committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "committee_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      committees: {
        Row: {
          created_at: string
          description_ar: string | null
          description_en: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_published: boolean
          name_ar: string
          name_en: string | null
          parent_id: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name_ar: string
          name_en?: string | null
          parent_id?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name_ar?: string
          name_en?: string | null
          parent_id?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "committees_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
        ]
      }
      course_attendance: {
        Row: {
          attended: boolean
          course_id: string
          created_at: string
          hours: number | null
          id: string
          member_id: string
          session_date: string
          session_title: string | null
          updated_at: string
        }
        Insert: {
          attended?: boolean
          course_id: string
          created_at?: string
          hours?: number | null
          id?: string
          member_id: string
          session_date: string
          session_title?: string | null
          updated_at?: string
        }
        Update: {
          attended?: boolean
          course_id?: string
          created_at?: string
          hours?: number | null
          id?: string
          member_id?: string
          session_date?: string
          session_title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_attendance_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "academy_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_attendance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      course_materials: {
        Row: {
          course_id: string
          created_at: string
          description_ar: string | null
          description_en: string | null
          external_url: string | null
          file_path: string | null
          file_type: string | null
          id: string
          members_only: boolean
          sort_order: number
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          external_url?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          members_only?: boolean
          sort_order?: number
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          external_url?: string | null
          file_path?: string | null
          file_type?: string | null
          id?: string
          members_only?: boolean
          sort_order?: number
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "academy_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_registrations: {
        Row: {
          completed: boolean
          course_id: string
          created_at: string
          grade: number | null
          id: string
          member_id: string
          notes: string | null
          registered_at: string
          status: Database["public"]["Enums"]["registration_status"]
          updated_at: string
        }
        Insert: {
          completed?: boolean
          course_id: string
          created_at?: string
          grade?: number | null
          id?: string
          member_id: string
          notes?: string | null
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Update: {
          completed?: boolean
          course_id?: string
          created_at?: string
          grade?: number | null
          id?: string
          member_id?: string
          notes?: string | null
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_registrations_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "academy_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_registrations_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attended: boolean
          created_at: string
          event_id: string
          hours_awarded: number | null
          id: string
          member_id: string
          notes: string | null
          registered_at: string
          status: Database["public"]["Enums"]["registration_status"]
          updated_at: string
        }
        Insert: {
          attended?: boolean
          created_at?: string
          event_id: string
          hours_awarded?: number | null
          id?: string
          member_id: string
          notes?: string | null
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Update: {
          attended?: boolean
          created_at?: string
          event_id?: string
          hours_awarded?: number | null
          id?: string
          member_id?: string
          notes?: string | null
          registered_at?: string
          status?: Database["public"]["Enums"]["registration_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          category: string | null
          committee_id: string | null
          cover_image_url: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          ends_at: string | null
          hours_awarded: number | null
          id: string
          is_featured: boolean
          location_ar: string | null
          location_en: string | null
          publish_status: Database["public"]["Enums"]["publish_status"]
          registration_url: string | null
          slug: string
          sort_order: number
          starts_at: string | null
          status: Database["public"]["Enums"]["event_status"]
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          category?: string | null
          committee_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          ends_at?: string | null
          hours_awarded?: number | null
          id?: string
          is_featured?: boolean
          location_ar?: string | null
          location_en?: string | null
          publish_status?: Database["public"]["Enums"]["publish_status"]
          registration_url?: string | null
          slug: string
          sort_order?: number
          starts_at?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          category?: string | null
          committee_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          ends_at?: string | null
          hours_awarded?: number | null
          id?: string
          is_featured?: boolean
          location_ar?: string | null
          location_en?: string | null
          publish_status?: Database["public"]["Enums"]["publish_status"]
          registration_url?: string | null
          slug?: string
          sort_order?: number
          starts_at?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_committee_id_fkey"
            columns: ["committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
        ]
      }
      faq: {
        Row: {
          answer_ar: string | null
          answer_en: string | null
          category: string | null
          created_at: string
          id: string
          is_published: boolean
          question_ar: string
          question_en: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer_ar?: string | null
          answer_en?: string | null
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          question_ar: string
          question_en?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer_ar?: string | null
          answer_en?: string | null
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          question_ar?: string
          question_en?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          album: string | null
          caption_ar: string | null
          caption_en: string | null
          created_at: string
          event_id: string | null
          id: string
          image_url: string
          is_published: boolean
          project_id: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          album?: string | null
          caption_ar?: string | null
          caption_en?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          image_url: string
          is_published?: boolean
          project_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          album?: string | null
          caption_ar?: string | null
          caption_en?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          image_url?: string
          is_published?: boolean
          project_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_sections: {
        Row: {
          background_image_url: string | null
          created_at: string
          eyebrow_ar: string | null
          eyebrow_en: string | null
          id: string
          is_published: boolean
          page_slug: string
          primary_cta_label_ar: string | null
          primary_cta_label_en: string | null
          primary_cta_url: string | null
          secondary_cta_label_ar: string | null
          secondary_cta_label_en: string | null
          secondary_cta_url: string | null
          subtitle_ar: string | null
          subtitle_en: string | null
          title_ar: string | null
          title_en: string | null
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          eyebrow_ar?: string | null
          eyebrow_en?: string | null
          id?: string
          is_published?: boolean
          page_slug: string
          primary_cta_label_ar?: string | null
          primary_cta_label_en?: string | null
          primary_cta_url?: string | null
          secondary_cta_label_ar?: string | null
          secondary_cta_label_en?: string | null
          secondary_cta_url?: string | null
          subtitle_ar?: string | null
          subtitle_en?: string | null
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          eyebrow_ar?: string | null
          eyebrow_en?: string | null
          id?: string
          is_published?: boolean
          page_slug?: string
          primary_cta_label_ar?: string | null
          primary_cta_label_en?: string | null
          primary_cta_url?: string | null
          secondary_cta_label_ar?: string | null
          secondary_cta_label_en?: string | null
          secondary_cta_url?: string | null
          subtitle_ar?: string | null
          subtitle_en?: string | null
          title_ar?: string | null
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          academic_level: string | null
          applied_at: string | null
          assigned_committee_id: string | null
          avatar_url: string | null
          bio_ar: string | null
          bio_en: string | null
          college: string | null
          created_at: string
          email: string | null
          full_name_ar: string
          full_name_en: string | null
          id: string
          interests: string[]
          is_public: boolean
          joined_at: string | null
          major: string | null
          member_number: string | null
          phone: string | null
          position_ar: string | null
          position_en: string | null
          recommended_committee_id: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          skills: string[]
          social_links: Json
          sort_order: number
          status: Database["public"]["Enums"]["member_status"]
          university: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          academic_level?: string | null
          applied_at?: string | null
          assigned_committee_id?: string | null
          avatar_url?: string | null
          bio_ar?: string | null
          bio_en?: string | null
          college?: string | null
          created_at?: string
          email?: string | null
          full_name_ar: string
          full_name_en?: string | null
          id?: string
          interests?: string[]
          is_public?: boolean
          joined_at?: string | null
          major?: string | null
          member_number?: string | null
          phone?: string | null
          position_ar?: string | null
          position_en?: string | null
          recommended_committee_id?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          skills?: string[]
          social_links?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["member_status"]
          university?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          academic_level?: string | null
          applied_at?: string | null
          assigned_committee_id?: string | null
          avatar_url?: string | null
          bio_ar?: string | null
          bio_en?: string | null
          college?: string | null
          created_at?: string
          email?: string | null
          full_name_ar?: string
          full_name_en?: string | null
          id?: string
          interests?: string[]
          is_public?: boolean
          joined_at?: string | null
          major?: string | null
          member_number?: string | null
          phone?: string | null
          position_ar?: string | null
          position_en?: string | null
          recommended_committee_id?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          skills?: string[]
          social_links?: Json
          sort_order?: number
          status?: Database["public"]["Enums"]["member_status"]
          university?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_assigned_committee_id_fkey"
            columns: ["assigned_committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_recommended_committee_id_fkey"
            columns: ["recommended_committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          body_ar: string | null
          body_en: string | null
          cover_image_url: string | null
          created_at: string
          excerpt_ar: string | null
          excerpt_en: string | null
          id: string
          publish_status: Database["public"]["Enums"]["publish_status"]
          published_at: string | null
          slug: string
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          body_ar?: string | null
          body_en?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          id?: string
          publish_status?: Database["public"]["Enums"]["publish_status"]
          published_at?: string | null
          slug: string
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          body_ar?: string | null
          body_en?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          id?: string
          publish_status?: Database["public"]["Enums"]["publish_status"]
          published_at?: string | null
          slug?: string
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body_ar: string | null
          body_en: string | null
          created_at: string
          id: string
          is_read: boolean
          link_url: string | null
          member_id: string
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          body_ar?: string | null
          body_en?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link_url?: string | null
          member_id: string
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          body_ar?: string | null
          body_en?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link_url?: string | null
          member_id?: string
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content_ar: string | null
          content_en: string | null
          created_at: string
          id: string
          publish_status: Database["public"]["Enums"]["publish_status"]
          seo_description_ar: string | null
          seo_description_en: string | null
          slug: string
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          content_ar?: string | null
          content_en?: string | null
          created_at?: string
          id?: string
          publish_status?: Database["public"]["Enums"]["publish_status"]
          seo_description_ar?: string | null
          seo_description_en?: string | null
          slug: string
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          content_ar?: string | null
          content_en?: string | null
          created_at?: string
          id?: string
          publish_status?: Database["public"]["Enums"]["publish_status"]
          seo_description_ar?: string | null
          seo_description_en?: string | null
          slug?: string
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          description_ar: string | null
          description_en: string | null
          id: string
          is_published: boolean
          logo_url: string | null
          name_ar: string
          name_en: string | null
          slug: string
          sort_order: number
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name_ar: string
          name_en?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name_ar?: string
          name_en?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          specialty: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          specialty?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          specialty?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_members: {
        Row: {
          created_at: string
          id: string
          member_id: string
          project_id: string
          role_ar: string | null
          role_en: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          member_id: string
          project_id: string
          role_ar?: string | null
          role_en?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          member_id?: string
          project_id?: string
          role_ar?: string | null
          role_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string | null
          committee_id: string | null
          cover_image_url: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          ended_at: string | null
          external_url: string | null
          id: string
          is_featured: boolean
          publish_status: Database["public"]["Enums"]["publish_status"]
          repo_url: string | null
          slug: string
          sort_order: number
          started_at: string | null
          status: Database["public"]["Enums"]["project_status"]
          summary_ar: string | null
          summary_en: string | null
          tags: string[]
          title_ar: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          committee_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          ended_at?: string | null
          external_url?: string | null
          id?: string
          is_featured?: boolean
          publish_status?: Database["public"]["Enums"]["publish_status"]
          repo_url?: string | null
          slug: string
          sort_order?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          summary_ar?: string | null
          summary_en?: string | null
          tags?: string[]
          title_ar: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          committee_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          ended_at?: string | null
          external_url?: string | null
          id?: string
          is_featured?: boolean
          publish_status?: Database["public"]["Enums"]["publish_status"]
          repo_url?: string | null
          slug?: string
          sort_order?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          summary_ar?: string | null
          summary_en?: string | null
          tags?: string[]
          title_ar?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_committee_id_fkey"
            columns: ["committee_id"]
            isOneToOne: false
            referencedRelation: "committees"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          group_name: string | null
          id: string
          key: string
          updated_at: string
          value_ar: string | null
          value_en: string | null
          value_json: Json | null
        }
        Insert: {
          created_at?: string
          group_name?: string | null
          id?: string
          key: string
          updated_at?: string
          value_ar?: string | null
          value_en?: string | null
          value_json?: Json | null
        }
        Update: {
          created_at?: string
          group_name?: string | null
          id?: string
          key?: string
          updated_at?: string
          value_ar?: string | null
          value_en?: string | null
          value_json?: Json | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_published: boolean
          platform: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_published?: boolean
          platform: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_published?: boolean
          platform?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      statistics: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_published: boolean
          key: string
          label_ar: string
          label_en: string | null
          sort_order: number
          suffix: string | null
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_published?: boolean
          key: string
          label_ar: string
          label_en?: string | null
          sort_order?: number
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_published?: boolean
          key?: string
          label_ar?: string
          label_en?: string | null
          sort_order?: number
          suffix?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      training_hours: {
        Row: {
          activity_ar: string | null
          activity_date: string | null
          activity_en: string | null
          approved_at: string | null
          approved_by: string | null
          course_id: string | null
          created_at: string
          event_id: string | null
          hour_type: Database["public"]["Enums"]["hour_type"]
          hours: number
          id: string
          member_id: string
          notes: string | null
          project_id: string | null
          status: Database["public"]["Enums"]["approval_status"]
          updated_at: string
        }
        Insert: {
          activity_ar?: string | null
          activity_date?: string | null
          activity_en?: string | null
          approved_at?: string | null
          approved_by?: string | null
          course_id?: string | null
          created_at?: string
          event_id?: string | null
          hour_type?: Database["public"]["Enums"]["hour_type"]
          hours: number
          id?: string
          member_id: string
          notes?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["approval_status"]
          updated_at?: string
        }
        Update: {
          activity_ar?: string | null
          activity_date?: string | null
          activity_en?: string | null
          approved_at?: string | null
          approved_by?: string | null
          course_id?: string | null
          created_at?: string
          event_id?: string | null
          hour_type?: Database["public"]["Enums"]["hour_type"]
          hours?: number
          id?: string
          member_id?: string
          notes?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["approval_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_hours_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "academy_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_hours_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_hours_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_member_hours_summary: {
        Args: { _member_id: string }
        Returns: {
          event_hours: number
          other_hours: number
          total_hours: number
          training_hours: number
          volunteer_hours: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_editor: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "member"
      approval_status: "pending" | "approved" | "rejected"
      certificate_type:
        | "course"
        | "event"
        | "volunteer"
        | "appreciation"
        | "other"
      course_level: "beginner" | "intermediate" | "advanced"
      course_mode: "onsite" | "online" | "hybrid"
      course_status:
        | "draft"
        | "soon"
        | "open"
        | "full"
        | "ongoing"
        | "ended"
        | "cancelled"
      event_status:
        | "upcoming"
        | "open"
        | "full"
        | "ongoing"
        | "completed"
        | "cancelled"
      hour_type: "training" | "volunteer" | "event" | "other"
      member_status:
        | "active"
        | "alumni"
        | "pending"
        | "inactive"
        | "rejected"
        | "suspended"
      project_status: "planned" | "in_progress" | "completed" | "on_hold"
      publish_status: "draft" | "published" | "archived"
      registration_status:
        | "pending"
        | "confirmed"
        | "waitlisted"
        | "cancelled"
        | "attended"
        | "absent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "member"],
      approval_status: ["pending", "approved", "rejected"],
      certificate_type: [
        "course",
        "event",
        "volunteer",
        "appreciation",
        "other",
      ],
      course_level: ["beginner", "intermediate", "advanced"],
      course_mode: ["onsite", "online", "hybrid"],
      course_status: [
        "draft",
        "soon",
        "open",
        "full",
        "ongoing",
        "ended",
        "cancelled",
      ],
      event_status: [
        "upcoming",
        "open",
        "full",
        "ongoing",
        "completed",
        "cancelled",
      ],
      hour_type: ["training", "volunteer", "event", "other"],
      member_status: [
        "active",
        "alumni",
        "pending",
        "inactive",
        "rejected",
        "suspended",
      ],
      project_status: ["planned", "in_progress", "completed", "on_hold"],
      publish_status: ["draft", "published", "archived"],
      registration_status: [
        "pending",
        "confirmed",
        "waitlisted",
        "cancelled",
        "attended",
        "absent",
      ],
    },
  },
} as const
