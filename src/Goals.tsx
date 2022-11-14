import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { useCreateGoalMutation, useDeleteGoalMutation, useGetGoalsQuery } from "./api";

const Goals = () => {

  const { data: goals, isLoading, isError } = useGetGoalsQuery()
  const [deleteGoal, { isLoading: isLoadingDelete, isError: isErrorDelete}] = useDeleteGoalMutation()
  const [createGoal, { isLoading: isLoadingCreate, isError: isErrorCreate}] = useCreateGoalMutation()

  const [title, setTitle] = useState("");

  const addGoalHandler = async () => {
    if(title.length === 0) {
        return;
    }
    await createGoal({ id: Math.random().toString(), value: title });
    setTitle("");
  };

  const removeGoalHandler = (goalId: string) => {
    deleteGoal(goalId);
  };


  const isTotalLoading = isLoading || isLoadingDelete || isLoadingCreate
  
  if(isError || isErrorDelete || isErrorCreate) {
    return <Text style={{
      color: "red",
      fontSize: 20,
      fontWeight: "bold"
    }}>Something went wrong</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals</Text>
      <TextInput
        placeholder="Course Goal"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
      />
      {
        isTotalLoading ? <ActivityIndicator size="large" color="#0000ff" /> : 
(          <Button
            title="Add Goal"
            onPress={addGoalHandler}
          />
)}

      <FlatList
        style={styles.list}
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Pressable onPress={() => removeGoalHandler(itemData.item.id)}>
            <View style={styles.listItem}>
              <Text>{itemData.item.value}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  list: {
    width: "100%",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#D1D1D6",
    borderRadius: 5,
    width: "100%",
  },
  input: {
    width: "100%",
    borderColor: "#1C1C1E",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
