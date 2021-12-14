import { Dimensions } from "react-native";

const Dim = {
    WindowWidth : Dimensions.get('window').width,
    WindowHeight : Dimensions.get('window').height,
    ScreenWidth : Dimensions.get('screen').width,
    ScreenHeight : Dimensions.get('screen').height
}

export default Dim;