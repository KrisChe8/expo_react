import { supabase } from "@/src/lib/supabase";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "../../types";

// INSERT/CREATE
export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { error, data: newOrder } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },

    onError(error) {
      console.log(error);
    },
  });
};
