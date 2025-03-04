import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { GetUserOrder } from "../types/order";
import { themeOptions } from "@/theme";

const backgroundDefault = themeOptions.palette?.background
  ? themeOptions.palette.background.default
  : "white";
const backgroundPaper = themeOptions.palette?.background
  ? themeOptions.palette.background.paper
  : "white";

const textPrimary = themeOptions.palette?.text
  ? themeOptions.palette.text.primary
  : "black";

const styles = StyleSheet.create({
  page: {
    // backgroundColor: "#1F0808", // dark background matching theme
    backgroundColor: backgroundDefault,
    padding: 40,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    // backgroundColor: "#120303", // paper color
    backgroundColor: backgroundPaper,
    borderRadius: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: textPrimary,
    textAlign: "center",
    textTransform: "uppercase",
    borderBottom: "2px solid #910D0D", // primary main
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: textPrimary,
    borderBottom: "1px solid #834620", // secondary main
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: textPrimary,
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
    color: textPrimary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#CE8B37", // accent main
  },
  totalRow: {
    flexDirection: "column",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 20,
    paddingTop: 15,
    borderTop: "2px solid #910D0D", // primary main
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: textPrimary,
    marginRight: 20,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CE8B37", // accent main
  },
  discountSection: {
    // backgroundColor: "#1a0606", // slightly lighter than paper
    backgroundColor: backgroundDefault,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderLeft: "3px solid #910D0D", // primary main
  },
  paymentSection: {
    // backgroundColor: "#1a0606", // slightly lighter than paper
    backgroundColor: backgroundDefault,
    padding: 15,
    borderRadius: 5,
    borderLeft: "3px solid #834620", // secondary main
  },
  subText: {
    fontSize: 10,
    // color: "#",
  },
});

const InvoiceDocument = ({ order }: { order: GetUserOrder }) => {
  const {
    address,
    coupon,
    discountType,
    discountValue,
    items,
    paymentMethod,
    originalPrice,
    totalPrice,
  } = order;
  console.log(order);

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
                <Text style={styles.itemName}>
                  {item.productId.name}{" "}
                  <Text style={{ ...styles.itemName, fontSize: 8 }}>
                    x {item.quantity}
                  </Text>
                </Text>
              </View>
              <Text style={styles.itemPrice}>₹ {item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Discount Section */}
        {/* {coupon && (
          <View style={styles.discountSection}>
            <Text style={styles.subHeader}>Discount Applied</Text>
            <Text style={styles.text}>Coupon Code: {coupon}</Text>
            <Text style={styles.text}>
              Discount Amount:{" "}
              {discountType === "percentage"
                ? `${discountValue}%`
                : `₹ ${discountValue.toFixed(2)}`}
            </Text>
          </View>
        )} */}

        {/* Payment Method Section */}
        <View style={styles.paymentSection}>
          <Text style={styles.subHeader}>Payment Method</Text>
          <Text style={styles.text}>{paymentMethod}</Text>
        </View>

        {/* Total Price Section */}
        <View style={styles.totalRow}>
          <Text style={styles.subText}>
            Order Total: {originalPrice}
            {" ₹"}
          </Text>
          <Text style={{ ...styles.subText, color: coupon ? "black" : "gray" }}>
            Coupon Discount: {(totalPrice - originalPrice).toFixed(2)}
            {" ₹ "}
            <Text>
              ({-discountValue}
              {discountType === "percentage" ? "%" : "₹"})
            </Text>
          </Text>
          <Text style={styles.totalLabel}>
            Total Amount:{" "}
            <Text style={{ ...styles.totalAmount }}>
              ₹ {totalPrice.toFixed(2)}
            </Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export default InvoiceDocument;
