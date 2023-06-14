<script lang="ts">
   import { createEventDispatcher } from "svelte";
   import type { CarDto } from "car-api";

   export let posts: CarDto[] = [];
   export let isInfoVisible: boolean = true;
   const dispatch = createEventDispatcher();

   function hideCarInfo() {
      isInfoVisible = false;
   }

   export function showCarInfo() {
      isInfoVisible = true;
   }

   let current = 1;
   function dic() {
      current = current - 1;
      if (current < 1) {
         current = 3;
      }
   }

   function inc() {
      current = current + 1;
      if (current > 3) {
         current = 1;
      }
   }

   let isImageExpanded = false;
   function toggleImage() {
      isImageExpanded = !isImageExpanded;
   }
</script>

<div class:register={isInfoVisible} class:hidden={!isInfoVisible}>
   <div class="main-container">
      <div class="slideshow-container">
         <div class="containerOfImage">
            {#if current == 1}
               <div class="img">
                  <img
                     src="./src/img/VX-High01.jpg"
                     alt="Image1s"
                     on:click={toggleImage}
                     class:expanded={isImageExpanded}
                  />
                  {#if isImageExpanded}
                     <button class="close-button" on:click={toggleImage}
                        >Close</button
                     >
                  {/if}
               </div>
            {/if}

            {#if current == 2}
               <div class="img">
                  <img
                     src="./src/img/200.jpg"
                     alt="img2"
                     on:click={toggleImage}
                     class:expanded={isImageExpanded}
                  />
                  {#if isImageExpanded}
                     <button class="close-button" on:click={toggleImage}
                        >Close</button
                     >
                  {/if}
               </div>
            {/if}

            {#if current == 3}
               <div class="img">
                  <img
                     src="./src/img/200-side.jpg"
                     alt=""
                     on:click={toggleImage}
                     class:expanded={isImageExpanded}
                  />
                  {#if isImageExpanded}
                     <button class="close-button" on:click={toggleImage}
                        >Close</button
                     >
                  {/if}
               </div>
            {/if}

            <button class="dec" on:click={dic}>❮</button>
            <button class="inc" on:click={inc}>❯</button>
            <div class="num">
               {current}/{3}
            </div>
         </div>
      </div>
      <div class="second">
         <h3>
            {#each posts as post}
               {post.model}
            {/each}
         </h3>
         <div class="rate-container">
            <span class="rate-icon">&#9733;</span>
            <span class="rate-icon">&#9733;</span>
            <span class="rate-icon">&#9733;</span>
            <span class="rate-icon active">&#9733;</span>
            <span class="rate-icon">&#9733;</span>
         </div>
         <form action="">
            <div id="form-container">
               <ul class="list">
                  {#each posts as post}
                     {#each Object.entries(post) as [key, value]}
                        <li style="background: rgba(140, 104, 104, 0.215);">
                           <strong>{key}:</strong>
                           {value}
                        </li>
                     {/each}
                  {/each}
               </ul>
            </div>
         </form>
      </div>
      <div class="third">
         <button id="remove-register-form" on:click={hideCarInfo}>
            <div class="toggle">
               <div />
            </div>
         </button>
      </div>
   </div>
</div>

<style>
   .hidden {
      display: none;
   }

   * {
      margin: 0;
      padding: 0;
   }

   .main-container {
      display: flex;
   }

   .second {
      width: 30%;
      padding: 30px;
   }

   h3 {
      font-size: 2rem;
      margin-left: 50px;
   }

   .third {
      width: 25%;
      display: flex;
      align-items: start;
   }

   .rate-container {
      margin-left: 20px;
   }

   /* Slideshow container */
   .slideshow-container {
      height: 100vh;
      width: 50%;
      background-color: #717171;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   /* rate style */
   .rate-container {
      display: inline-block;
      cursor: pointer;
      padding: 30px;
   }

   .rate-icon {
      color: #ddd;
      font-size: 24px;
   }

   .rate-icon:hover,
   .rate-icon.active {
      color: #ffcc00;
   }

   #form-container {
      width: 50vw;
      display: grid;

      padding: 40px;
   }
   .list {
      width: 35vw;
      height: inherit;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      box-shadow: none;
   }
   .list li {
      height: 1.2rem;
      width: 200px;
      list-style: none;
      padding: 10px;
   }

   button {
      background-color: var(--disabled);
      padding: 10px;
      margin-top: 10px;
      position: relative;
      z-index: 989;
      color: var(--background-color);
      left: 50%;
      width: 50px;
      height: 50px;
      border: none;
      font-size: 2rem;
      border-radius: 50%;
      cursor: pointer;
   }

   .containerOfImage {
      width: 500px;
      height: 400px;
   }

   img {
      width: 500px;
      height: 400px;
      object-fit: cover;
      object-position: center;
   }

   .inc,
   .dec {
      cursor: pointer;
      width: auto;
      padding: 44px 15px;
      margin-top: -20%;
      background: none;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
      color: rgb(255, 255, 255);
      font-size: 2rem;
      position: relative;
      top: -55%;
      border: none;
   }

   .inc {
      left: 79%;
   }

   .dec {
      left: 0;
   }

   .num {
      font-size: 1.4rem;
      position: relative;
      top: -27%;
      color: white;
      left: 90%;
   }
   @keyframes fade {
      from {
         opacity: 0.4;
      }
      to {
         opacity: 1;
      }
   }
</style>
