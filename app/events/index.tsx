import { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { router } from 'expo-router'

import { events } from '../../src/data/events'
import EventRow from '../../src/components/EventRow'

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([])
  const [search, setSearch] = useState('')

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.trim().toLowerCase())
  )

  function toggleSaved(id: number) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search events"
        style={styles.input}
      />

      {filteredEvents.length === 0 ? (
        <Text>No events match</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(event) => String(event.id)}
          renderItem={({ item }) => (
            <EventRow
              event={item}
              saved={savedIds.includes(item.id)}
              onPress={() => router.push(`/events/${item.id}`)}
              onLongPress={() => toggleSaved(item.id)}
            />
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
  },
  info: {
    marginBottom: 12,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
})