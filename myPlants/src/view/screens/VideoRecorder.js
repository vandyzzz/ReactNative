import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Image,
  Alert,
  Video,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const VideoRecorder = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);
  useEffect(() => {}, [recording]);
  const startRecording = async () => {
    setRecording(true);
    camera.current.startRecording({
      flash: 'off',
      onRecordingFinished: video => [
        console.log(video),
        setVideos([
          ...videos,
          {uri: video.path, title: 'Video ' + (videos.length + 1)},
        ]),
      ],
      onRecordingError: error => console.error(error),
    });
  };

  const stopRecording = async () => {
    console.log('stoped');
    setRecording(false);
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
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            enableZoomGesture
            ref={camera}
            video={true}></Camera>
          {/* videos.map((video, index) => (
            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
              <Text>{video.title}</Text>
              <Video source={{ uri: video.uri }} style={{ width: '100%', height: 200 }} />
            </View>
          )) */}

          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {videos ? (
              videos.map((video, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                  }}>
                  <Text style={{color: 'white'}}>{video.title}</Text>
                  <Image
                    source={{uri: video.uri}}
                    style={{width: 70, height: 70}}
                  />
                </View>
              ))
            ) : (
              <></>
            )}
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                if (recording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
              style={styles.CaptureButton}></TouchableOpacity>
            <Text style={styles.recordingStatus}>
              {recording ? 'Stop Recording' : 'Start Recording'}
            </Text>
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
  return <View style={{flex: 1}}>{renderCamera()}</View>;
};

export default VideoRecorder;
const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  CaptureButton: {
    width: 90,
    height: 90,
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonView: {
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
    borderColor: 'green',
  },
  recordingStatus: {
    fontSize: 14,
    color: 'white',
  },
});
