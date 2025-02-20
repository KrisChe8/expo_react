import Colors from "@/src/constants/Colors";
import { Order } from "@/src/types";

import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import dayjs from "dayjs";

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const timeNow = dayjs();
  const created = timeNow.diff(order.created_at, "hours");

  // to get info how we are logged in as admin or user:useSegments()-> returns path arr like ["(admin)", "menu", "[id]"]
  const segments = useSegments();
  const role = segments[0];

  return (
    <Link href={`/${role}/orders/${order.id}`}>
      <View style={styles.container}>
        <View style={styles.columnWrapper}>
          <Text style={styles.orderN}>Order #{order.id}</Text>

          <Text style={styles.time}>
            {created} {Number(created) == 1 ? "hour" : "hours"} ago
          </Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    paddingBlock: 15,
    borderRadius: 5,
    width: "100%",
  },
  columnWrapper: {
    flexDirection: "column",
  },
  time: {
    color: "grey",
  },
  orderN: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 6,
  },
  status: {
    fontWeight: "500",
  },
});

export default OrderListItem;
