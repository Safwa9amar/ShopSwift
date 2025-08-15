import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/(auth)/login' as any);
  };

  const handleAdminAccess = () => {
    router.push('/admin' as any);
  };

  const handleLogin = () => {
    router.push('/(auth)/login' as any);
  };

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Profile</ThemedText>
        </View>
        <View style={styles.guestState}>
          <IconSymbol name="person.circle" size={80} color="#8E8E93" />
          <ThemedText style={styles.guestTitle}>Welcome Guest</ThemedText>
          <ThemedText style={styles.guestText}>
            Sign in to access your profile and manage your account
          </ThemedText>
          <Button
            title="Sign In"
            onPress={handleLogin}
            variant="primary"
            size="large"
            style={styles.guestButton}
          />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <ThemedText style={styles.avatar}>
                {user.email.charAt(0).toUpperCase()}
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.profileName}>{user.email}</ThemedText>
              <ThemedText style={styles.profileRole}>
                {user.isAdmin ? 'Administrator' : 'Customer'}
              </ThemedText>
            </View>
          </View>
        </Card>

        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="person" size={24} color="#007AFF" />
            <ThemedText style={styles.menuText}>Edit Profile</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="location" size={24} color="#007AFF" />
            <ThemedText style={styles.menuText}>Shipping Addresses</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="creditcard" size={24} color="#007AFF" />
            <ThemedText style={styles.menuText}>Payment Methods</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="doc.text" size={24} color="#007AFF" />
            <ThemedText style={styles.menuText}>Order History</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </Card>

        {isAdmin() && (
          <Card style={styles.adminCard}>
            <ThemedText style={styles.adminTitle}>Admin Panel</ThemedText>
            <ThemedText style={styles.adminText}>
              Access administrative features and manage products
            </ThemedText>
            <Button
              title="Go to Admin Panel"
              onPress={handleAdminAccess}
              variant="outline"
              size="medium"
              style={styles.adminButton}
            />
          </Card>
        )}

        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="gear" size={24} color="#007AFF" />
            <ThemedText style={styles.menuText}>Settings</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol name="questionmark.circle" size={24} color="#007AFF" />
            <ThemedText style={styles.menuText}>Help & Support</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </Card>

        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="secondary"
          size="large"
          style={styles.logoutButton}
        />
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
  guestState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  guestText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  guestButton: {
    minWidth: 200,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    marginTop: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  avatar: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#8E8E93',
  },
  menuCard: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  adminCard: {
    marginBottom: 20,
    backgroundColor: '#F0F8FF',
    borderColor: '#007AFF',
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#007AFF',
  },
  adminText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
    lineHeight: 20,
  },
  adminButton: {
    alignSelf: 'flex-start',
  },
  settingsCard: {
    marginBottom: 20,
  },
  logoutButton: {
    marginBottom: 30,
  },
}); 