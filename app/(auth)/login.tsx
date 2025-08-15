import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const success = await login(email.trim(), password);
      if (success) {
        router.replace('/(tabs)' as any);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    router.push('/(auth)/signup' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>
        </View>

        <Card style={styles.formCard}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error && !email.trim() ? 'Email is required' : undefined}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={error && !password.trim() ? 'Password is required' : undefined}
          />

          {error && (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          )}

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />
        </Card>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Don't have an account? </ThemedText>
          <TouchableOpacity onPress={handleSignup}>
            <ThemedText style={styles.footerLink}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.demoSection}>
          <Card style={styles.demoCard}>
            <ThemedText style={styles.demoTitle}>Demo Credentials</ThemedText>
            <ThemedText style={styles.demoText}>
              <ThemedText style={styles.demoLabel}>Admin:</ThemedText> admin@shopswift.com / admin123{'\n'}
              <ThemedText style={styles.demoLabel}>User:</ThemedText> user@shopswift.com / user123
            </ThemedText>
          </Card>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
    marginBottom: 24,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  footerLink: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  demoSection: {
    marginBottom: 40,
  },
  demoCard: {
    padding: 16,
    backgroundColor: '#F0F8FF',
    borderColor: '#007AFF',
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  demoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
  demoLabel: {
    fontWeight: '600',
    color: '#007AFF',
  },
});
 