// // toastConfig.js
// import React from 'react';
// import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
// import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// export const toastConfig = {
//   loading: ({ text1, text2 }) => (
//     <View style={styles.loadingToast}>
//       <ActivityIndicator size="small" color="#FFFFFF" />
//       <View style={styles.textContainer}>
//         {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
//         {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
//       </View>
//     </View>
//   ),
//     success: (props) => (
//         <BaseToast
//             {...props}
//             style={{ borderLeftColor: 'pink' }}
//             contentContainerStyle={{ paddingHorizontal: 15 }}
//             text1Style={{
//                 fontSize: 15,
//                 fontWeight: '400'
//             }}
//         />
//     ),
//     error: (props) => (
//         <ErrorToast
//             {...props}
//             style={styles.errorToast}
//             contentContainerStyle={styles.contentContainer}
//             text1Style={styles.text1}
//             text2Style={styles.text2}
//         />
//     ),
// };

// const styles = StyleSheet.create({
//   loadingToast: {
//     flexDirection: 'row',
//     backgroundColor: '#333333',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   successToast: {
//     borderLeftColor: 'green',
//   },
//   errorToast: {
//     borderLeftColor: 'red',
//   },
//   contentContainer: {
//     paddingHorizontal: 15,
//   },
//   textContainer: {
//     marginLeft: 12,
//     flexShrink: 1,
//   },
//   text1: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   text2: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     marginTop: 4,
//   },
// });
