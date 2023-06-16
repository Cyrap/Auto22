<!-- CarButton.svelte -->
<script lang="ts">
   import type { CarDto } from "car-api";
   export let post: CarDto;
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher();

   function handleClick() {
      dispatch("carClicked", post);
   }
</script>

<button on:click={handleClick}>{post.madeCompany}</button>
