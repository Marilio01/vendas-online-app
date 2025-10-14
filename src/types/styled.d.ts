import 'styled-components/native';
import { theme } from '../shared/themes/theme'; 

type CustomTheme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {}
}