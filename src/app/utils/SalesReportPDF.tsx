import dayjs from "dayjs";
import { SalesReportBody } from "../api/adminDashboardApi";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#1F0808",
    padding: 40,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#120303",
    borderRadius: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#F7E0E0",
    textAlign: "center",
    textTransform: "uppercase",
    borderBottom: "2px solid #910D0D",
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#F7E0E0",
    borderBottom: "1px solid #834620",
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#F7E0E0",
    lineHeight: 1.4,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CE8B37",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1px solid #834620",
  },
  column: {
    flex: 1,
  },
  chart: {
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  barChart: {
    flexDirection: "row",
    height: 150,
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 20,
  },
  bar: {
    width: 30,
    marginRight: 15,
    backgroundColor: "#910D0D",
  },
  barLabel: {
    fontSize: 6,
    color: "#F7E0E0",
    textAlign: "center",
    marginTop: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "2px solid #834620",
    paddingBottom: 5,
  },
  orderHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#CE8B37",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1px solid #834620",
  },
});

// interface SalesReportProps {
//   data: {
//     totalSalesCount: number;
//     totalSaleAmount: number;
//     orderCountByTimeframe: Array<{
//       _id: string;
//       count: number;
//     }>;
//     topSellingProducts: Array<{
//       _id: string;
//       count: number;
//     }>;
//     topSellingCategories: Array<{
//       _id: {
//         name: string;
//       };
//       count: number;
//     }>;
//     topSellingBrands: Array<{
//       _id: string;
//       count: number;
//     }>;
//   };
// }

export const SalesReportPDF = ({ data }: { data: SalesReportBody["data"] }) => {
  console.log(data);

  // export const SalesReportPDF = ({ data }: SalesReportProps) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return `QR ${amount.toFixed(2)}`;
  };

  // Get max count for scaling bars
  const maxOrderCount = Math.max(
    ...data.orderCountByTimeframe.map((item) => item.count)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Sales Report</Text>

        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Overview</Text>
          <Text style={styles.highlightText}>
            Total Sales: {formatCurrency(data.totalSaleAmount)}
          </Text>
          <Text style={styles.highlightText}>
            Total Orders: {data.totalSalesCount}
          </Text>
          <Text style={styles.highlightText}>
            Average Order Value:{" "}
            {formatCurrency(data.totalSaleAmount / data.totalSalesCount)}
          </Text>
        </View>

        {/* Daily Orders Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Order Distribution</Text>
          <View style={styles.barChart}>
            {data.orderCountByTimeframe.map((day, index) => (
              <View key={index}>
                <View
                  style={[
                    styles.bar,
                    { height: (day.count / maxOrderCount) * 130 },
                  ]}
                />
                <Text style={styles.barLabel}>{day._id}</Text>
                <Text style={styles.barLabel}>{day.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Top Categories Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Top Categories</Text>
          {data.topSellingCategories.map((category, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.text}>{category._id.name}</Text>
              <Text style={styles.text}>{category.count} orders</Text>
            </View>
          ))}
        </View>

        {/* Top Brands Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Top Brands</Text>
          {data.topSellingBrands.map((brand, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.text}>{brand._id}</Text>
              <Text style={styles.text}>{brand.count} orders</Text>
            </View>
          ))}
        </View>
        {/* Recent Orders Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Order Details</Text>
          <View style={styles.orderHeader}>
            <Text style={[styles.orderHeaderText, { flex: 2 }]}>Date</Text>
            <Text style={[styles.orderHeaderText, { flex: 1 }]}>Customer</Text>
            <Text style={[styles.orderHeaderText, { flex: 1 }]}>Payment</Text>
            <Text style={[styles.orderHeaderText, { flex: 1 }]}>Amount</Text>
          </View>
          {data.orders.map((order, index) => (
            <View key={index} style={styles.orderRow}>
              <Text style={[styles.text, { flex: 2 }]}>
                {dayjs(order.completedAt).format("D MMM YY")}
              </Text>
              <Text style={[styles.text, { flex: 1 }]}>
                {order.userId.firstName}
              </Text>
              <Text style={[styles.text, { flex: 1 }]}>
                {order.paymentMethod}
              </Text>
              <Text style={[styles.text, { flex: 1 }]}>
                {formatCurrency(order.totalPrice)}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Methods Distribution */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Key Insights</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                • Most active day:{" "}
                {
                  data.orderCountByTimeframe.reduce((max, current) =>
                    current.count > max.count ? current : max
                  )._id
                }
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                • Top selling category: {data.topSellingCategories[0]._id.name}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                • Leading brand: {data.topSellingBrands[0]._id}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
