<script lang="ts">
   import type { CarDto } from "car-api";
   import CloseButton from "./CloseButton.svelte";
   export let onClose: (() => any) | undefined = undefined;
   export let isInfoVisible: boolean = true;
   export let info: CarDto[] = [];
   export let post: CarDto;
   function hideCarInfo() {
      isInfoVisible = false;
      if (onClose) {
         onClose();
      }
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
   var titles: any = {
      carNumber: "Машины дугаар",
      color: "Өнгө",
      condition: "Нөхцөл",
      engine: " Хөдөлгүүр",
      engineCapacity: "Хөдөлгүүрийн багтаамж",
      hrop: "Хорооп",
      hutlugch: "Хөтлөгч",
      hvrd: "Хүрд",
      madeCompany: "Үйлдвэрлэсэн газар",
      madeMonth: "Үйлдвэрлэсэн сар",
      madeYear: "Үйлдвэрлэсэн жил",
      model: "Загвар",
      oid: "OID",
      phone: "Утас",
      power: "Хүч",
      roadTraveled: "Туулсан зам",
      turul: "Төрөл",
   };
</script>

<div class:register={isInfoVisible} class:hidden={!isInfoVisible}>
   <div class="main-container">
      <div class="slideshow-container">
         <div class="containerOfImage">
            {#if current == 1}
               <div class="img" class:Divexpanded={isImageExpanded}>
                  <img src="./src/img/VX-High01.jpg" alt="Image1s" on:click={toggleImage} class:expanded={isImageExpanded} />
                  {#if isImageExpanded}
                     <button class="close-button" on:click={toggleImage}>Close</button>
                  {/if}
               </div>
            {/if}
            {#if current == 2}
               <div class="img" class:Divexpanded={isImageExpanded}>
                  <img src="./src/img/200.jpg" alt="img2" on:click={toggleImage} class:expanded={isImageExpanded} />
                  {#if isImageExpanded}
                     <button class="close-button" on:click={toggleImage}>Close</button>
                  {/if}
               </div>
            {/if}
            {#if current == 3}
               <div class="img" class:Divexpanded={isImageExpanded}>
                  <img src="./src/img/200-side.jpg" alt="" on:click={toggleImage} class:expanded={isImageExpanded} />
                  {#if isImageExpanded}
                     <button class="close-button" on:click={toggleImage}>Close</button>
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
            {post.madeCompany}
            {#each info as i}
               {i.madeCompany}
            {/each}
         </h3>
         <form action="">
            <div id="form-container">
               <ul class="list">
                  {#each Object.entries(post) as [key, value]}
                     {#if key in titles}
                        <li>
                           <strong>{titles[key]}:</strong>
                           {value}
                        </li>
                     {/if}
                  {/each}
                  {#each info as i}
                     {#each Object.entries(i) as [key, value]}
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
         <div class="CloseButton">
            <CloseButton on:click={hideCarInfo} />
         </div>
      </div>
   </div>
</div>

<style>
   .CloseButton {
      position: absolute;
      left: 90%;
      top: 2%;
   }
   .expanded {
      z-index: 1;
      width: 90vw;
      height: 90vh;
   }
   .hidden {
      display: none;
   }
   * {
      margin: 0;
      padding: 0;
   }
   .main-container {
      display: flex;
      background: var(--primary-color);
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
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
   #form-container {
      width: 50vw;
      display: grid;
      padding: 40px;
   }
   .list {
      width: 35vw;
      height: inherit;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      box-shadow: none;
   }
   .list li {
      height: 1.2rem;
      width: 200px;
      list-style: none;
      padding: 10px;
   }
   .Divexpanded {
      position: sticky;
   }
   .Divexpanded {
      position: absolute;
      top: 0%;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: rgba(34, 32, 32, 0.748);
      display: flex;
      align-items: center;
      justify-content: center;
   }
   .Divexpanded ~ .inc {
      font-size: 5rem;
      left: 80vw;
      top: 28vh;
      transition: 0s;
   }
   .Divexpanded ~ .dec {
      font-size: 5rem;
      top: 28vh;
      transition: 0s;
   }
   .close-button {
      position: relative;
      left: 50vw;
      display: none;
   }
   .containerOfImage {
      width: 500px;
      height: 400px;
   }

   img {
      width: 40vw;
      height: 70vh;
      object-fit: cover;
      object-position: center;
      position: relative;
      top: -10vh;
      left: -5vw;
   }
   .inc,
   .dec {
      cursor: pointer;
      width: auto;
      padding: 44px 15px;
      margin-top: -20%;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
      color: rgb(255, 255, 255);
      font-size: 2rem;
      position: relative;
      top: -80%;
      border: none;
      background: none;
   }

   .inc {
      left: 100%;
   }

   .dec {
      left: -28%;
   }

   .num {
      font-size: 1.4rem;
      position: relative;
      top: -45%;
      color: rgb(255, 255, 255);
      left: 96.7%;
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
