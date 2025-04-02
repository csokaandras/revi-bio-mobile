import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  flex_col: {
    display: "flex",
    flexDirection:'column'
  },
  flex_row: {
    display: "flex",
    flexDirection:'row'
  },
  flex_centered:{
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  },
  flex_Start:{
    justifyContent:"flex-start",
    alignContent:"flex-start",
    alignItems:"flex-start"
  },
  flex_End:{
    justifyContent:"flex-end",
    alignContent:"flex-end",
    alignItems:"flex-end"
  },
  text_base: {
    fontSize: 16,
  },
  text_lg:{
    fontSize: 18,
  },
  text_2xl:{
    fontSize: 24,
  },
  text_4xl:{
    fontSize: 36,
  },
  text_5xl:{
    fontSize: 48,
  },
  text_6xl:{
    fontSize: 60,
  },
  bg_rose_500:{
    backgroundColor: "#f43f5e"
  },
  bg_zinc_900:{
    backgroundColor: "#18181b"
  },
  bg_zinc_700:{
    backgroundColor: "#3f3f46"
  },
  bg_zinc_100:{
    backgroundColor: "#f4f4f5"
  },
  bg_zinc_400:{
    backgroundColor: "#a1a1aa"
  }, 
  text_zinc_100:{
    color: "#f4f4f5"
  },
  text_zinc_400:{
    color: "#a1a1aa"
  },  
  text_zinc_600:{
    color: "#52525b"
  }, 
  text_rose_500:{
    color: "#f43f5e"
  }, 
  h_full:{
    height: "100%"
  },
  w_full:{
    width: "100%"
  },
  gap_5:{
    gap: 20
  },
  gap_2:{
    gap: 8
  },
  relative:{
    position:"relative"
  },
  absolute:{
    position:"absolute"
  },
  wrap:{
    flexWrap: "wrap"
  }
});

export default globalStyles;
