import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { useEvents } from '../../src/hooks/useEvents'
import HolidayNote from '../../src/components/HolidayNote'

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  const { data, isPending, isError, error, refetch } = useEvents()

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading events</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Could not load events</Text>
        <Text>{error.message}</Text>

        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const eventId = Number(id)
  const event = data.find((item) => item.id === eventId)

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Event not found</Text>
        <Text>No event with id {id}.</Text>

        <Pressable onPress={() => router.push('/events')} style={styles.button}>
          <Text>Back to events</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.date}</Text>
      <HolidayNote date={event.date} />
      <Text>{event.place}</Text>
      <Text>{event.seats} seats</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 120,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
})