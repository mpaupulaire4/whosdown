import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function Gradient(props) {
  return (
    <LinearGradient
      {...props}
      colors={['#3DD4B6','#163A77']}
    />
  )
}