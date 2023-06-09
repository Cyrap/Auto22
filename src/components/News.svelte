<script lang="ts">
   import type { CarDto } from "car-api";
   import { createEventDispatcher } from "svelte";
   import Car from "./Car.svelte";
   import CarButton from "./CarButton.svelte";
   export let posts: CarDto[] = [];
   const perPage = 20;
   let currentPage = 1;
   function setPage(page: number) {
      const container = document.querySelector(".container");
      if (container) {
         container.scrollTo({ top: 0, behavior: "smooth" });
      }
      currentPage = page;
   }
   let selectedCar: CarDto | null;
   const onClose = () => {
      selectedCar = null;
   };
   const dispatcher = createEventDispatcher();

   const openModal = (car: CarDto) => {
      selectedCar = car;
      dispatcher("modalOpen");
   };
</script>

<div class="container">
   <div class="feed">
      {#each posts.slice((currentPage - 1) * perPage, currentPage * perPage) as post}
         <div class="car">
            <div class="image-wrapper" on:click={() => openModal(post)}>
               <img src="./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg" alt="car" />
            </div>
            <div class="information">
               <div class="first">
                  <h4>{post.model}</h4>
                  <ul>
                     <li>
                        {post.price}
                     </li>
                  </ul>
                  <div class="MoreButton">
                     <CarButton {post} on:carClicked={(event) => (selectedCar = event.detail)} />
                  </div>
               </div>
            </div>
         </div>
      {/each}

      {#if selectedCar}
         <Car post={selectedCar} {onClose} />
      {/if}
   </div>
   <div class="pagination">
      {#if currentPage > 1}
         <button on:click={() => setPage(currentPage - 1)}>Өмнөх</button>
      {/if}
      {#if currentPage < 2}
         <button disabled>Өмнөх</button>
      {/if}

      {#if currentPage > 2}
         <button on:click={() => setPage(currentPage - 2)}>{currentPage - 2}</button>
      {/if}

      {#if currentPage > 1}
         <button on:click={() => setPage(currentPage - 1)}>{currentPage - 1}</button>
      {/if}

      <button class="active" disabled>{currentPage}</button>

      {#if currentPage * perPage < posts.length}
         <button on:click={() => setPage(currentPage + 1)}>{currentPage + 1}</button>
      {/if}

      {#if (currentPage + 1) * perPage < posts.length}
         <button on:click={() => setPage(currentPage + 2)}>{currentPage + 2}</button>
      {/if}
      {#if (currentPage + 1) * perPage < 3}
         <button on:click={() => setPage(4)}>4</button>
      {/if}
      {#if (currentPage + 1) * perPage < 4}
         <button on:click={() => setPage(5)}>5</button>
      {/if}
      {#if currentPage < Math.ceil(posts.length / perPage)}
         <button on:click={() => setPage(currentPage + 1)}>Дараагийнх</button>
      {/if}
   </div>
</div>

<style>
   .MoreButton {
      margin-left: 15%;
      margin-bottom: 10%;
   }

   :root {
      --secondary-color: #6c757d; /* Secondary color (gray) */
      --accent-color: var(--primary-color);
   }
   .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
   }
   .feed {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
   }
   .car {
      background: linear-gradient(130deg, #ffffff, rgba(244, 244, 255, 0.644));
      width: 20vw;
      display: grid;
      border: #333333 1px solid;
      border-radius: 10px;
      margin-top: 20px;
   }
   .car:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
      transition: 0.1s;
   }
   .image-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
   }

   img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
   }

   .information {
      display: grid;
      grid-template-columns: 3fr 1fr;
   }
   .first {
      padding-right: 1rem;
   }
   h4 {
      font-size: 1.3rem;
      width: 100%;
      margin: 10px 30px;
   }
   ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      padding-top: 10px;
   }
   li {
      font-size: 1.5rem;
      font-weight: bold;
      list-style: none;
      color: var(--primary-color);
      position: relative;
      right: -15%;
   }
   .pagination {
      margin-top: 30px;
   }
   .pagination button {
      appearance: none;
      background-color: #fafbfc;
      border: 1px solid rgba(27, 31, 35, 0.15);
      border-radius: 6px;
      box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
      box-sizing: border-box;
      color: #24292e;
      cursor: pointer;
      display: inline-block;
      font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      list-style: none;
      padding: 6px 16px;
      position: relative;
      transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: middle;
      white-space: nowrap;
      word-wrap: break-word;
   }

   .pagination button:hover {
      background-color: #f3f4f6;
      text-decoration: none;
      transition-duration: 0.1s;
   }

   .pagination button:disabled {
      background-color: #fafbfc;
      border-color: rgba(27, 31, 35, 0.15);
      color: #959da5;
      cursor: default;
   }

   .pagination button:active {
      background-color: #edeff2;
      box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
      transition: none 0s;
   }

   .pagination button:focus {
      outline: 1px transparent;
   }

   .pagination button:before {
      display: none;
   }

   .pagination button:-webkit-details-marker {
      display: none;
   }
   @media (max-width: 768px) {
      .car {
         grid-template-columns: 1fr;
         height: auto;
      }
      .information {
         grid-template-columns: 1fr;
      }

      .first {
         padding-right: 0;
      }

      .image-wrapper {
         height: 200px;
      }
   }
   @media (max-width: 500px) {
      .car {
         grid-template-columns: 1fr;
         height: auto;
         width: 90vw;
         font-size: 12px;
      }
   }
</style>
