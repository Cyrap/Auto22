import { CarApi, OwnerApi, UsersApi } from "car-api";

export abstract class API {
   static baseUrl = "https://taiwnaa.dev.spacehub.mn";

   static Car = new CarApi(undefined, API.baseUrl);
   static User = new UsersApi(undefined, API.baseUrl);
   static Owner = new OwnerApi(undefined, API.baseUrl);
}