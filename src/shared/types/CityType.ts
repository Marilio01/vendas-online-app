import { StateType } from './StateType';

export interface CityType {
  id: number;
  name: string;
  state?: StateType;
}