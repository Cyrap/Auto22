<script lang="ts">
   import type { UserDto } from "car-api";
   import { API } from "../logic/api";
   import type { CarDto } from "car-api";
   import type { SearchResult as SR } from "minisearch";
   import { createEventDispatcher } from "svelte";
   import MiniSearch from "minisearch";
   export let CurrentUser: UserDto[];
   export let posts: CarDto[] = [];
   let search = ""; // Initialize with a default value
   let searchResults: SR[] = [];
   let searchQuery = CurrentUser[0].oid;
   let busy = true;
   let error: any;
   let miniSearch = new MiniSearch({
      idField: "oid",
      fields: ["posts[0].ownerId"],
      storeFields: ["oid"],
      searchOptions: {
         boost: { title: 2 },
         fuzzy: 0.8,
      },
   });

   const updateData = (posts: CarDto[]) => {
      miniSearch.removeAll();
      miniSearch.addAll(posts);
   };

   $: updateData(posts);

   const dispatch = createEventDispatcher();

   const handleSearch = () => {
      searchResults = miniSearch.search(searchQuery);
      // console.log(searchResults, "is here");
      search = "search";
      dispatch("myevent", searchResults);
   };

   $: handleSearch(), searchQuery;
   // end current useriing id gaar hailt hiij tuhain hereglegchiin

   async function DeleteCar(carOID: number) {
      try {
         const response = await API.Car.apiCarIdDelete({ id: carOID });
         console.log(response);
         alert("Awtomashin ustgalt амжилттай");
      } catch (error) {
         console.error("ERROR IS HERE", error);
         alert("амжилтгүй");
      }
   }

   async function EditCar(carOID: number, newData: CarDto) {
      try {
         const response = await API.Car.apiCarIdPut({ id: carOID, carDto: newData });
         console.log(response);
         alert("Awtomashin zaswarlalt amjilttai");
      } catch (error) {
         console.error("ERROR IS HERE", error);
         alert("амжилтгүй");
      }
   }
   let editedData: CarDto = {};
</script>

<div class="container">
   <div class="car-list">
      your owned cars here
      {#each searchResults as result}
         <div>
            {result}
            <button on:click={() => DeleteCar(result.oid)}>delete car</button>
            <button on:click={() => EditCar(result.oid, editedData)}>Edit {result.oid} car</button>
            
         </div>
      {/each}
   </div>
   <div class="profile">
      Welcome
      {#each CurrentUser as data}
         {data}
      {/each}
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
