import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import "../global.css";
import PopularMovie from "./components/PoplularMovie";
import UpcomingMovie from "./components/UpcomingMovie";
import axios from "axios";

const HomePage = () => {
  const [search, setSearch] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]); 
  const [query, setQuery] = useState("");

  const apiKey = "73126c9f0bbb4db9d5f7b357b28f3592";
  const baseUrl = "https://api.themoviedb.org/3";
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {

    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US`
        );
        setPopularMovies(response.data.results);
        setMovieData(response.data.results); 
      } catch (error) {
        console.error("Error fetching popular movies", error);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setMovieData(popularMovies); // Reset to all movies when no search
      return;
    }

    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US`
        );
        setMovieData(response.data.results);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };

    fetchMovieData();
  }, [query, popularMovies]); // Depend on popularMovies to reset when clearing search

  return (
    <ScrollView className="flex-1 bg-slate-700 px-[8px] pt-[12px]">
      <StatusBar backgroundColor={"white"} />
      <View className="w-full flex-row justify-between items-center">
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-[3rem] w-[3rem] rounded-full bg-white justify-center items-center"
        >
          <MaterialIcons name="format-align-left" size={24} color="black" />
        </TouchableOpacity>
        <Text>
          <Text className="font-bold text-yellow-400 text-[2.5rem]">M</Text>
          <Text className="font-bold text-white text-[2.5rem]">OVIE</Text>
        </Text>
        <TouchableOpacity
          onPress={() => setSearch(!search)}
          activeOpacity={0.7}
          className="h-[3rem] w-[3rem] rounded-full bg-white justify-center items-center"
        >
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {search && (
        <TextInput
          placeholder="Search Movie..."
          value={query}
          onChangeText={setQuery}
          className="w-full h-[3rem] bg-white rounded-full px-[12px] 
             mt-[12px] text-black"
        />
      )}
      <PopularMovie movieData={movieData} imageUrl={imageUrl} />
      <UpcomingMovie />
    </ScrollView>
  );
};

export default HomePage;
