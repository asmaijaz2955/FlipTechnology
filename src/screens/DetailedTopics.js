import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DetailedTopics = ({navigation,route}) => {
  const [data, setData] = useState([ ]);
  const [teachers, setTeachers] = useState([])
  let courseId = route.params.courseId;
  console.log("courseId", courseId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${global.apiURL}student/GetDetailedCommonTopics?c_id=${courseId}`);
        const data = await response.json();

        console.log('JSON DATA', data);

        let arr = []
        if (data.length > 0) {
          Object.entries(data[0].Covered).map(([key, value]) => {
            arr.push(key)
          })
          setTeachers(arr)
        }
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={[styles.headerCell, styles.fixedWidth]}>Topics</Text>
        {teachers.map(item => <Text style={styles.headerCell}>{item}</Text>
        )}

      </View>
      {data.map((item, index) => (
        <View style={styles.tableRow} key={index.toString()}>
          <Text style={[styles.cell, styles.fixedWidth]}>{item.TopicName}</Text>
          {
            Object.entries(item.Covered).map(([key, value]) => {

              return value ? <Text style={[styles.tick, styles.cell]}>&#x2713;</Text> :
                <Text style={[styles.cross, styles.cell]}>&#x2717;</Text>
              // return <Text style={styles.cell}>{value ? "true" : "false"}</Text >
            })
          }
          {/* <Text style={styles.cell}>{item.id}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.age}</Text> */}
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
  },
  tick: {
    fontSize: 20,
    color: 'green',
  },
  cross: {
    fontSize: 20,
    color: 'red',
  },
  cell: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
  },
  fixedWidth: {
    flex: 5,
  },
});
export default DetailedTopics;
