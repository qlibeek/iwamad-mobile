import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [likes, setLikes] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.text}>Alibek Burakhanov</Text>

      <Text style={styles.likes}>Likes: {likes}</Text>

      <Pressable
        onPress={() => setLikes(likes + 1)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
  },
  likes: {
    fontSize: 24,
    marginTop: 20,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 20,
  },
})
