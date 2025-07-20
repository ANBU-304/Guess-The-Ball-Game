// App.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';

const App = () => {
  const [ballPosition, setBallPosition] = useState(0); // 0, 1, or 2
  const [cups, setCups] = useState([0, 1, 2]);
  const [shuffled, setShuffled] = useState(false);
  const animatedValues = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];

  useEffect(() => {
    resetGame();
  }, []);

  const shuffleCups = () => {
    const newOrder = [...cups];
    for (let i = 0; i < 10; i++) {
      const idx1 = Math.floor(Math.random() * 3);
      const idx2 = Math.floor(Math.random() * 3);
      [newOrder[idx1], newOrder[idx2]] = [newOrder[idx2], newOrder[idx1]];
    }
    setCups(newOrder);
    setShuffled(true);
  };

  const resetGame = () => {
    const randomPos = Math.floor(Math.random() * 3);
    setBallPosition(randomPos);
    setCups([0, 1, 2]);
    setShuffled(false);
  };

  const handleGuess = (index) => {
    if (!shuffled) {
      Alert.alert("Please shuffle the cups first!");
      return;
    }

    const guessedCup = cups[index];
    const isCorrect = guessedCup === ballPosition;

    Alert.alert(isCorrect ? "🎉 Correct!" : "❌ Wrong!", `Ball was under cup ${ballPosition + 1}`, [
      { text: "Play Again", onPress: resetGame },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🥤 Guess the Cup 🥤</Text>
      <View style={styles.cupRow}>
        {cups.map((cup, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cup}
            onPress={() => handleGuess(index)}
          >
            <Text style={styles.cupText}>Cup {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.shuffleButton} onPress={shuffleCups}>
        <Text style={styles.shuffleText}>🔀 Shuffle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2e43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
  },
  cupRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 40,
  },
  cup: {
    width: 80,
    height: 100,
    backgroundColor: '#6c5ce7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cupText: {
    fontSize: 18,
    color: '#fff',
  },
  shuffleButton: {
    backgroundColor: '#00cec9',
    padding: 15,
    borderRadius: 10,
  },
  shuffleText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default App;
