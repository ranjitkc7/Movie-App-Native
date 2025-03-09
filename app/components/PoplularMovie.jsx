import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import "../../global.css"; 

const { width, height } = Dimensions.get("window");

const PopularMovie = ({ movieData, imageUrl }) => {
  const renderItem = ({ item }) => {
    return (
      <View className="flex-row justify-center gap items-center mb-[10px]">
        {item.poster_path ? (
          <Image
            className="rounded-[8px] ml-[6px]"
            source={{ uri: `${imageUrl}${item.poster_path}` }}
            style={{ width: width * 0.6, height: height * 0.4, 
            borderRadius: 8 }}
          />
        ) : (
          <Text className="text-white">No Image Available</Text>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 justify-start items-center mt-[7px]">
      <Carousel 
        data={movieData}
        renderItem={renderItem}
        width={width}
        height={height}
        sliderW
      />
    </View>
  );
};

export default PopularMovie;
