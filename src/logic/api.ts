import { CarApi } from "car-api";

export abstract class API {
   static Car = new CarApi(undefined, "http://192.168.1.174:5262");
}