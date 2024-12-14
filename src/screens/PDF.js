import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
const PDF=({navigation,route}) =>{
    const [list, setlist] = useState([]);
    const [section, setSetion] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    let n_id=route.params;
    console.log("nid",n_id);
    useEffect(() => {
        getSection();
    }, [section])
    const getSection = async () => {
        const response = await fetch(`${global.apiURL}teacher/getStudentBySection?section=${section}`)
        const courses = await response.json();
        console.log("std", courses);
        setlist(courses);
    };
    const handleCheckStudentToggle = (item) => {
        const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem === item);

        if (selectedIndex >= 0) {
            // the item was already selected, so remove it from the list
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((selectedItem) => selectedItem !== item)
            );
        } else {
            // add the new item to the list of selected items
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
            console.log("lst", selectedItems);

        }
    };
    return(
        <View style={styles.container}>
    <FlatList
                data={list}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.inputvi,
                            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                        ]}
                    >
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Font name="chalkboard-teacher" size={30} color="#076F65" style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: "#076F65", }}>
                                {item.std_id} {item.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', color: "#076F65" }}>
                            <CheckBox
                                value={selectedItems.includes(item)}
                                onValueChange={() => handleCheckStudentToggle(item)}
                                tintColors={{ true: '#076F65', false: '#076F65' }}
                            />
                        </View>
                    </View>
                )
                }/>
                </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default PDF;