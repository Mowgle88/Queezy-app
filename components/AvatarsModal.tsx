import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import IconButton from './ui/IconButton';
import { avatarSource } from '../constants/avatar';

interface QuizTypesModalProps {
  visible: boolean,
  onCancel: () => void,
  onSubmitImage: (index: number) => void
}

export default function AvatarsModal(this: any, { visible, onCancel, onSubmitImage }: QuizTypesModalProps) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Choose the Avatar</Text>
          <View style={styles.gridContainer}>
            {
              avatarSource.map((item, i) => (
                <Pressable key={item.id} onPress={() => {
                  onSubmitImage(i)
                }}>
                  <Image style={styles.image} source={item.src} />
                </Pressable>
              ))
            }
          </View>
          <IconButton icon={'close'} size={25} color={'black'} onPress={onCancel} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    margin: 3
  }
})