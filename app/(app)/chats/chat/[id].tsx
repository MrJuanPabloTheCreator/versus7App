// import React, { useEffect, useState } from 'react';
// import { Text, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// import { View } from "components"
// import useSession from 'contexts/SessionContext/useSession';
// import useWebSocket from 'contexts/WebSocketContext/useWebSocket';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const Chat = () => {
//   const { id, type, reciever_id } = useLocalSearchParams();
//   const { session } = useSession();
//   const { sendMessage } = useWebSocket();

//   if(!session?.sub || reciever_id === "null") {
//     return null;
//   }

//   const insets = useSafeAreaInsets();

//   const [chatId, setChatId] = useState(id !== "null" ? id : null);
//   const [messages, setMessages] = useState([]);

//   const onSend = (newMessages: any) => {
//     console.log(newMessages)
//     setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

//     const message = newMessages[0];
//     // if(!roomId) {
//     //   // create new room
//     // }
//     sendMessage({
//       roomId: '123',
//       senderId: session.sub,
//       recieverId: reciever_id ? reciever_id : null,
//       content: message.text,
//       timestamp: new Date().toISOString(),
//     });
//   }

//   const getRoomIdByUsersIds = async () => {
//     try {
//       const response = await fetch(`https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/usersRoom?principal_id=${session?.sub}&user_id=${reciever_id}`);
//       const { exists, roomId } = await response.json();
//       if(exists) {
//         setChatId(roomId);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const getChatData = async () => {
//     try {
//       const response = await fetch(`https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/rooms/${chatId}`);
//       const chat = await response.json();
//       console.log(chat);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     if(chatId) {
//       // get chat by id
//       getChatData();
//     } else if(!chatId && session?.sub && reciever_id) {
//       // get chat by users ids
//       getRoomIdByUsersIds();
//     }
//   }, [chatId])
  
//   return (
//     <View style={{ paddingBottom: insets.bottom }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => onSend(newMessages)}
//         user={{
//           _id: session?.sub,
//           name: session?.username,
//           avatar: session?.picture,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default Chat;
