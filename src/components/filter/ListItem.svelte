<script lang="ts">
   import type { CarDto } from "car-api";
   export let post: CarDto;
</script>

<ul>
   {#each Object.entries(post) as [key, value]}
      <li>{key}: {value}</li>
   {/each}
</ul>
