<script lang="ts">
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   import { createEventDispatcher } from "svelte/internal";
   export let searchQuery = "";

   const dispatch = createEventDispatcher();

   const handleItemClick = (e: string | undefined) => {
      if (e) {
         const event = new CustomEvent("myevent", {
            detail: { data: e },
         });
         searchQuery = e;
         dispatch("myevent", event.detail);
      }
   };
</script>

<div class="sec-center">
   <input class="dropdown" type="checkbox" id="dropdown" name="dropdown" />
   <label class="for-dropdown" for="dropdown">Бүх ангилал </label>

   <div class="section-dropdown">
      <div class="option-container">
         {#each posts as post}
            <div class="childLi" on:click={() => handleItemClick(post.model?.toString())}>
               {post.model}
            </div>
         {/each}
      </div>
   </div>
</div>

<style>
   .option-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
   }
   .sec-center {
      position: relative;
      z-index: 100;
   }
   [type="checkbox"]:checked,
   [type="checkbox"]:not(:checked) {
      position: absolute;
      left: -9999px;
      opacity: 0;
      pointer-events: none;
   }
   .dropdown:checked + label,
   .dropdown:not(:checked) + label {
      position: relative;
      font-weight: 500;
      height: 2.5rem;
      transition: all 200ms linear;
      border-radius: 4px;
      width: 20vw;
      max-width: 200px;
      letter-spacing: 1px;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      align-items: center;
      -webkit-justify-content: center;
      -moz-justify-content: center;
      -ms-justify-content: center;
      justify-content: center;
      -ms-flex-pack: center;
      text-align: center;
      border: none;
      background-color: var(--primary-color);
      cursor: pointer;
      color: var(--background-color);
   }
   .section-dropdown {
      position: absolute;
      padding: 5px;
      background: white;
      top: 70px;
      left: -200px;
      width: inherit;
      border-radius: 4px;
      display: block;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px);
      transition: all 200ms linear;
   }

   .dropdown:checked ~ .section-dropdown {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
   }
   .childLi {
      background: rgb(255, 255, 255);
      border-bottom: 1px solid rgba(87, 76, 76, 0.27);
      text-align: center;
      cursor: pointer;
      width: 210px;
      padding: 1rem 0px;
      min-height: 2rem;
      margin: 0px 10px;
   }
   .childLi:hover {
      background: var(--primary-color);
      color: var(--background-color);
      font-weight: bold;
      border-radius: 3px;
   }
   @media screen and (max-width: 600px) {
      .dropdown:checked + label,
      .dropdown:not(:checked) + label {
         font-size: 0.9rem;
      }
   }
</style>
