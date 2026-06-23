import { supabase } from "@/lib/supabase";

export const MEMBERSHIP_TIERS = [
  { tier: "bronze", minimumPoints: 0, benefit: "5%" },
  { tier: "silver", minimumPoints: 500, benefit: "10%" },
  { tier: "gold", minimumPoints: 1500, benefit: "15%" },
  { tier: "platinum", minimumPoints: 3000, benefit: "20%" },
];

export function calculateTier(points = 0) {
  if (points >= 3000) return "platinum";
  if (points >= 1500) return "gold";
  if (points >= 500) return "silver";
  return "bronze";
}

export function calculateEarnedPoints(totalAmount = 0) {
  return Math.floor(Number(totalAmount) / 10000);
}

export const membershipService = {
  async getPointHistories() {
    const { data, error } = await supabase
      .from("point_histories")
      .select("id, user_id, order_id, points, description, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async adjustPoints({ userId, points, description = "Manual point adjustment" }) {
    const { data, error } = await supabase
      .from("point_histories")
      .insert({
        user_id: userId,
        points,
        description,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
