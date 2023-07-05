<script lang="ts">
   import type { UserDto } from "car-api";
   export let CurrentUser: UserDto | null;
   import { API } from "../logic/api";
   import type { CarDto } from "car-api";
   import { onMount } from "svelte/internal";

   let busy = true;
   let error: any;
   let posts: CarDto[] = [];
   const getPosts = async () => {
      busy = true;
      try {
         const res = await API.Car.apiCarGet();
         return res.data.items ?? [];
      } catch (e) {
         error = e;
      } finally {
         busy = false;
      }
      return [];
   };

   onMount(async () => {
      posts = await getPosts();
   });
</script>

<div class="container">
   <div class="car-list">your owned cars here</div>
   <div class="profile">
      Welcome {CurrentUser?.oid}
   </div>
</div>

<style>
   .container {
      height: 100vh;
      width: 100vw;
      background: rgb(35, 34, 34);
      display: flex;
      align-items: center;
   }
   .car-list {
      background: rgb(199, 199, 208);
      height: 50vh;
      width: 50vw;
   }
   .profile {
      background: rgb(146, 159, 146);
      height: 50vh;
      width: 30vw;
   }
</style>
