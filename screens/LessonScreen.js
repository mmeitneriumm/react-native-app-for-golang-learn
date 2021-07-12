import * as React from "react";
import { globalStyle } from "../style/style";
import { db } from "../firebase";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

function Item({ navigation, item }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("StepScreen", {
          text: item.data["Text"],
          title: item.data["Name"],
        })
      }
    >
      <View style={globalStyle.lessoncard}>
        <Image
          source={{ uri: item.data["Image"] }}
          style={{ width: 50, height: 50, borderRadius: 30 }}
        />
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text>Урок {item.data["id"]}</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item.data["Name"]}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end", alignSelf: "center" }}>
          <MaterialIcons name="keyboard-arrow-right" size={25} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function LessonScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    const subscriber = db.collection("lesson").onSnapshot((querySnapshot) => {
      const lesson = [];

      querySnapshot.forEach((documentSnapshot) => {
        lesson.push({
          data: documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });

      setLesson(lesson);
      setLoading(false);
    });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={globalStyle.maintext}>
      <Text style={{ color: "#4F59DF" }}>Теория</Text>
      <Text style={globalStyle.nametext}>
        Введение в программирование на Go
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={lesson}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      />
    </View>
  );
}
