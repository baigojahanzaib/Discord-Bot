export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          channel_id: string
          content: string
          created_at: string | null
          created_by: string
          id: string
          image_url: string | null
          scheduled_for: string | null
          server_id: string | null
          title: string
        }
        Insert: {
          channel_id: string
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          image_url?: string | null
          scheduled_for?: string | null
          server_id?: string | null
          title: string
        }
        Update: {
          channel_id?: string
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          image_url?: string | null
          scheduled_for?: string | null
          server_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      automod_settings: {
        Row: {
          banned_words: string[] | null
          created_at: string | null
          id: string
          max_links: number | null
          max_mentions: number | null
          server_id: string | null
          trusted_domains: string[] | null
          updated_at: string | null
        }
        Insert: {
          banned_words?: string[] | null
          created_at?: string | null
          id?: string
          max_links?: number | null
          max_mentions?: number | null
          server_id?: string | null
          trusted_domains?: string[] | null
          updated_at?: string | null
        }
        Update: {
          banned_words?: string[] | null
          created_at?: string | null
          id?: string
          max_links?: number | null
          max_mentions?: number | null
          server_id?: string | null
          trusted_domains?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automod_settings_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: true
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_commands: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      command_logs: {
        Row: {
          command_id: string | null
          error_message: string | null
          executed_at: string | null
          id: string
          server_id: string | null
          success: boolean | null
          user_id: string
          username: string
        }
        Insert: {
          command_id?: string | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          server_id?: string | null
          success?: boolean | null
          user_id: string
          username: string
        }
        Update: {
          command_id?: string | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          server_id?: string | null
          success?: boolean | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "command_logs_command_id_fkey"
            columns: ["command_id"]
            isOneToOne: false
            referencedRelation: "bot_commands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "command_logs_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      discord_servers: {
        Row: {
          id: string
          is_active: boolean | null
          joined_at: string | null
          prefix: string
          server_id: string
          server_name: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          prefix?: string
          server_id: string
          server_name: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          prefix?: string
          server_id?: string
          server_name?: string
        }
        Relationships: []
      }
      giveaways: {
        Row: {
          channel_id: string
          created_at: string | null
          created_by: string
          description: string | null
          ends_at: string
          id: string
          message_id: string | null
          prize: string
          server_id: string | null
          status: string | null
          winner_count: number | null
        }
        Insert: {
          channel_id: string
          created_at?: string | null
          created_by: string
          description?: string | null
          ends_at: string
          id?: string
          message_id?: string | null
          prize: string
          server_id?: string | null
          status?: string | null
          winner_count?: number | null
        }
        Update: {
          channel_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          ends_at?: string
          id?: string
          message_id?: string | null
          prize?: string
          server_id?: string | null
          status?: string | null
          winner_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "giveaways_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          discord_id: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          discord_id?: string | null
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          discord_id?: string | null
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      server_logs: {
        Row: {
          created_at: string | null
          event_data: Json
          event_type: string
          id: string
          server_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data: Json
          event_type: string
          id?: string
          server_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json
          event_type?: string
          id?: string
          server_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "server_logs_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_self_assignable: boolean | null
          role_id: string
          role_name: string
          server_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_self_assignable?: boolean | null
          role_id: string
          role_name: string
          server_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_self_assignable?: boolean | null
          role_id?: string
          role_name?: string
          server_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "server_roles_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          author_id: string
          author_name: string
          content: string
          created_at: string | null
          id: string
          ticket_id: string | null
        }
        Insert: {
          author_id: string
          author_name: string
          content: string
          created_at?: string | null
          id?: string
          ticket_id?: string | null
        }
        Update: {
          author_id?: string
          author_name?: string
          content?: string
          created_at?: string | null
          id?: string
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          channel_id: string
          closed_at: string | null
          closed_by: string | null
          created_at: string | null
          creator_id: string
          creator_name: string
          id: string
          server_id: string | null
          status: string | null
          subject: string
        }
        Insert: {
          channel_id: string
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string | null
          creator_id: string
          creator_name: string
          id?: string
          server_id?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          channel_id?: string
          closed_at?: string | null
          closed_by?: string | null
          created_at?: string | null
          creator_id?: string
          creator_name?: string
          id?: string
          server_id?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "discord_servers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
