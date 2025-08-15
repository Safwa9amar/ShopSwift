import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    // In a real app, this would process the payment and create the order
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    router.replace('/(tabs)' as any);
  };

  const handleBackToCart = () => {
    router.back();
  };

  if (items.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>Your cart is empty</ThemedText>
          <Button
            title="Continue Shopping"
            onPress={() => router.replace('/(tabs)/products' as any)}
            variant="primary"
            size="large"
          />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Checkout</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.orderSummary}>
          <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>
          {items.map((item) => (
            <View key={item.product.id} style={styles.orderItem}>
              <ThemedText style={styles.itemName} numberOfLines={1}>
                {item.product.name} x {item.quantity}
              </ThemedText>
              <ThemedText style={styles.itemPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </ThemedText>
            </View>
          ))}
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Total:</ThemedText>
            <ThemedText style={styles.totalAmount}>
              ${getTotalPrice().toFixed(2)}
            </ThemedText>
          </View>
        </Card>

        <Card style={styles.shippingSection}>
          <ThemedText style={styles.sectionTitle}>Shipping Information</ThemedText>
          
          <View style={styles.row}>
            <Input
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              error={errors.firstName}
              style={styles.halfInput}
            />
            <Input
              label="Last Name"
              placeholder="Enter last name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              error={errors.lastName}
              style={styles.halfInput}
            />
          </View>

          <Input
            label="Email"
            placeholder="Enter email address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <Input
            label="Address"
            placeholder="Enter street address"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            error={errors.address}
          />

          <View style={styles.row}>
            <Input
              label="City"
              placeholder="Enter city"
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
              error={errors.city}
              style={styles.halfInput}
            />
            <Input
              label="State"
              placeholder="Enter state"
              value={formData.state}
              onChangeText={(value) => handleInputChange('state', value)}
              error={errors.state}
              style={styles.halfInput}
            />
          </View>

          <Input
            label="ZIP Code"
            placeholder="Enter ZIP code"
            value={formData.zipCode}
            onChangeText={(value) => handleInputChange('zipCode', value)}
            keyboardType="numeric"
            error={errors.zipCode}
          />
        </Card>

        <Card style={styles.paymentSection}>
          <ThemedText style={styles.sectionTitle}>Payment Information</ThemedText>
          
          <Input
            label="Card Number"
            placeholder="Enter card number"
            value={formData.cardNumber}
            onChangeText={(value) => handleInputChange('cardNumber', value)}
            keyboardType="numeric"
            error={errors.cardNumber}
          />

          <View style={styles.row}>
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChangeText={(value) => handleInputChange('expiryDate', value)}
              error={errors.expiryDate}
              style={styles.halfInput}
            />
            <Input
              label="CVV"
              placeholder="Enter CVV"
              value={formData.cvv}
              onChangeText={(value) => handleInputChange('cvv', value)}
              keyboardType="numeric"
              error={errors.cvv}
              style={styles.halfInput}
            />
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Back to Cart"
            onPress={handleBackToCart}
            variant="outline"
            size="large"
            style={styles.backButton}
          />
          <Button
            title="Place Order"
            onPress={handlePlaceOrder}
            variant="primary"
            size="large"
            style={styles.placeOrderButton}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderSummary: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    marginRight: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  shippingSection: {
    marginBottom: 20,
  },
  paymentSection: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  backButton: {
    flex: 1,
    marginRight: 12,
  },
  placeOrderButton: {
    flex: 1,
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 20,
    textAlign: 'center',
  },
}); 