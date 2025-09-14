import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type PlannerItem = {
  id: string;
  date: string;
  text: string;
};

type GroupedPlanner = {
  date: string;
  events: PlannerItem[];
};

export default function Viewer() {
  const [planner, setPlanner] = useState<GroupedPlanner[]>([]);

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const storedData = await AsyncStorage.getItem("planner");
        if (storedData) {
          const parsed: PlannerItem[] = JSON.parse(storedData);

          const grouped = parsed.reduce<Record<string, PlannerItem[]>>(
            (acc, item: PlannerItem) => {
              if (!acc[item.date]) acc[item.date] = [];
              acc[item.date].push(item);
              return acc;
            },
            {}
          );

          const sorted: GroupedPlanner[] = Object.keys(grouped)
            .sort(
              (a, b) => new Date(a).getTime() - new Date(b).getTime()
            )
            .map((date) => ({ date, events: grouped[date] }));

          setPlanner(sorted);
        }
      } catch (error) {
        console.error("Error loading planner:", error);
      }
    };

    fetchPlanner();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Itinerary Viewer</Text>
      <FlatList
        data={planner}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.date}>{item.date}</Text>
            {item.events.map((event) => (
              <Text key={event.id} style={styles.event}>
                • {event.text}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  event: {
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 4,
    color: "#555",
  },
});
