<script lang="ts">
   import type { CarDto } from "car-api";
   import CarButton from "./CarButton.svelte";
   import Car from "./Car.svelte";
   import { register } from "swiper/element/bundle";
   export let posts: CarDto[] = [];
   let selectedCar: CarDto | null;
   const onClose = () => {
      selectedCar = null;
   };
   register();
   const spaceBetween = 100;
</script>

<div class="container">
   <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0" class="scrollable-container">
      <h4>Сүүлд нэмэгдсэн автомашинууд</h4>
      <swiper-container
         slides-per-view={5}
         swiper.animating
         space-between={spaceBetween}
         pagination={{
            hideOnClick: true,
         }}
         breakpoints={{
            700: {
               slidesPerView: 4,
            },
            400: {
               slidesPerView: 2,
            },
            200: {
               slidesPerView: 1,
            },
         }}
      >
         {#each posts as post}
            <swiper-slide>
               <div class="image-container">
                  <div class="image-wrapper">
                     <img src="./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg" class="image" alt="img" />
                     <div class="image-description">
                        {post.model}
                     </div>

                     <div class="more-button">
                        <CarButton {post} on:carClicked={(event) => (selectedCar = event.detail)}>
                           <span>Дэлгэрэнгүй</span>
                        </CarButton>
                     </div>
                  </div>
               </div>
            </swiper-slide>
         {/each}
      </swiper-container>
   </div>
</div>

{#if selectedCar}
   <Car post={selectedCar} {onClose} />
{/if}

<style>
   .container {
      display: flex;
      width: 100vw;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 30px 0px;
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
      margin-top: 0;
   }
   .image-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      scroll-snap-align: start;
      padding: 20px;
      margin-bottom: 20px;
   }
   .image-wrapper {
      width: 50vmin;
      border-radius: 5px;
      height: 35vmin;
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
      cursor: pointer;
      border: none;
      outline: none;
   }
   .image-wrapper:hover .image {
      filter: blur(2px);
   }
   .image-wrapper:hover .more-button {
      opacity: 1;
   }
</style>
