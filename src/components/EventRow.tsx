import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  onPress: () => void
  onLongPress: () => void
  saved: boolean
}

export default function EventRow({
  event,
  onPress,
  onLongPress,
  saved,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text>{event.date}</Text>
        <Text>{event.place}</Text>
      </View>

      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 12,
  },
  cardPressed: {
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  saved: {
    marginTop: 8,
    fontSize: 16,
  },
})