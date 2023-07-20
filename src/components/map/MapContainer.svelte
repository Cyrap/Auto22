<script lang="ts">
import { onMount, onDestroy } from 'svelte';
   import Swiper from 'swiper';
   import 'swiper/css';
   import 'swiper/css/navigation';
   import Area_1 from "./Area-1.svelte";
   import Area_2 from "./Area-2.svelte";
   import Area_3 from "./Area-3.svelte";
   import Area_4 from "./Area-4.svelte";
   import type {UserDto} from "car-api";
   let swiper;
   let current = 1;
   import type { CarDto } from 'car-api';
   export let posts: CarDto[] = [];
   export let CurrentUser: UserDto | undefined = undefined;
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
  onMount(() => {
    window.addEventListener('keydown', handleArrowKeyPress);
  });
  onDestroy(() => {
    window.removeEventListener('keydown', handleArrowKeyPress);
  });
  function handleArrowKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      dic(); 
    } else if (event.key === 'ArrowRight') {
      inc();
    }
  }
</script>
<div class="area-name" on:click={inc}>
   {current}-р бүс
</div>
{#if current == 1}
  <Area_1 {posts}/>
{:else if current == 2}
  <Area_2 {posts}/>
{:else if current == 3}
  <Area_3 {posts}/>
{:else}
  <Area_4 {posts}/>
{/if}

<div class="button-container">
   <button class="dec" on:click={dic}>❮</button>
   <button class="inc" on:click={inc}>❯</button>
</div>

<div class="num">{current}/{4}</div>
<style>
   .button-container{
      width: 100vw;
      display: flex;
      justify-content: space-between;
   }
        .area-name{
         cursor : pointer;
         padding:10px;
      border-radius:10px;
         z-index:100;
      background:var(--primary-color);
      opacity : 0.8;
      position:absolute;
      top:130px;
      left:20px;
      color:var(--background-color);
      font-weight:bold;
      font-size:1.2rem;
   }
   * {
      margin: 0;
      padding: 0;
   }

 
   .inc ,
   .dec {
      margin: 0 20px;
      cursor: pointer;
      width: 50px;
      height: 50px;
      font-size: 28px;
      user-select: none;
      border-radius: 50%;
      font-size: 2rem;
      border: none;
      position:relative;
      top: -60vh;
      background: rgba(49, 46, 46, 0.482);
      z-index:10;
  appearance: none;
  font-size:3rem;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  position: relative;
  height:36px;
  width:40px;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.inc:hover ,
.dec:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.inc:disabled,
.dec:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.inc:active ,
.dec:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.inc:focus ,
.dec:focus {
  outline: 1px transparent;
}

.inc:before ,
.dec:before {
  display: none;
}

.inc:-webkit-details-marker ,
.dec:-webkit-details-marker {
  display: none;
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