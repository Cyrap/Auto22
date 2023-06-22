<script lang="ts">
   import type { CarDto } from "car-api";
   export let post: CarDto;
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher();
   function handleClick() {
      dispatch("carClicked", post);
   }
</script>

<button on:click={handleClick}>{post.model}</button>

<style>
   button {
      background: var(--primary-color);
      padding: 15px 70px;
      border-radius: 10px;
      border: none;
      color: white;
      font-weight: bold;
      font-size: 1.1rem;
   }
</style>
