<script lang="ts">
   import type { CarDto } from "car-api";

   let imageUrls = [
      {
         url: "./src/img/images.jpg",
         description: "Land 200",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "./src/img/porter.jpg",
         description: "Porter zarna",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "./src/img/prius.jpg",
         description: "Prius",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "./src/img/aqua.jpg",
         description: "Description 4",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "./src/img/200.jpg",
         description: "Description 4",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "./src/img/2653900c2ac3a978_large.jpg",
         description: "Description 4",
         link: "/car", // Add the link property to the image object
      },
      {
         url: "./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg",
         description: "Description 4",
         link: "/car", // Add the link property to the image object
      },
   ];

   export let trending: CarDto[];
</script>

<div class="container">
   <div
      id="image-track"
      data-mouse-down-at="0"
      data-prev-percentage="0"
      class="scrollable-container"
   >
      <h4>Онцлох автомашинууд</h4>
      <div id="scroll-content">
         {#each imageUrls as { url, description, link }}
            <div class="image-container">
               <div class="image-wrapper">
                  <a href={link}>
                     <!-- Wrap the img element with an a tag and set the href attribute -->
                     <img src={url} class="image" alt="img" />
                  </a>
                  <div class="image-description">{description}</div>
                  <button class="more-button">More</button>
               </div>
            </div>
         {/each}
      </div>
   </div>
</div>

<style>
   .container {
      display: flex;
      width: 100vw;
      align-items: center;
      justify-content: center;
   }
   .scrollable-container {
      position: relative;
      width: 90vw; /* Set the desired width for the scrollable container */
      overflow: hidden;
      -webkit-overflow-scrolling: touch; /* Enable momentum scrolling on iOS devices */
   }
   h4 {
      position: relative;
      left: 5%;
      font-size: 1.5rem;
   }
   #scroll-content {
      display: flex;
      gap: 4vmin;
      margin: 30px;
      overflow-x: scroll;
      overflow-y: hidden;
      -ms-overflow-style: none; /* Hide scrollbar on Internet Explorer and Edge */
      scrollbar-width: none; /* Hide scrollbar on Firefox */
      scroll-snap-type: x mandatory;
   }

   .image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      scroll-snap-align: start;
   }

   .image-wrapper {
      width: 40vmin;
      border-radius: 5px;
      height: 25vmin;
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

   .more-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 2;
      background: rgba(255, 255, 255, 0.604);
      padding: 10px 30px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 1.2rem;
   }

   .image-wrapper:hover .image {
      filter: blur(2px);
   }

   .image-wrapper:hover .more-button {
      opacity: 1;
   }
</style>
