import * as React from "react";
import { useRef, useState } from "react";
import { Text, View, Button, TextInput, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import { RadioButton, Checkbox } from "react-native-paper";
import { globalStyle } from "../style/style";
import { cacheSet } from "../components/Cache";

export default function TestScreen({ navigation, route }) {
  const viewPager = useRef(null);
  const [page, setPage] = useState([1]);
  const [correctCounter, setCorrectCounter] = useState(0);

  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  function switchType(type, answers, value, setValue) {
    switch (type) {
      case "rb":
        return (
          <RadioButton.Group
            onValueChange={(newValue) => {
              setValue(newValue);
            }}
            value={value}
          >
            {answers.map((answer, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 35,
                }}
              >
                <RadioButton value={index} color="#4F59DF" />
                <Text>{answer}</Text>
              </View>
            ))}
          </RadioButton.Group>
        );

      case "cb":
        if (value.length < 1) {
          setValue(Array(answers.length).fill(false));
        }
        let array = value;
        return answers.map((answer, index) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 35,
            }}
          >
            <Checkbox
              color="#4F59DF"
              status={array[index] == true ? "checked" : "unchecked"}
              onPress={() => {
                array[index] = !array[index];
                setValue([...array]);
              }}
            />
            <Text>{answer}</Text>
          </View>
        ));
      case "i":
        return (
          <TextInput
            onChangeText={(text) => setValue(text)}
            style={{
              height: 40,
              borderColor: "black",
              borderWidth: 2,
              borderRadius: 10,
              margin: 40,
            }}
          />
        );
      default:
        return <Text>Error</Text>;
    }
  }

  function passText(index, value, correct, type, length) {
    switch (type) {
      case "rb":
        console.log(correct);
        if (value == parseInt(correct)) {
          console.log("rbok");
          setCorrectCounter(correctCounter + 1);
        } // rb
        break;
      case "cb":
        let test = Array(length.length).fill(false);
        correct.split(",").forEach((item) => {
          test[item] = true;
        }); // cb
        console.log(test + "" + value);
        if (arrayEquals(test, value)) {
          console.log("cbok");
          setCorrectCounter(correctCounter + 1);
        }
        break;
      case "i":
        console.log(correct == value.toLowerCase().trim());
        if (correct == value.toLowerCase().trim()) {
          setCorrectCounter(correctCounter + 1);
        } // i
        break;
    }
    setPage(index + 1 + 1);
    viewPager.current.setPageWithoutAnimation(index + 1);
  }

  function buildTest(question, index) {
    const [value, setValue] = useState([]);
    let length = typeof question["a"] != "undefined" ? question["a"] : 0;
    return (
      <View styles={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 20, marginLeft: 40, margin: 10 }}>
          {question["q"]}
        </Text>
        {switchType(question["type"], question["a"], value, setValue)}
        <Pressable
          style={globalStyle.button}
          onPress={() =>
            passText(index, value, question["c"], question["type"], length)
          }
        >
          <Text style={{ color: "white" }}>Готово</Text>
        </Pressable>
      </View>
    );
  }
  const questions = route.params.questions;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {page != questions.length + 1 ? (
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            margin: 30,
          }}
        >
          {page}/{questions.length}
        </Text>
      ) : null}
      <PagerView style={{ flex: 1 }} scrollEnabled={false} ref={viewPager}>
        {questions.map((question, index) => (
          <View>{buildTest(question, index)}</View>
        ))}
        <View>
          <Text styles={{ fontSize: 20, marginTop: 20, textAlign: "center" }}>
            Правильных ответов: {correctCounter}/{questions.length}
          </Text>
          <Pressable
            style={globalStyle.button}
            onPress={() => {
              cacheSet("test" + route.params.index, correctCounter + "");
              navigation.pop(1);
            }}
          >
            <Text style={{ color: "white" }}>Далее</Text>
          </Pressable>
        </View>
      </PagerView>
    </View>
  );
}
