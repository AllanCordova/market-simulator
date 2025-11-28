import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import { formatPrice, parsePrice } from "@/utils/formatPrice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PurchaseModalProps {
  visible: boolean;
  product: {
    name: string;
    image: string;
    price: string;
  } | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PurchaseModal({
  visible,
  product,
  onClose,
  onConfirm,
}: PurchaseModalProps) {
  const { theme, amount } = useAppContext();

  if (!product) return null;

  const priceNumber = parsePrice(product.price);
  const hasEnoughBalance = amount >= priceNumber;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            Confirmar Compra
          </Text>

          <Image
            source={{ uri: product.image }}
            style={styles.modalImage}
            resizeMode="cover"
          />
          <Text style={[styles.modalProductName, { color: theme.text }]}>
            {product.name}
          </Text>
          <View style={styles.modalPriceContainer}>
            <Text style={[styles.modalPriceLabel, { color: theme.text }]}>
              Preço:
            </Text>
            <Text style={[styles.modalPrice, { color: theme.priceText }]}>
              R$ {product.price}
            </Text>
          </View>
          <View style={styles.modalBalanceContainer}>
            <Text style={[styles.modalBalanceLabel, { color: theme.text }]}>
              Saldo atual:
            </Text>
            <Text
              style={[
                styles.modalBalance,
                {
                  color: hasEnoughBalance ? theme.priceText : "#FF5252",
                },
              ]}
            >
                    R$ {formatPrice(amount)}
            </Text>
          </View>
          {!hasEnoughBalance && (
            <View
              style={[
                styles.insufficientBalance,
                { backgroundColor: "#FF525220" },
              ]}
            >
              <MaterialIcons
                name="warning"
                size={20}
                color="#FF5252"
                style={styles.warningIcon}
              />
              <Text style={[styles.insufficientText, { color: "#FF5252" }]}>
                Saldo insuficiente!
              </Text>
            </View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.modalButton,
                styles.modalButtonCancel,
                { borderColor: theme.inputBorder },
              ]}
            >
              <Text style={[styles.modalButtonText, { color: theme.text }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              disabled={!hasEnoughBalance}
              style={[
                styles.modalButton,
                styles.modalButtonConfirm,
                {
                  backgroundColor: hasEnoughBalance
                    ? theme.buttonBackground
                    : theme.inputBorder,
                  opacity: hasEnoughBalance ? 1 : 0.5,
                },
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  {
                    color: hasEnoughBalance
                      ? theme.buttonText
                      : theme.inputPlaceholder,
                  },
                ]}
              >
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: stylesRoot.spacing.m,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: stylesRoot.radius.l,
    padding: stylesRoot.spacing.l,
    gap: stylesRoot.spacing.m,
  },
  modalTitle: {
    fontSize: stylesRoot.fontSize.xl,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: stylesRoot.radius.m,
  },
  modalProductName: {
    fontSize: stylesRoot.fontSize.l,
    fontWeight: "600",
    textAlign: "center",
  },
  modalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: stylesRoot.spacing.s,
  },
  modalPriceLabel: {
    fontSize: stylesRoot.fontSize.m,
  },
  modalPrice: {
    fontSize: stylesRoot.fontSize.l,
    fontWeight: "bold",
  },
  modalBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: stylesRoot.spacing.s,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  modalBalanceLabel: {
    fontSize: stylesRoot.fontSize.m,
  },
  modalBalance: {
    fontSize: stylesRoot.fontSize.l,
    fontWeight: "bold",
  },
  insufficientBalance: {
    flexDirection: "row",
    alignItems: "center",
    padding: stylesRoot.spacing.s,
    borderRadius: stylesRoot.radius.m,
    gap: stylesRoot.spacing.xs,
  },
  warningIcon: {
    marginRight: stylesRoot.spacing.xs,
  },
  insufficientText: {
    fontSize: stylesRoot.fontSize.s,
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    gap: stylesRoot.spacing.m,
    marginTop: stylesRoot.spacing.s,
  },
  modalButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: stylesRoot.radius.m,
  },
  modalButtonCancel: {
    borderWidth: 1,
  },
  modalButtonConfirm: {},
  modalButtonText: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

