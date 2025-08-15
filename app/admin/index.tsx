import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { products } from '@/lib/products';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin } = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  if (!user || !isAdmin()) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.unauthorized}>
          <IconSymbol name="lock.shield" size={80} color="#FF3B30" />
          <ThemedText style={styles.unauthorizedTitle}>Access Denied</ThemedText>
          <ThemedText style={styles.unauthorizedText}>
            You don't have permission to access the admin panel
          </ThemedText>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            size="large"
          />
        </View>
      </ThemedView>
    );
  }

  const handleAddProduct = () => {
    router.push('/admin/add-product' as any);
  };

  const handleManageProducts = () => {
    router.push('/admin/products' as any);
  };

  const handleViewOrders = () => {
    Alert.alert('Orders', 'Order management feature coming soon!');
  };

  const handleViewAnalytics = () => {
    Alert.alert('Analytics', 'Analytics dashboard coming soon!');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Admin Dashboard</ThemedText>
        <ThemedText style={styles.welcomeText}>
          Welcome back, {user?.email}
        </ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>{products.length}</ThemedText>
              <ThemedText style={styles.statLabel}>Total Products</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {products.filter(p => p.inStock).length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>In Stock</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>
                {products.filter(p => !p.inStock).length}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Out of Stock</ThemedText>
            </View>
          </View>
        </Card>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={handleAddProduct}>
            <View style={styles.actionIcon}>
              <IconSymbol name="plus.circle.fill" size={40} color="#007AFF" />
            </View>
            <ThemedText style={styles.actionTitle}>Add Product</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Create new products with AI-powered description enhancement
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleManageProducts}>
            <View style={styles.actionIcon}>
              <IconSymbol name="bag.fill" size={40} color="#34C759" />
            </View>
            <ThemedText style={styles.actionTitle}>Manage Products</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Edit, delete, and update existing products
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleViewOrders}>
            <View style={styles.actionIcon}>
              <IconSymbol name="doc.text.fill" size={40} color="#FF9500" />
            </View>
            <ThemedText style={styles.actionTitle}>Orders</ThemedText>
            <ThemedText style={styles.actionDescription}>
              View and manage customer orders
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleViewAnalytics}>
            <View style={styles.actionIcon}>
              <IconSymbol name="chart.bar.fill" size={40} color="#AF52DE" />
            </View>
            <ThemedText style={styles.actionTitle}>Analytics</ThemedText>
            <ThemedText style={styles.actionDescription}>
              View sales and performance metrics
            </ThemedText>
          </TouchableOpacity>
        </View>

        <Card style={styles.aiFeatureCard}>
          <View style={styles.aiHeader}>
            <IconSymbol name="sparkles" size={24} color="#FFD700" />
            <ThemedText style={styles.aiTitle}>AI-Powered Features</ThemedText>
          </View>
          <ThemedText style={styles.aiDescription}>
            Enhance your product descriptions with our advanced AI technology. 
            Get better SEO, more engaging content, and improved conversion rates.
          </ThemedText>
          <Button
            title="Try AI Enhancement"
            onPress={handleAddProduct}
            variant="primary"
            size="medium"
            style={styles.aiButton}
          />
        </Card>
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
  welcomeText: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsCard: {
    marginTop: 20,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
  },
  aiFeatureCard: {
    marginBottom: 40,
    backgroundColor: '#F0F8FF',
    borderColor: '#007AFF',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    marginLeft: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 16,
  },
  aiButton: {
    alignSelf: 'flex-start',
  },
  unauthorized: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  unauthorizedTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    color: '#FF3B30',
  },
  unauthorizedText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
}); 