import { Pressable, StyleSheet, Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated'
import type { CampusEvent } from '../data/events'

type EventRowProps = {
  event: CampusEvent
  onPress: () => void
  onToggleSaved: () => void
  saved: boolean
}

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  saved,
}: EventRowProps) {
  return (
    <Swipeable
      friction={2}
      rightThreshold={60}
      renderRightActions={(_progress, _translation, swipeable) => (
        <Pressable
          onPress={() => {
            onToggleSaved()
            swipeable.close()
          }}
          style={styles.action}
        >
          <Text style={styles.actionText}>
            {saved ? 'Unsave' : 'Save'}
          </Text>
        </Pressable>
      )}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        layout={LinearTransition}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
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

          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Animated.View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 30,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 12,
    backgroundColor: '#ffffff',
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

  action: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  actionText: {
    fontSize: 16,
  },
})