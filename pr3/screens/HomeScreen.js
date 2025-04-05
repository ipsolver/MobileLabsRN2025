import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';
import { useAppContext } from '../components/AppContext';
import { Dimensions } from 'react-native';


const HomeScreen = () => {
  const { score, incrementScore, updateTaskProgress } = useAppContext();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const doubleTapRef = useRef();
  const singleTapRef = useRef();
  const pinchUsed = useRef(false);

  const handleSingleTap = () => {
    incrementScore(1);
    updateTaskProgress('1');
  };

  const handleDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      incrementScore(2);
      updateTaskProgress('2');
    }
  };

  const handleLongPress = () => {
    incrementScore(5);
    updateTaskProgress('3');
  };

const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
const lastOffset = useRef({ x: 0, y: 0 }).current;

const handlePanGesture = (event) => {
  const { translationX, translationY, state } = event.nativeEvent;

  if (state === State.ACTIVE) 
  {
    let newX = lastOffset.x + translationX;
    let newY = lastOffset.y + translationY;

    const limitX = (screenWidth - 100) / 2;
    const limitY = (screenHeight - 100 - 80) / 2;

    newX = Math.max(-limitX, Math.min(newX, limitX));
    newY = Math.max(-limitY, Math.min(newY, limitY));

    position.setValue({ x: newX, y: newY });

    if (Math.abs(translationX) > 20 || Math.abs(translationY) > 20) 
    {
      incrementScore(1);
      updateTaskProgress("4");
    }
  }

  if (state === State.END || state === State.CANCELLED) 
  {
    lastOffset.x = position.x._value;
    lastOffset.y = position.y._value;
  }
};

const handleFlingRight = (event) => {
  if (event.nativeEvent.state === State.ACTIVE) {
    incrementScore(4);
    updateTaskProgress("5");
  }
};

const handleFlingLeft = (event) => {
  if (event.nativeEvent.state === State.ACTIVE) {
    incrementScore(4);
    updateTaskProgress("6");
  }
};


  const handlePinch = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    {
      useNativeDriver: false,
      listener: (e) => {
        const currentScale = e.nativeEvent.scale;
        scale.setValue(currentScale);

        if ((currentScale > 1.5 || currentScale < 0.5) && !pinchUsed.current) {
          incrementScore(3);
          updateTaskProgress('7');
          pinchUsed.current = true;
        }

        if (currentScale >= 0.9 && currentScale <= 1.1) {
          pinchUsed.current = false;
        }
      },
    }
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <PinchGestureHandler onGestureEvent={handlePinch}>
    <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={handleFlingLeft}>
          <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={handleFlingRight}>
      <View style={styles.container}>
        <Text style={styles.score}>Score: {score}</Text>

              <PanGestureHandler onGestureEvent={handlePanGesture}>
                <LongPressGestureHandler onActivated={handleLongPress} minDurationMs={3000}>
                  <TapGestureHandler
                    ref={doubleTapRef}
                    numberOfTaps={2}
                    onHandlerStateChange={handleDoubleTap}
                  >
                    <TapGestureHandler
                      ref={singleTapRef}
                      waitFor={doubleTapRef}
                      onActivated={handleSingleTap}
                    >
                      <Animated.View
                        style={[
                          styles.circle,
                          {
                            transform: [
                              { translateX: position.x },
                              { translateY: position.y },
                              { scale: scale },
                            ],
                          },
                        ]}
                      />
                    </TapGestureHandler>
                  </TapGestureHandler>
                </LongPressGestureHandler>
              </PanGestureHandler>
            
          
      </View></FlingGestureHandler>
        </FlingGestureHandler>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    borderRadius: 50,
  },
});

export default HomeScreen;