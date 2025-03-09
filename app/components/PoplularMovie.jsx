import {
  View,
  Text,
  FlatList,
  Image,
  Linking,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import "../../global.css";

const { width } = Dimensions.get("window");

const PoplularMovie = ({ movieData, imageUrl }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const itemWidth = 100 + 20; 

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * itemWidth,
      index * itemWidth,
      (index + 1) * itemWidth,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          margin: 10,
          transform: [{ scale }],
          opacity,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity activeOpacity={0.8}
         onPress={() => Linking.openURL(`https://www.themoviedb.org/movie/${item.id}`)}
        >
          <Image
            source={{ uri: `${imageUrl}${item.poster_path}` }}
            style={{
              width: 100,
              height: 150,
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
        <Text className="text-white mt-2 mb-4 text-xs font-semibold">
          {item.title?.length > 10
            ? `${item.title.slice(0, 10)} ...`
            : item.title || item.name}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View >
      <Text className="text-2xl font-bold text-white mb-4">Trending</Text>
      <FlatList
        data={movieData}
        keyExtractor={(movie) => movie.id.toString()}
        renderItem={renderItem}
        horizontal
        snapToInterval={itemWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default PoplularMovie;
