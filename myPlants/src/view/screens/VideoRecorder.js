import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Video,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import { Camera, useCameraDevices } from 'react-native-vision-camera';

const VideoRecorder = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);
  // for duration 
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => { }, [recording]);
  const startRecording = async () => {
    setRecording(true);
    setIntervalId(setInterval(() => {
      setDuration((new Date() - startTime) / 1000);
    }, 1000));
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
    setDuration(0)
    await camera.current.stopRecording();
  };
  // const isFocused = useIsFocused()
  const takePhotoOptions = {
    qualityPrioritization: 'speed',
    flash: 'off',
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(()=>{
    console.log("array=>",videos);
  },[videos])
  // handler
  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') await Linking.openSettings();
  });

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

            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              enableZoomGesture
              ref={camera}
              video={true}></Camera>
          </View>

          {/* videos.map((video, index) => (
            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
              <Text>{video.title}</Text>
              <Video source={{ uri: video.uri }} style={{ width: '100%', height: 200 }} />
            </View>
          )) */}

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {videos ? (
              videos.map((video, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius:8
                  }}>
                  <Text style={{ color: 'white' }}>{video.title}</Text>
                  <Image
                    source={{ uri: video.uri }}
                    style={{ width: 70, height: 70 , borderRadius:8}}
                  />
                </View>
              ))
            ) : (
              <></>
            )}
          </View>

          <View style={styles.buttonView}>
          <Text style={styles.recordingStatus}>
              {recording && <Text>{duration}</Text> }
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (recording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
              style={recording ? styles.CapturingButton : styles.CaptureButton}>
                {recording ? <View style={styles.innerCapturingView}></View>:<></>}
              </TouchableOpacity>
            
          </View>
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
  return <SafeAreaView style={{ flex: 1, backgroundColor: '#7d7d7d' }}>{renderCamera()}</SafeAreaView>;
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
    // borderWidth:4,
    // borderColor:'red',
    borderRadius: 10
  },
  cameraHeader: {
    borderWidth: 2,
    borderColor: 'green'
  },
  CaptureButton: {
    width: 90,
    height: 90,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: '#c34c4d'
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
  innerCapturingView:{
    flex:1,
    backgroundColor:'#c34c4d',
    width:44,
    height:50,
    margin:20,
    borderRadius:10
  },
  buttonView: {
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
    borderColor: 'green',
  },
  recordingStatus: {
    fontSize: 20,
    color: 'white',
    backgroundColor:'#c34c4d',
    borderRadius:4
  },
});
