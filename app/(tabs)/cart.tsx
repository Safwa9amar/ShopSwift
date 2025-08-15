import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    router.push('/checkout' as any);
  };

  const handleContinueShopping = () => {
    router.push('/(tabs)/products' as any);
  };

  if (items.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.emptyHeader}>
          <ThemedText type="title">Your Cart</ThemedText>
        </View>
        <View style={styles.emptyState}>
          <IconSymbol name="cart" size={80} color="#8E8E93" />
          <ThemedText style={styles.emptyStateTitle}>Your cart is empty</ThemedText>
          <ThemedText style={styles.emptyStateText}>
            Add some products to get started
          </ThemedText>
          <Button
            title="Start Shopping"
            onPress={handleContinueShopping}
            variant="primary"
            size="large"
            style={styles.emptyStateButton}
          />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Your Cart</ThemedText>
        <TouchableOpacity onPress={clearCart}>
          <ThemedText style={styles.clearCartText}>Clear All</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <Card key={item.product.id} style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
              <ThemedText style={styles.itemImage}>🛍️</ThemedText>
            </View>
            <View style={styles.itemDetails}>
              <ThemedText style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </ThemedText>
              <ThemedText style={styles.itemPrice}>
                ${item.product.price.toFixed(2)}
              </ThemedText>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                >
                  <ThemedText style={styles.quantityButtonText}>-</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.product.id)}
            >
              <IconSymbol name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Subtotal:</ThemedText>
            <ThemedText style={styles.summaryValue}>
              ${getTotalPrice().toFixed(2)}
            </ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Total:</ThemedText>
            <ThemedText style={styles.summaryTotal}>
              ${getTotalPrice().toFixed(2)}
            </ThemedText>
          </View>
          <Button
            title="Proceed to Checkout"
            onPress={handleCheckout}
            variant="primary"
            size="large"
            style={styles.checkoutButton}
          />
        </Card>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  clearCartText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  emptyStateButton: {
    minWidth: 200,
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemImage: {
    fontSize: 24,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  summaryCard: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  checkoutButton: {
    marginTop: 16,
  },
}); 