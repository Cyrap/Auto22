<script lang="ts">
   import MiniSearch from "minisearch";
   import type { CarDto } from "car-api";
   import type { SearchResult as SR } from "minisearch";
   import { createEventDispatcher } from "svelte";
   export let posts: CarDto[] = [];
   export let searchQuery = "";
   export let search = ""; // Initialize with a default value
   export let searchResults: SR[] | undefined | null = [];
   let miniSearch = new MiniSearch({
      idField: "oid",
      fields: ["power"],
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
</script>

<div class="container">
   <form>
      <input id="search" type="search" placeholder="Автомашин хайх..." bind:value={searchQuery} />
   </form>
</div>

<style>
   .container {
      height: inherit;
      width: 20vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
   }

   :root {
      --rad: 1.5rem;
      --dur: 0.3s;
      --color-dark: #2f2f2f;
      --color-light: var(--background-color);
      --color-brand: var(--primary-color);
      --font-fam: "Lato", sans-serif;
      --height: 2.5rem;
      --btn-width: 12rem;
      --bez: cubic-bezier(0, 0, 0.43, 1.49);
   }

   form {
      position: relative;
      background: var(--color-brand);
      border-radius: var(--rad);
      width: 110%;
      display: flex;
      align-items: center;
   }
   input {
      height: var(--height);
      font-family: var(--font-fam);
      border-radius: var(--rad);
      color: var(--color-dark);
      font-size: 1rem;
   }
   input[type="search"] {
      outline: 0;
      flex: 1;
      background: var(--color-light);
      padding: 0 1.6rem;
      appearance: none;
      transition: all var(--dur) var(--bez);
      z-index: 1;
      position: relative;
      border: 1px var(--primary-color) solid;
   }
   @media (max-width: 600px) {
      input {
         width: 200px;
      }
   }
</style>
