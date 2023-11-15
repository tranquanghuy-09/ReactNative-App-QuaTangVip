import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  StyleSheet,
  Platform
} from "react-native";
import axios from "axios";

export default function App() {
  const [page, setPage] = useState(0);
  const [lsdh, setLsdh] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, [lsdh]);

  const loadOrders = async () => {
    try {
      const result = await axios.get(
        `http://${ipv4}/orders?user_id=1&page=${page}&size=5`
      );
      setOrders(result.data.content);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const groupDataByMonth = (data) => {
    // Code nhóm dữ liệu giữ nguyên từ yêu cầu của bạn
    // ...

    return sortedGroupedOrders;
  };

  const groupedOrders = groupDataByMonth(orders);

  const loadMoreData = async () => {
    try {
      setPage(page + 1);

      const loadUsers = await axios.get(
        `http://${ipv4}/orders?user_id=1&page=${page}&size=5`
      );
      const results = loadUsers.data.content;

      const sumArray = [...orders, ...results];

      const uniqueArray = sumArray.reduce((accumulator, currentValue) => {
        const existingItem = accumulator.find(
          (item) => item.id === currentValue.id
        );
        if (!existingItem) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);

      setOrders(uniqueArray);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>{/* Header content */}</View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Tabs */}
        <View style={styles.tabs}>
          {/* Tab 1 */}
          <TouchableOpacity
            onPress={() => setLsdh(Math.random, setPage(0))}
            style={styles.tabButton}
          >
            <Image
              source={require("../../assets/icons/bag.png")}
              style={styles.tabIcon}
            />
            <Text style={styles.tabText}>Lịch sử đơn hàng</Text>
          </TouchableOpacity>

          {/* Tab 2 */}
          <TouchableOpacity style={styles.tabButton}>
            <Image
              source={require("../../assets/icons/air-conditioner.png")}
              style={styles.tabIcon}
            />
            <Text style={styles.tabText}>Đơn hành dịch vụ tận tâm</Text>
          </TouchableOpacity>
        </View>

        {/* SectionList */}
        <SectionList
          sections={groupedOrders}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.orderItem}>
              <Image
                source={
                  item.store === "Bách Hoá Xanh"
                    ? require("../../assets/icons/bachhoaxanh.png")
                    : null
                }
                style={styles.storeIcon}
              />
              <View style={styles.orderDetails}>
                <View style={styles.orderHeader}>
                  <Text style={styles.storeName}>{item.store}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                <View style={styles.orderTimeContainer}>
                  <Text style={styles.labelText}>Thời gian đặt hàng</Text>
                  <Text style={styles.orderTime}>{item.orderDate}</Text>
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={styles.labelText}>Điểm tích lũy:</Text>
                  <Text style={styles.pointsText}>+{item.diemTichLuy}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { month } }) => (
            <Text style={styles.monthHeader}>Tháng {month}</Text>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.05}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    // Header styles
  },
  mainContent: {
    flex: 5,
    backgroundColor: "rgba(235, 235, 235, 1)"
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 17
  },
  tabButton: {
    flexDirection: "row",
    backgroundColor: "white",
    width: Platform.OS === "ios" ? 165 : 185,
    height: Platform.OS === "ios" ? 50 : 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIcon: {
    width: 28,
    height: 28,
    backgroundColor: "rgba(242, 231, 231, 1)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Platform.OS === "ios" ? 8 : 10
  },
  tabText: {
    fontSize: Platform.OS === "ios" ? 14 : 15,
    color: "#000",
    fontWeight: 400,
    height: 55,
    width: Platform.OS === "ios" ? 120 : 130,
    paddingTop: Platform.OS === "ios" ? 19 : 17
  },
  orderItem: {
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 7,
    flexDirection: "row",
    width: Platform.OS === "ios" ? 345 : 375,
    height: 120,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    alignContent: "center",
    alignItems: "center"
  },
  storeIcon: {
    width: 38,
    height: 38
  },
  orderDetails: {
    width: Platform.OS === "ios" ? 280 : 310,
    paddingTop: 5,
    justifyContent: "space-between"
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statusBadge: {
    width: 120,
    height: 20,
    backgroundColor: "rgba(225, 244, 228, 1)",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  statusText: {
    color: "rgba(115, 183, 115, 1)"
  },
  storeName: {
    color: "rgba(30, 66, 127, 1)",
    fontSize: 16,
    fontWeight: 400
  },
  orderTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  labelText: {
    color: "rgba(152, 152, 152, 1)",
    fontSize: 15,
    fontWeight: 400
  },
  orderTime: {
    color: "rgba(142, 142, 142, 1)",
    fontSize: 14,
    fontWeight: 400
  },
  pointsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pointsText: {
    color: "rgba(90, 168, 89, 1)",
    fontSize: 20,
    fontWeight: 400
  },
  monthHeader: {
    fontSize: 22,
    color: "rgba(42, 97, 199, 1)",
    marginTop: 25
  }
});
