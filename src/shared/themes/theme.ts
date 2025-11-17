import { buttonsTheme } from './buttons';
import {
  colors as newColors,
  textTheme as newTextTheme,
  inputTheme as newInputTheme,
} from './colors';
export const theme = {
  colors: {
    ...newColors,
    text: newTextTheme,
    input: newInputTheme,
  },

  buttons: buttonsTheme,
};
