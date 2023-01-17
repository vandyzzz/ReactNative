import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const VideoRecorder = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [cameraVisible, setcameraVisible] = useState(true);
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);
  // for duration
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  // for displaying selected video
  const [selectedVideo, setselectedVideo] = useState(null)

  useEffect(() => { }, [recording]);
  const startRecording = async () => {
    setRecording(true);
    setIntervalId(
      setInterval(() => {
        setDuration((new Date() - startTime) / 1000);
      }, 1000),
    );
    camera.current.startRecording({
      flash: 'off',
      onRecordingFinished: video => [
        console.log(video),
        setVideos([
          ...videos,
          { uri: video.path, title: 'Video ' + (videos.length + 1) },
        ]),
      ],
      onRecordingError: error => console.error(error),
    });
  };

  const stopRecording = async () => {
    console.log('stoped');
    setRecording(false);
    clearInterval(intervalId);
    setDuration(0);
    await camera.current.stopRecording();
    setcameraVisible(false);
  };
  // const isFocused = useIsFocused()
  const takePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: 'off',
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    console.log('array=>', videos);
  }, [videos]);
  // handler
  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') await Linking.openSettings();
  });

  // For recording multiple videos
  const recordAnotherVideo = () => {
    setcameraVisible(true);
  };

  const selectVideo = (video) => {
    console.log("infunction");
    setselectedVideo(video)
  }
  useEffect(() => {
    console.log("Selected vdo", selectedVideo);
  }, [selectedVideo])
  // Main
  const renderCamera = () => {
    // const takePhoto = async () => {
    //   try {
    //     //Error Handle better
    //     if (camera.current == null) throw new Error('Camera Ref is Null');
    //     console.log('Photo taking ....');
    //     const photo = await camera.current.takePhoto(takePhotoOptions);
    //     console.log(photo.path)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    if (device == null) {
      // console.log(device);
      return (
        <View
          style={{
            flex: 1,
          }}></View>
      );
    } else {
      return (
        <View style={styles.mainDiv}>
          <View style={styles.cameraHeader}>
            <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>
              Record an exercise
            </Text>
           
          </View>
          <View style={styles.cameraView}>
            {cameraVisible ? (
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                enableZoomGesture
                ref={camera}
                // audio={true}
                video={true}></Camera>
            ) : (
              <View style={{ flex: 1 }}>
                <Video resizeMode='cover' source={{ uri: selectedVideo?.uri }}
                  style={styles.backgroundVideo} />
              </View>
            )}
          </View>

          {/* videos.map((video, index) => (
            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
              <Text>{video.title}</Text>
              <Video source={{ uri: video.uri }} style={{ width: '100%', height: 200 }} />
            </View>
          )) */}
          {/* For title and delete vdo */}
          {!cameraVisible && <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'red' }}>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              value={selectedVideo?.title}
              style={{ marginLeft: 20, padding: 3, borderColor: '#CBDB2A', borderWidth: 1, width: '70%', height: '80%', color: 'white', borderRadius: 8 }}
            />
            <Icon
              name="delete"
              size={26}
              color={'#D58E39'}

            />

          </View>}
          {/* For video slots */}
          {!cameraVisible && <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {videos ? (
              videos?.map((video, index) => (
                <TouchableOpacity key={index} onPress={() => selectVideo(video)}>
                  <View

                    style={{
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: 'white',
                      borderRadius: 8,

                    }}

                  >
                    {/* <Text style={{color: 'white'}}>{video.title}</Text> */}
                    <Image
                      source={{ uri: video.uri }}
                      style={{ width: 70, height: 70, borderRadius: 8 }}
                    />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <></>
            )}
            {videos.length !== 0 ? (
              <TouchableOpacity onPress={() => recordAnotherVideo()}>
                <View
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 8,
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    width: 70,
                    alignItems: 'center',
                    height: 70,
                  }}>
                  <Icon name="add" size={40} color={'#CBDB2A'} />
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>}

          {cameraVisible ? (
            <View style={styles.buttonView}>
              <Text style={styles.recordingStatus}>
                {recording && <Text>{duration}</Text>}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (recording) {
                    stopRecording();
                  } else {
                    startRecording();
                  }
                }}
                style={
                  recording ? styles.CapturingButton : styles.CaptureButton
                }>
                {recording ? (
                  <View style={styles.innerCapturingView}></View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',height:'5%',alignItems:'center'}}>
                <View style={{backgroundColor:'#3F7B8F' , alignItems:'center',width:'50%'}}>
                  <Text>ADD VIDEOS TO PRESCRIPTION</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {/* <View style={{ flex: 1 }}>
        <Text>Recorded Videos:</Text>
        {
          videos.map((video, index) => (
            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
              <Text>{video.title}</Text>
              <Image source={{ uri: video.uri }} style={{ width: '100%', height: 200 }} />
            </View>
          ))
        }
      </View> */}
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7d7d7d' }}>
      {renderCamera()}
    </SafeAreaView>
  );
};

export default VideoRecorder;
const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  cameraView: {
    height: 400,
    margin: 20,
    borderRadius: 10,
  },
  cameraHeader: {

  },
  CaptureButton: {
    width: 90,
    height: 90,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#c34c4d',
  },
  CapturingButton: {
    width: 90,
    height: 90,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    // backgroundColor: 'green'
  },
  innerCapturingView: {
    flex: 1,
    backgroundColor: '#c34c4d',
    width: 44,
    height: 50,
    margin: 20,
    borderRadius: 10,
  },
  buttonView: {
    alignItems: 'center',
    marginBottom: 12,
  },
  recordingStatus: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#c34c4d',
    borderRadius: 4,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%'
  },
});
