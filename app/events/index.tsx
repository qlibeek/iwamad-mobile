import { useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useRouter } from 'expo-router'

import EventRow from '../../src/components/EventRow'
import { useEvents } from '../../src/hooks/useEvents'

export default function EventsScreen() {
  const router = useRouter()
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents()

  const [savedIds, setSavedIds] = useState<number[]>([])
  const [search, setSearch] = useState('')

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

        <Pressable
          onPress={() => refetch()}
          style={styles.button}
        >
          <Text>Try again</Text>
        </Pressable>
      </View>
    )
  }

  const filteredEvents = data.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  function toggleSaved(id: number) {
    setSavedIds((ids) =>
      ids.includes(id)
        ? ids.filter((savedId) => savedId !== id)
        : [...ids, id]
    )
  }

  return (
    <View style={styles.container}>
      <Text>Long-press an event to save it. Saved: {savedIds.length}</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search events"
        style={styles.input}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
            saved={savedIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={<Text>No events match</Text>}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 12,
    minHeight: 44,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
})