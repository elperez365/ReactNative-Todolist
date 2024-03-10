import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

export default function App() {
  const [text, setText] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const addTodo = () => {
    if (text === "") {
      alert("Please enter a text!");
      return;
    }
    const id = todolist.length + 1;
    setTodolist((prev) => [...prev, new Todo(id, text)]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={{ width: 50, height: 50 }}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
          margin: 10,
        }}
        defaultValue=""
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button
        title="Add todo"
        onPress={() => {
          addTodo();
        }}
      />

      <FlatList
        data={todolist}
        style={{
          width: "100%",
          margin: 10,
          padding: 10,
          backgroundColor: "lightblue",
        }}
        renderItem={({ item }) => (
          <>
            <View style={styles.todolist}>
              {!isEdit && (
                <>
                  <Text>{item.id}</Text>

                  <Text>{item.title}</Text>
                </>
              )}

              {isEdit && (
                <TextInput
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    width: 200,
                    margin: 10,
                  }}
                  defaultValue={item.title}
                  onChangeText={(text) => {
                    setTodolist((prev) =>
                      prev.map((todo) =>
                        todo.id === item.id ? { ...todo, title: text } : todo
                      )
                    );
                  }}
                />
              )}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setIsEdit((prev) => !prev);
                  }}
                >
                  <Text>{isEdit ? "SAVE" : "EDIT"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setTodolist((prev) =>
                      prev.filter((todo) => todo.id !== item.id)
                    );
                  }}
                >
                  <Text>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  todolist: {
    flex: 1,
    backgroundColor: "aliceblue",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
});
