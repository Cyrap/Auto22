<script lang="ts">
   import MiniSearch from "minisearch";
   import type { CarDto } from "car-api";
   import { createEventDispatcher } from "svelte";
   export let posts: CarDto[] = [];
   export let searchQuery = "";
   let searchResults: any[] = [];
   let miniSearch = new MiniSearch({
      idField: "oid",
      fields: ["model"],
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
      console.log(searchResults, "is here");
      // dispatch("search", searchResults);
      dispatch("myevent", searchResults);
   };

   $: handleSearch(), searchQuery;
</script>

<div style="display: none;" />

<div class="container">
   <form>
      <label for="search">Хайх машинаа оруулна уу</label>
      <input id="search" type="search" placeholder="Search..." bind:value={searchQuery} />
      <!-- <button type="submit" on:click={handleSearch} on:click={performSearch}>Хайх</button> -->
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
      --height: 3rem;
      --btn-width: 12rem;
      --bez: cubic-bezier(0, 0, 0.43, 1.49);
   }

   form {
      position: relative;
      background: var(--color-brand);
      border-radius: var(--rad);
      width: 100%;
      display: flex;
      align-items: center;
   }
   input,
   button {
      height: var(--height);
      font-family: var(--font-fam);
      border: 0;
      color: var(--color-dark);
      font-size: 1.2rem;
   }
   input[type="search"] {
      outline: 0;
      flex: 1;
      background: var(--color-light);
      padding: 0 1.6rem;
      border-top-left-radius: var(--rad);
      border-bottom-left-radius: var(--rad);
      appearance: none;
      transition: all var(--dur) var(--bez);
      z-index: 1;
      position: relative;
      border: 1px rgba(47, 47, 47, 0.466) solid;
   }
   button {
      display: block;
      width: var(--btn-width);
      font-weight: bold;
      padding: 0px 10px;
      background: var(--color-brand);
      border-radius: 0 var(--rad) var(--rad) 0;
      cursor: pointer;
   }
   label {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
   }
   @media (max-width: 600px) {
      input {
         width: 200px;
      }
   }
</style>
