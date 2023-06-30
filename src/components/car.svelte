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
                           {titles[key]}:
                           <strong> {value}</strong>
                        </li>
                     {/if}
                  {/each}
                  {#each info as i}
                     {#each Object.entries(i) as [key, value]}
                        <li>
                           <strong>{key}</strong>
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
      z-index: 1007;
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
      width: 48vw;
      position: relative;
      left: 50px;
      display: grid;
      padding: 60px;
      background: var(--background-color);
   }
   .list {
      width: 35vw;
      height: inherit;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      box-shadow: none;
      gap: 5px;
      font-size: 0.89em;
   }
   .list li {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      width: 200px;
      list-style: none;
      padding: 10px;
      border-bottom: 2px rgba(80, 75, 75, 0.363) solid;
   }
   .Divexpanded {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: rgba(34, 32, 32, 0.748);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 101;
   }
   .Divexpanded ~ .inc {
      font-size: 5rem;
      left: 83vw;
      transition: 0s;
      z-index: 102;
   }
   .Divexpanded ~ .dec {
      font-size: 5rem;
      transition: 0s;
      left: 0vw;
      z-index: 103;
   }
   .close-button {
      position: relative;
      left: 50vw;
      display: none;
   }
   .containerOfImage {
      width: 30vw;
      display: flex;
      align-items: center;
      height: 40vh;
   }

   img {
      width: 34vw;
      height: 60vh;
      object-fit: cover;
      object-position: center;
   }
   .inc,
   .dec {
      cursor: pointer;
      width: auto;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
      font-size: 2rem;
      position: relative;
      border: none;
      background: none;
   }

   .inc {
      left: -5%;
   }

   .dec {
      left: -115%;
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
   @media (max-width: 500px) {
      .main-container {
         flex-direction: column;
      }
   }
   @media (max-width: 1000px) {
      #form-container {
         width: 35vw;
      }
      .list {
         display: flex;
         flex-direction: column;
      }
   }
</style>
