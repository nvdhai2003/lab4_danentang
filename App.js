import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import {useState} from "react";

export default function App() {
    const [contacts, setContacts] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [editingContact, setEditingContact] = useState(null);
    const [editingName, setEditingName] = useState('');
    const [editingPhone, setEditingPhone] = useState('');


    const addContacts = () => {
        const newContacts = {name, phoneNumber};
        setContacts([...contacts, newContacts]);
        setName('');
        setPhoneNumber('');
    };

    const deleteContact = (contact) => {
        const updatedContacts = contacts.filter((item) => item !== contact);
        setContacts(updatedContacts);
    };

    const editContact = (contact) => {
        setEditingContact(contact);
        setEditingName(contact.name);
        setEditingPhone(contact.phoneNumber);
    };

    const updateContact = () => {
        const updatedContacts = contacts.map((contact) => {
            if (contact === editingContact) {
                return {...contact, name: editingName, phoneNumber: editingPhone};
            }
            return contact;
        });
        setContacts(updatedContacts);
        setEditingContact(null);
        setEditingName('');
        setEditingPhone('');
    };


    return (
        <View style={styles.container}>
            <TextInput style={styles.textinput} placeholder='Nhập họ và tên'
                       value={editingContact !== null ? editingName : name}
                       onChangeText={(text) => {
                           if (editingContact !== null) {
                               setEditingName(text);
                           } else {
                               setName(text);
                           }
                       }}/>
            <TextInput style={styles.textinput} placeholder='Nhập số điện thoại'
                       value={editingContact !== null ? editingPhone : phoneNumber}
                       onChangeText={(text) => {
                           if (editingContact !== null) {
                               setEditingPhone(text);
                           } else {
                               setPhoneNumber(text);
                           }
                       }}/>

            <View style={{flexDirection: 'row', margin: 20}}>
                <TouchableOpacity style={styles.button} onPress={addContacts}>
                    <Text style={{fontSize: 20, color: 'white'}}>Thêm danh bạ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={updateContact}>
                    <Text style={{fontSize: 20, color: 'white'}}>Sửa danh bạ</Text>
                </TouchableOpacity>

            </View>

            <FlatList data={contacts} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => (
                          <View style={styles.item}>
                              <TouchableOpacity
                                  onPress={() => editContact(item)}

                              >
                                  <View style={{flexDirection: 'row'}}>
                                      <Image source={require('./assets/profile.png')}
                                             style={{width: 60, height: 60}}/>
                                      <View style={{marginLeft: 20}}>

                                          <Text style={{fontSize: 20, marginBottom: 5}}>{item.name}</Text>
                                          <Text style={{fontSize: 20}}>{item.phoneNumber}</Text>
                                      </View>
                                  </View>

                                  <TouchableOpacity onPress={() => deleteContact(item)} style={{
                                      width: '100%',
                                      height: 30,
                                      marginTop: 10,
                                      backgroundColor: '#09bde5',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 5,
                                  }}>
                                      <Text style={{fontSize: 20, color: 'white'}}>Xóa danh bạ</Text>
                                  </TouchableOpacity>
                              </TouchableOpacity>

                          </View>
                      )}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20
    },

    textinput: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#878585',
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18
    },

    button: {
        flex: 1,
        width: 150,
        height: 50,
        backgroundColor: '#09bde5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 5,
    },
    button1: {
        flex: 1,
        width: 150,
        height: 50,
        backgroundColor: '#64e181',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 5
    },
    item: {
        width: '90%',
        height: 130,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#878585',
        padding: 10,
        marginTop: 20,
        marginLeft: 20
    }
});
