import { supabase } from "@/lib/supabase";

const productColumns = "id, name, description, price, stock, image_url, created_at, updated_at";

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select(productColumns)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getProductById(id) {
    const { data, error } = await supabase
      .from("products")
      .select(productColumns)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createProduct(payload) {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select(productColumns)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id, payload) {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select(productColumns)
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};
