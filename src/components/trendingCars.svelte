<script lang="ts">
   import type { CarDto } from "car-api";
   import Car from "./car.svelte";
   import { onMount } from "svelte";
   export let posts: CarDto[] = [];
   let imageUrls = [
      {
         url: "./src/img/images.jpg",
         description: "Land 200",
      },
      {
         url: "./src/img/porter.jpg",
         description: "Porter zarna",
      },
      {
         url: "./src/img/prius.jpg",
         description: "Prius",
      },
      {
         url: "./src/img/aqua.jpg",
         description: "Description 4",
      },
      {
         url: "./src/img/200.jpg",
         description: "Description 4",
      },
      {
         url: "./src/img/2653900c2ac3a978_large.jpg",
         description: "Description 4",
      },
      {
         url: "./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg",
         description: "Description 4",
      },
   ];
   export let trending: CarDto[] = [];
   console.log(trending);

   onMount(() => {
      const scrollContent = document.getElementById(
         "scroll-content"
      ) as HTMLElement;
      const leftButton = document.querySelector(
         ".left-button"
      ) as HTMLElement | null;
      const rightButton = document.querySelector(
         ".right-button"
      ) as HTMLElement | null;

      if (leftButton && rightButton) {
         leftButton.addEventListener("click", () => {
            scrollContent.scrollBy({
               left: -250,
               behavior: "smooth",
            });
         });

         rightButton.addEventListener("click", () => {
            scrollContent.scrollBy({
               left: 250,
               behavior: "smooth",
            });
         });

         scrollContent.addEventListener("scroll", () => {
            const scrollPosition = scrollContent.scrollLeft;
            const scrollWidth = scrollContent.scrollWidth;
            const containerWidth = scrollContent.clientWidth;

            if (scrollPosition === 0) {
               leftButton.style.display = "none";
            } else {
               leftButton.style.display = "block";
            }

            if (scrollPosition + containerWidth >= scrollWidth) {
               rightButton.style.display = "none";
            } else {
               rightButton.style.display = "block";
            }
         });
      }
   });
   let isCarExpanded = false;
   function toggleImage() {
      isCarExpanded = !isCarExpanded;
   }

   console.log("Trending car data working: ", { trending });
</script>

{#if isCarExpanded}
   <Car />
{/if}

<div class="container">
   <div
      id="image-track"
      data-mouse-down-at="0"
      data-prev-percentage="0"
      class="scrollable-container"
   >
      <h4>Сүүлд нэмэгдсэн автомашинууд</h4>
      <button class="scroll-button left-button">&lt;</button>
      <div id="scroll-content">
         {#each imageUrls as { url, description }}
            <div class="image-container">
               <div class="image-wrapper" on:click={toggleImage}>
                  <img src={url} class="image" alt="img" />
                  <div class="image-description">{description}</div>
                  <button class="more-button">More</button>
               </div>
            </div>
         {/each}
         {#each trending as { madeCompany }}
            <div class="image-container">
               <div class="image-wrapper" on:click={toggleImage}>
                  <img
                     src="./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg"
                     class="image"
                     alt="img"
                  />
                  <div class="image-description">{madeCompany}</div>
                  <button class="more-button">More</button>
               </div>
            </div>
         {/each}
      </div>

      <button class="scroll-button right-button">&gt;</button>
   </div>
</div>

<style>
   .CarPage {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
   }

   .container {
      display: flex;
      width: 100vw;
      align-items: center;
      justify-content: center;
      overflow: hidden; /* Added to prevent horizontal scrollbar */
   }

   .scrollable-container {
      position: relative;
      width: 90vw;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
   }

   h4 {
      position: relative;
      left: 5%;
      font-size: 1.5rem;
      margin-top: 0; /* Added to remove default margin */
   }

   #scroll-content {
      display: flex;
      gap: 4vmin;
      margin: 30px;
      overflow: hidden;
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
      cursor: pointer; /* Added cursor pointer on hover */
      border: none; /* Removed default button border */
      outline: none; /* Removed default button outline */
   }

   .image-wrapper:hover .image {
      filter: blur(2px);
   }

   .image-wrapper:hover .more-button {
      opacity: 1;
   }

   .scroll-button {
      position: absolute;
      top: 30%;
      border: none;
      color: #ffffff;
      font-size: 1.5rem;
      transition: color 0.3s;
      background: rgba(0, 0, 0, 0.364);
      cursor: pointer; /* Added cursor pointer on hover */
      outline: none; /* Removed default button outline */
      border-radius: 10px;
      padding: 50px 10px;
   }

   .scroll-button:hover {
      color: #000;
   }

   .left-button {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      left: 0px;
   }

   .right-button {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      right: -0px;
   }
</style>
