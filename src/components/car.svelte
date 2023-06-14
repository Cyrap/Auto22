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
      } else if (current > 3) {
         current = 1;
      }
   }
   function inc() {
      current = current + 1;
      if (current < 1) {
         current = 3;
      } else if (current > 3) {
         current = 1;
      }
   }
</script>

<div class:register={isInfoVisible} class:hidden={!isInfoVisible}>
   <div class="main-container">
      <div class="slideshow-container">
         <div class="containerOfImage">
            {#if current == 1}
               <div class="img">
                  <img
                     src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                     alt="Image1s"
                  />
               </div>
            {/if}

            {#if current == 2}
               <div class="img">
                  <img
                     src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                     alt="img2"
                  />
               </div>
            {/if}

            {#if current == 3}
               <div class="img">
                  <img
                     src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                     alt=""
                  />
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
               <form action="">
                  <div class="list">
                     {#each posts as post}
                        Үйлдвэрлэсэн газар: {post.madeCompany}
                     {/each}
                  </div>
                  <div class="list">
                     {#each posts as post}
                        Загвар: {post.model}
                     {/each}
                  </div>
                  <div class="list">
                     {#each posts as post}
                        Үйлдвэрлэсэн он:
                        {post.madeYear}
                     {/each}
                  </div>
               </form>
            </div>
         </form>
      </div>
      <div class="third">
         <button id="remove-register-form" on:click={hideCarInfo}>
            <div id="toogle">
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
      grid-template-rows: auto;
      padding: 40px;
   }

   .list {
      height: 2.5rem;
      margin: 10px;
      width: 500px;
      border-bottom: 5px rgba(140, 104, 104, 0.215) solid;
   }

   button {
      background-color: var(--primary-color);
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
      /* color: white; */
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
