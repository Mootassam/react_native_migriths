import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export const styles = StyleSheet.create({
  logo: Platform.select({
    ios: {
      resizeMode: 'contain',
      height: normalize(190),
      width: normalize(190)
    },
    android: {
      resizeMode: 'contain'
    }
  }),
 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  main:{ 
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center', 
    alignContent: 'center', 
    marginTop: 10,
    marginBottom: 20,
    flexGrow: 1
  }, 
  button:{
    marginLeft: 5,
    marginRight: 5, 
    marginTop: 10, 
    marginBottom: 10,
    borderRadius: 10, // adds the rounded corners
    backgroundColor: '#fff' 
   },
   title:{
    marginLeft: 5,
    marginRight: 5, 
    marginTop: 10, 
    marginBottom: 10,
    alignSelf: 'center' ,
   },
   container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: BaseColor.orangeColor
  },
  inputItem: {
    padding: 10
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockImage: {
    height: Utils.scaleWithPixel(150),
    width: "80%",
    borderRadius: 20,
    margin: 5
  },
  imagesGroup:{
    flexDirection:'row',
    alignSelf:'center',
    paddingLeft: 80,
    paddingRight:80
  }
   
})

