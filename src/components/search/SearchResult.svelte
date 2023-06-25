<script lang="ts">
   export let results: any[] = [];
   console.log(results, "Search results are here");
</script>

<div>
   <ul>
      {#each results as result}
         <div class="result">{result.model}</div>
      {/each}
   </ul>
   now you can see search result
</div>

<style>
   ul {
      margin-top: 10px;
      margin-left: 5vw;
   }
   .result {
      background: var(--disabled);
      width: 70vw;
      height: 30px;
      border: #2f2f2f solid;
   }
</style>
