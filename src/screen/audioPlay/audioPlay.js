import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native-elements";

const audioPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTime, setPlayTime] = useState("00:00");
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());
  const [waveformData, setWaveformData] = useState([1, 3, 2, 4, 1, 5, 2, 3, 4, 2, 9]);

  // Function to update the waveform dynamically
  const updateWaveform = (currentPosition) => {
    const newWaveformData = waveformData.map((value, index) => {
      const newHeight = Math.max(1, Math.min(10, Math.floor(value + Math.sin(currentPosition + index) * 5))); // Simulate waveform change
      return newHeight;
    });
    setWaveformData(newWaveformData);
  };

  const onPlayPause = async () => {
    if (isPlaying) {
      await audioRecorderPlayer.stopPlayer();
      setIsPlaying(false);
    } else {
      const path = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Demo audio file URL
      try {
        await audioRecorderPlayer.startPlayer(path);

        audioRecorderPlayer.addPlayBackListener((e) => {
          setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

          // Update waveform based on audio position
          updateWaveform(e.currentPosition);

          if (e.currentPosition >= e.duration) {
            setIsPlaying(false);
            audioRecorderPlayer.stopPlayer();
          }
        });

        audioRecorderPlayer.setVolume(1.0); // Optional: Set volume if needed
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio: ", error);
      }
    }
  };

  useEffect(() => {
    // Cleanup the listener when the component unmounts
    return () => {
      audioRecorderPlayer.removePlayBackListener();
    };
  }, [audioRecorderPlayer]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
      
        {isPlaying?
        <Image style={{width:50,height:50}} source={require('../../Image/play.png')}/> 
        :
        <Image  style={{width:50,height:50}}  source={require('../../Image/playStopIcon.jpg')}/> 
    }
      </TouchableOpacity>
      <View style={styles.waveform}>
        {waveformData.map((height, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              { height: height * 10 }, // Adjust height multiplier as needed
            ]}
          />
        ))}
      </View>
      <Text style={styles.time}>{playTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    width: Dimensions.get("screen").width * 0.9,
  },
  playButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  waveform: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: 50,
    overflow: "hidden",
  },
  bar: {
    width: 4,
    backgroundColor: "white",
    borderRadius: 2,
    marginHorizontal: 2,
  },
  time: {
    color: "white",
    marginLeft: 10,
    fontSize: 14,
  },
});

export default audioPlay;
