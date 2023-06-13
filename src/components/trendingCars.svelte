<script lang="ts">
   import type { CarDto } from "car-api";

   let imageUrls = [
      {
         url: "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
         description: "Description 1",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
         description: "Description 2",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
         description: "Description 3",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
         description: "Description 4",
         link: "/car", // Add the link property to the image object
      },
   ];

   export let trending: CarDto[];
</script>

<div
   id="image-track"
   data-mouse-down-at="0"
   data-prev-percentage="0"
   class="scrollable-container"
>
   <div id="scroll-content">
      {#each imageUrls as { url, description, link }}
         <div class="image-container">
            <div class="image-wrapper">
               <a href={link}>
                  <!-- Wrap the img element with an a tag and set the href attribute -->
                  <img src={url} class="image" alt="img" />
               </a>
               <div class="image-description">{description}</div>
            </div>
         </div>
      {/each}
   </div>
</div>

<style>
   .scrollable-container {
      position: relative;
      width: 90vw; /* Set the desired width for the scrollable container */
      overflow: hidden;
      -webkit-overflow-scrolling: touch; /* Enable momentum scrolling on iOS devices */
   }

   #scroll-content {
      display: flex;
      gap: 4vmin;
      margin: 30px;
      overflow-x: scroll;
      overflow-y: hidden;
      -ms-overflow-style: none; /* Hide scrollbar on Internet Explorer and Edge */
      scrollbar-width: none; /* Hide scrollbar on Firefox */
   }

   .image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
   }

   .image-wrapper {
      width: 40vmin;
      height: 56vmin;
      overflow: hidden;
      position: relative;
   }

   .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
   }

   .image:hover {
      transform: scale(1.1);
   }

   .image-description {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      font-size: 14px;
      text-align: center;
   }
</style>
