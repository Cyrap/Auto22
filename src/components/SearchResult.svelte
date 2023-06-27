<script lang="ts">
   import type { SearchResult as SR } from "minisearch";
   export let searchResults: SR[] | undefined | null = [];
   $: console.log(searchResults, "Search searchResults  are here");
</script>

<div class="container">
   <div class="parent">
      {#if searchResults && searchResults.length !== 0}
         Хайлтын үр дүн{searchResults.length}
         {#each searchResults as result}
            <div class="result">{result.id}</div>
         {/each}
      {:else}
         <div class="error">Хайлтын үр дүн олдсонгүй...</div>
      {/if}
   </div>
</div>

<style>
   .container {
      height: inherit;
      min-height: 90vh;
      width: 100vw;
      background: var(--disabled);
      display: flex;
      justify-content: center;
   }
   .parent {
      background: rgb(148, 148, 148);
      height: inherit;
      width: 85vw;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
   }
   .result {
      background: green;
      height: 25vh;
      width: 150px;
   }
</style>
