import axios from "axios";
import { CarApi, CarParkingApi, EmailApi, OwnerApi, ParkingApi, UsersApi } from "car-api";

export abstract class API {
   static baseUrl = "https://taiwnaa.dev.spacehub.mn";

   static instance = (() => {
      const k = axios.create({ baseURL: this.baseUrl, })
      k.interceptors.request.use((config) => {
         config.headers ??= {};
         config.headers["Authorization"] = localStorage.getItem("token") ?? "karma";
         return config;
      });
      return k;
   })();

   static Car = new CarApi(undefined, API.baseUrl, API.instance);
   static User = new UsersApi(undefined, API.baseUrl, API.instance);
   static Owner = new OwnerApi(undefined, API.baseUrl, API.instance);
   static CarParking = new CarParkingApi(undefined, API.baseUrl, API.instance);
   static Parking = new ParkingApi(undefined, API.baseUrl, API.instance);
   static Email = new EmailApi(undefined, API.baseUrl, API.instance);
}