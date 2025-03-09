import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import "../../global.css";
import Carousel from "react-native-reanimated-carousel";
import Animated, { Easing } from "react-native-reanimated";

const UpcomingMovie = () => {
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const apiKey = "73126c9f0bbb4db9d5f7b357b28f3592";
  const baseUrl = "https://api.themoviedb.org/3";
  const upcomingMoviesUrl = `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const window = Dimensions.get("window");
  const carouselWidth = window.width;
  const itemWidth = window.width * 0.7;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(upcomingMoviesUrl);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Animated.View
        style={{
          width: itemWidth,
          shadowColor: "#fff",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://www.themoviedb.org/movie/${item.id}`)
          }
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: imageUrl + item.poster_path }}
            style={{
              width: "100%",
              height: 300,
              borderRadius: 15,
              resizeMode: "cover",
            }}
          />
          {/* <Text
            className="text-white text-center mt-2 font-bold"
            style={{ fontSize: 14 }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text className="text-gray-400 text-center text-xs mt-1">
            {new Date(item.release_date).toLocaleDateString()}
          </Text> */}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-2xl font-bold mb-4 ">
        Upcoming Movies
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Carousel
          data={movies}
          renderItem={renderItem}
          width={carouselWidth}
          height={400}
          mode="horizontal-stack"
          modeConfig={{
            showLength: 5,
            stackInterval: 30,
            scaleInterval: 0.08,
            rotateZDeg: 0,
            opacityInterval: 0,
          }}
          style={{
            width: carouselWidth,
            justifyContent: "center",
          }}
          loop={true}
          autoPlay={true}
          autoPlayInterval={3000}
          withAnimation={{
            type: "spring",
            config: {
              damping: 15,
              mass: 1,
              stiffness: 150,
            },
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          parallaxScalingFactor={0.8}
          customConfig={() => ({ type: "positive", viewCount: 5 })}
        />
      )}
    </View>
  );
};

export default UpcomingMovie;
