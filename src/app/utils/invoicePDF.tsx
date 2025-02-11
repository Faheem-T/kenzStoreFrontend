import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { GetUserOrder } from "../types/order";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#1F0808", // dark background matching theme
    padding: 40,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#120303", // paper color
    borderRadius: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#F7E0E0", // text primary
    textAlign: "center",
    textTransform: "uppercase",
    borderBottom: "2px solid #910D0D", // primary main
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#F7E0E0", // text primary
    borderBottom: "1px solid #834620", // secondary main
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#F7E0E0", // text primary
    lineHeight: 1.4,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1px solid #834620", // secondary main
  },
  itemImage: {
    width: 60,
    height: 60,
    padding: 10,
    objectFit: "cover",
    borderRadius: 4,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F7E0E0", // text primary
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#CE8B37", // accent main
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    paddingTop: 15,
    borderTop: "2px solid #910D0D", // primary main
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F7E0E0", // text primary
    marginRight: 20,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CE8B37", // accent main
  },
  discountSection: {
    backgroundColor: "#1a0606", // slightly lighter than paper
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderLeft: "3px solid #910D0D", // primary main
  },
  paymentSection: {
    backgroundColor: "#1a0606", // slightly lighter than paper
    padding: 15,
    borderRadius: 5,
    borderLeft: "3px solid #834620", // secondary main
  },
});

export const InvoiceDocument = ({ order }: { order: GetUserOrder }) => {
  const {
    address,
    coupon,
    discountType,
    discountValue,
    items,
    paymentMethod,
    totalPrice,
  } = order;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice</Text>

        {/* Customer Address Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Shipping Address</Text>
          <Text style={styles.text}>{address.address_line}</Text>
          <Text style={styles.text}>
            {address.city}, {address.state} {address.pincode}
          </Text>
        </View>

        {/* Order Items Section */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>Order Details</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Image
                source={item.productId.images[0]}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.productId.name}</Text>
              </View>
              <Text style={styles.itemPrice}>QR {item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Discount Section */}
        {coupon && (
          <View style={styles.discountSection}>
            <Text style={styles.subHeader}>Discount Applied</Text>
            <Text style={styles.text}>Coupon Code: {coupon}</Text>
            <Text style={styles.text}>
              Discount Amount:{" "}
              {discountType === "percentage"
                ? `${discountValue}%`
                : `QR ${discountValue.toFixed(2)}`}
            </Text>
          </View>
        )}

        {/* Payment Method Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.subHeader}>Payment Method</Text>
          <Text style={styles.text}>{paymentMethod}</Text>
        </View>

        {/* Total Price Section */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>QR {totalPrice.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};
