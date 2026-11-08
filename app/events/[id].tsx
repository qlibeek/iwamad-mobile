import { Stack, Link, router, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { events } from '../../src/data/events'

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const event = events.find((item) => item.id === Number(id))

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Event' }} />
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
        <Link href="/events">Back to events</Link>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>{event.date}</Text>
      <Text style={styles.info}>{event.place}</Text>
      <Text style={styles.info}>{event.seats} seats</Text>

      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text>Back to events</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  backButton: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 20,
  },
})