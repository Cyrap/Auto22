<script lang="ts">
   export let results: any[] = [];
   $: console.log(results, "Search results are here");
</script>

<div>
   now you can see search result
   <ul>
      {#each results as result}
         <div class="result">{result.terms}</div>
      {/each}
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
