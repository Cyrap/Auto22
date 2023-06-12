<script lang="ts">
   import type { CarDto } from "car-api";

   let imageUrls = [
      "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
   ];

   export let trending: CarDto[];
</script>

<div
   id="image-track"
   data-mouse-down-at="0"
   data-prev-percentage="0"
   class="scrollable-container"
>
   {#each imageUrls as imageUrl}
      <img src={imageUrl} class="image" alt="img" />
   {/each}
</div>

<style>
   .scrollable-container {
      overflow-x: scroll;
      overflow-y: none;
      width: 90vw; /* Set the desired height for the scrollable container */
   }
   #image-track {
      display: flex;
      gap: 4vmin;
      margin: 30px;
      user-select: none; /* -- Prevent image highlighting -- */
   }

   #image-track > .image {
      width: 40vmin;
      height: 56vmin;
      object-fit: cover;
      /* object-position: 100% center; */
   }
</style>
