import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '404' }} />

      <Text style={styles.title}>404 — Page not found</Text>
      <Text>The page you are looking for does not exist.</Text>

      <Link href="/" style={styles.link}>
        Back to Home
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  link: {
    marginTop: 20,
    fontSize: 18,
  },
})