<script lang="ts">
   import Swiper from 'swiper';
   import 'swiper/css';
   import 'swiper/css/navigation';
   import Area_1 from "./Area-1.svelte";
   import Area_2 from "./Area-2.svelte";
   import Area_3 from "./Area-3.svelte";
   import Area_4 from "./Area-4.svelte";
   import type {UserDto} from "car-api";
   import { onMount } from 'svelte';
   let swiper;
   import type { CarDto } from 'car-api';
   export let posts: CarDto[] = [];
   export let CurrentUser: UserDto | undefined = undefined;
   let current = 1;
   function dic() {
      current = current - 1;
      if (current < 1) {
         current = 4;
      }
   }
   function inc() {
      current = current + 1;
      if (current > 4) {
         current = 1;
      }
   }
</script>
{#if current == 1}
  <Area_1 {posts} {CurrentUser}/>
{:else if current == 2}
  <Area_2 {posts}/>
{:else if current == 3}
  <Area_3 {posts}/>
{:else}
  <Area_4 {posts}/>
{/if}

<button class="dec" on:click={dic}>❮</button>
<button class="inc" on:click={inc}>❯</button>
<div class="num">{current}/{4}</div>
<style>
   
   * {
      margin: 0;
      padding: 0;
   }

   .inc,
   .dec {
      cursor: pointer;
      width: auto;
      font-weight: bold;
      font-size: 28px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
      font-size: 2rem;
      border: none;
      position:relative;
      top: -60vh;
      background: none;
      z-index:10;
   } 
   .inc{
      left:95vw;
   }
   .dec{
      left:2vw;
   }
   .num {
      font-size: 1.4rem;
      position: relative;
      top: 70%;
      left: -16%;
      color: rgb(255, 255, 255);
      background-color: rgba(0, 0, 0, 0.493);
      width: 3rem;
      text-align: center;
      padding: 3px;
      border-radius: 2px;
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