// // import React, { useState } from "react";
// // import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // export default function App() {
// //   const [user, setUser] = useState({
// //     name: "",
// //     username: "",
// //     email: "",
// //   });
// //   const { name, username, email } = user;
// //   const onInputChange = (e) => {
// //     setUser({ ...user, [e.target.name]: e.target.value });
// //   };

// //   const onSubmit = async (e) => {
// //     e.preventDefault();
// //     await axios.post("http://localhost:8080/user", user);
// //     navigate("/");
// //   };
// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.style1}>
// //         <Text style={styles.title}>LOGIN</Text>
// //       </View>
// //       <View style={styles.style2}>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter your name"
// //         onChangeText={onInputChange}
// //         value={name}
// //       />
// //         <View style={{ flexDirection: 'row', alignItems: 'center'}}>
// //         {/* <TextInput
// //         style={styles.input}
// //         placeholder="Password"
// //         secureTextEntry={true} // Để ẩn mật khẩu
// //         onChangeText={(text) => onInputChange(text, 'password')}
// //         value={password}
// //       /> */}
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter your username"
// //         onChangeText={onInputChange}
// //         value={username}
// //       />
      
// //         </View>
// //         <View style={{ flexDirection: 'row', alignItems: 'center'}}>
// //         <TextInput
// //         style={styles.input}
// //         placeholder="Enter your e-mail address"
// //         onChangeText={onInputChange}
// //         value={email}
// //         keyboardType="email-address" // Kiểu bàn phím dành cho địa chỉ email
// //       />
// //         </View>
// //         <TouchableOpacity style={styles.btnLogin}>
// //           <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>LOGIN</Text>
// //         </TouchableOpacity>
// //       </View>
// //       <View style={styles.style3}>
// //         <Text style={[styles.style3.style3_text,{marginTop:-20}]}>When you agree to terms and conditions</Text>
// //         <TouchableOpacity onPress={() => handleNavigation('ForgetPassword')}>
// //           <Text style={[styles.style3.style3_text, {color: '#5D25FA'}]}>For got your password</Text>
// //         </TouchableOpacity>
// //         <Text style={styles.style3.style3_text}>Or login with</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#31AA5230',
// //   },
// //   style1: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginTop: 0,
// //   },
// //   style2: {
// //     flex: 3,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   style3: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     style3_text:{
// //       fontSize: 14,
// //       fontWeight: 400,
// //       marginTop:15,
// //     }
// //   },
// //   style4: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     flexDirection: 'row',
// //     marginTop: -20,
// //     btn:{
// //       borderColor: '#0680F1',
// //       borderWidth: 1,
// //       borderRadius: 2,
// //       width: 110,
// //       height: 45,
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //     },
// //     image:{
// //       width: 30,
// //       height: 30,
// //     }
// //   },
// //   input: {
// //     height: 54,
// //     width: 330,
// //     margin: 12,
// //     borderWidth: 1,
// //     padding: 10,
// //     fontSize: 18,
// //     fontWeight: 400,
// //     backgroundColor: '#C4C4C44D',
// //     borderColor: '#F2F2F2',
// //   },
// //   title: {
// //     fontSize: 25,
// //     fontWeight: 'bold',
// //   },
// //   btnLogin: {
// //     width: 330,
// //     height: 45,
// //     backgroundColor: 'red',
// //     borderRadius: 2,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginTop: 50,
// //   },
// //   button: {
// //     width: 150,
// //     height: 50,
// //     backgroundColor: '#e3c000',
// //     borderRadius: 5,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   buttonText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: 'white',
// //   },
// // });


// import axios from "axios";
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// const AddUser = () => {
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     email: "",
//   });

//   const { name, username, email } = user;

//   const onInputChange = (fieldName, text) => {
//     setUser({ ...user, [fieldName]: text });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // Assuming you have navigation implemented in your app
//     // Replace the following line accordingly
//     console.log("Submitting:", user);
//     await axios.post("http://localhost:8080/user", user);
//     // navigate("/");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.formContainer}>
//         <Text style={styles.headerText}>Register User</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             onChangeText={(text) => onInputChange("name", text)}
//             value={name}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Username</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your username"
//             onChangeText={(text) => onInputChange("username", text)}
//             value={username}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>E-mail</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your e-mail address"
//             onChangeText={(text) => onInputChange("email", text)}
//             value={email}
//           />
//         </View>

//         <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>

//         {/* Replace the following Link component accordingly based on your navigation system */}
//         <TouchableOpacity style={styles.cancelButton} onPress={() => console.log("Cancel")}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   formContainer: {
//     borderRadius: 10,
//     padding: 20,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     paddingLeft: 10,
//   },
//   submitButton: {
//     backgroundColor: "#3498db",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   cancelButton: {
//     backgroundColor: "#e74c3c",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//   },
// });

// export default AddUser;


import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ipv4 } from "../global";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const onInputChange = (fieldName, text) => {
    setUser({ ...user, [fieldName]: text });
  };

  const onSubmit = async () => {
    try {
      // Thay localhost:8080 bằng địa chỉ IP máy chủ của bạn
      await axios.post("http://172.20.10.9:8080/user", user);
      // Thực hiện điều hướng đến màn hình mong muốn ở đây
      console.log("Đăng ký thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Đăng ký người dùng</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên của bạn"
            onChangeText={(text) => onInputChange("name", text)}
            value={name}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tên người dùng</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên người dùng"
            onChangeText={(text) => onInputChange("username", text)}
            value={username}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ e-mail"
            onChangeText={(text) => onInputChange("email", text)}
            value={email}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default AddUser;
