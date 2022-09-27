/**
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Peer from 'react-native-peerjs';
import {RTCView, mediaDevices} from 'react-native-webrtc';

// TODO: Configure peer server
const PEER_SERVER = {
  secure: true,                                 // Your configuration is here
  host: 'peerjs-server.xxx.yyy',                // Your configuration is here
  port: 443,                                    // Your configuration is here
  path: '/',                                    // Your configuration is here
  key: 'peerjs',                                // Optional, your configuration is here
};

const {width, height} = Dimensions.get('window');

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const [localPeer] = useState(() => new Peer(undefined, PEER_SERVER));
  const [localStream, setLocalStream] = useState();
  const [remoteStreams, setRemoteStreams] = useState();

  useEffect(() => {
    console.log('Local peer is opening ...');

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          setLocalStream(stream);
          localPeer.on('open', peerId => {
            console.log('Local peer is opened with Id = ' + peerId);

            localPeer.on('call', call => {
              console.log('Local peer receives incoming call');

              call.answer(stream);

              call?.on('stream', remoteStream => {
                console.log('Local peer receives stream from remote peer');

                setRemoteStreams([remoteStream, remoteStream, remoteStream]);
              });
            });

            console.log('Local peer will connect to remote peer');
            const outgoingCall = localPeer.call(
              'A valid remote connected peer ID',  // TODO: Your must specify a valid remote connected peer ID here to simulate video call
              stream,
            );
            outgoingCall.on('stream', remoteStream => {
              console.log('Local peer receives stream from remote peer');

              setRemoteStreams([remoteStream, remoteStream, remoteStream]);
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    });

    return () => {
      if (localPeer) {
        localPeer.destroy();
        console.log('Local peer is destroyed');
      }
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {localStream ? (
            <RTCView
              streamURL={localStream.toURL()}
              style={{
                width: width * 0.9 - 8,
                height: 200,
              }}
            />
          ) : null}
        </View>
        <ScrollView
          horizontal
          style={{flex: 0.8}}
          showsHorizontalScrollIndicator={false}>
          <>
            {remoteStreams ? (
              remoteStreams.length > 0 ? (
                <>
                  {remoteStreams.map((stream, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: width * 0.9,
                          marginRight: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RTCView
                          streamURL={stream.toURL()}
                          style={{
                            width: width * 0.9 - 8,
                            height: 300,
                          }}
                        />
                      </View>
                    );
                  })}
                </>
              ) : null
            ) : null}
          </>
        </ScrollView>
        <View
          style={{
            flex: 0.5,
          }}></View>
      </View>
    </SafeAreaView>
  );
};

export default App;
