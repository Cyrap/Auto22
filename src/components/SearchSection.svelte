<script lang="ts">
   import type { SearchResult } from "minisearch";
   import Search from "./Search.svelte";
   import type { CarDto } from "car-api";
   import Dashboard from "./Dashboard.svelte";
   export let selected: any;
   export let posts: CarDto[] = [];
   export let search: string = "";
   export let searchResults: SearchResult[] | undefined | null;
   export let searchQuery: any;
   const handleCustomEvent = (e: CustomEvent) => {
      searchResults = e.detail;
   };

   const home = () => {
      selected = "home";
      search = "";
   };
</script>

<div id="nav-container" data-theme="dark">
   <a href="/" id="logo" on:click={home}>
      <img id="logo-pic" src="../src/img/logo.png" alt="Logo" />
      <h1>Auto22.mn</h1>
   </a>
   <div class="search-container">
      <div class="search">
         <Search bind:search {posts} bind:searchResults on:myevent on:message bind:searchQuery />
      </div>

      <Dashboard {posts} bind:searchQuery />
   </div>
</div>

<style>
   .search-container {
      display: flex;
      align-items: center;
      flex-direction: row;
      position: absolute;
      left: 30%;
   }
   h1 {
      color: var(--background-color);
      font-size: 1.8rem;
   }
   #nav-container {
      z-index: 99;
      background: linear-gradient(0, var(--background-color), var(--disabled));
      display: flex;
      position: sticky;
      top: 0;
      align-items: center;
      height: 70px;
   }
   .search {
      margin-left: 30px;
   }
   #nav-container #logo {
      display: flex;
      align-items: center;
      color: var(--text-color);
      cursor: pointer;
      text-decoration: none;
      padding-left: 2%;
   }
   #nav-container #logo #logo-pic {
      height: 60px;
   }

   @media (max-width: 850px) {
      h1 {
         display: none;
      }
      .search {
         position: relative;
         left: -100px;
      }
   }
</style>
