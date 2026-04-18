/**
 * Auth Route Layout - Wraps all auth screens.
 *
 * Uses a Stack navigator for auth flow screens.
 * Header is shown for individual screens (Login, Signup, etc.)
 * but hidden for the Welcome screen (entry point).
 */
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a local query client for auth flow as a fallback/safety measure
const authQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function AuthLayout() {
  return (
    <QueryClientProvider client={authQueryClient}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FF7B00',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false, // Welcome screen has its own header
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Log In',
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: 'Sign Up',
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: 'Forgot Password',
          }}
        />
        <Stack.Screen
          name="reset-password-sent"
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="phone-otp"
          options={{
            title: 'Phone Verification',
          }}
        />
        <Stack.Screen
          name="new-password"
          options={{
            title: 'Set New Password',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
