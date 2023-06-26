<script lang="ts">
   export let searchResults: any = [];
   $: console.log(searchResults, "Search searchResults  are here");
</script>

<div>
   now you can see search result
   {searchResults}
   <ul>
      {#if searchResults}
         {#each searchResults as result}
            <div class="result">{result.madeYear}</div>
         {/each}
      {:else}
         {#each searchResults as result}
            <div>{result}</div>
         {/each}
         <div>Хайлтын үр дүн олдсонгүй...</div>
      {/if}
   </ul>
</div>

<style>
   div {
      background: blue;
   }
   ul {
      margin-top: 10px;
      margin-left: 5vw;
      background: red;
   }
   .result {
      background: var(--disabled);
      width: 70vw;
      height: 30px;
      border: #2f2f2f solid;
   }
</style>
