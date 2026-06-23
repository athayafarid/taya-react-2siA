import { supabase } from "@/lib/supabase";

const profileColumns = "id, auth_user_id, full_name, email, role, tier, points, created_at, updated_at";

export const profileService = {
  async getCurrentProfile(authUserId) {
    const { data, error } = await supabase
      .from("profiles")
      .select(profileColumns)
      .eq("auth_user_id", authUserId)
      .single();

    if (error) throw error;
    return data;
  },

  async getAllProfiles() {
    const { data, error } = await supabase
      .from("profiles")
      .select(profileColumns)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getProfileById(id) {
    const { data, error } = await supabase
      .from("profiles")
      .select(profileColumns)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(id, payload) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", id)
      .select(profileColumns)
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProfile(id) {
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) throw error;
  },
};
