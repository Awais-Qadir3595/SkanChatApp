import { StarEmpty, StarFill } from 'assets/svgs';
import { mvs } from "../services/metrices";
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

const StarRating = ({ initialRating, onRatingChange }) => {

  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating) => {
    
    if(newRating==rating)
    {
        setRating(rating-1)
    onRatingChange(rating-1);

    }
    else{
        setRating(newRating);
        onRatingChange(newRating);
    }
   
  };

  return (
    <View style={{ flexDirection: 'row', }}>
      {[1, 2, 3, 4, 5].map((num) => (
        <TouchableOpacity key={num} onPress={() => handleRating(num)} style={{marginRight:mvs(10)}}>

            {num<=rating? <StarFill/> : <StarEmpty/>}
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;