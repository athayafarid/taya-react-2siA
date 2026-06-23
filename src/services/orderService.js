import { supabase } from "@/lib/supabase";

const orderSelect = `
  id,
  user_id,
  order_number,
  total_amount,
  earned_points,
  status,
  created_at,
  updated_at,
  profiles:profiles(id, full_name, email, tier, points),
  order_items(
    id,
    product_id,
    quantity,
    unit_price,
    subtotal,
    products:products(id, name, image_url)
  )
`;

export const orderService = {
  async getOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(orderSelect)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOrderById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select(orderSelect)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createOrder({ userId, items }) {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ user_id: userId, status: "pending" })
      .select("id")
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: Number(item.quantity),
      unit_price: Number(item.unit_price),
      subtotal: Number(item.quantity) * Number(item.unit_price),
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw itemsError;

    return this.getOrderById(order.id);
  },

  async updateOrderStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select(orderSelect)
      .single();

    if (error) throw error;
    return data;
  },

  async deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },
};
