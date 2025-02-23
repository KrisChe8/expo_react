import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//  GET ALL
export const useProductList = () => {
  return useQuery({
    // by this key - once data were got -> ttey are cashed - no need to take them from bd again
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// GET BY ID
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// INSERT/CREATE
export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      // to refresh data after inserting:
      await queryClient.invalidateQueries(["products"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

// UPDATE
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      console.log(data.id);
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq("id", data.idNum)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      // to refresh data after inserting:
      await queryClient.invalidateQueries(["products"]);
      await queryClient.invalidateQueries(["products", id]);
    },
    onError(error) {
      console.log(error);
    },
  });
};

// DELETE
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      // to refresh data after inserting:
      await queryClient.invalidateQueries(["products"]);
    },
  });
};
