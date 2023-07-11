<script lang="ts">
   import { createEventDispatcher } from "svelte";
   import type { SearchResult as SR } from "minisearch";
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   export let searchResults: SR[] | undefined | null = [];
   var titles: any = {
      carNumber: "Машины дугаар",
      color: "Өнгө",
      condition: "Нөхцөл",
      engine: "Хөдөлгүүр",
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
      ownerId: "ezemshigch id",
   };
   // $: console.log(searchResults, "Search searchResults  are here");

   let selectedCar: CarDto | null;
   const dispatcher = createEventDispatcher();

   const openModal = (car: CarDto) => {
      selectedCar = car;
      dispatcher("modalOpen");
   };

   const closeModal = () => {
      selectedCar = null;
      dispatcher("modalClose");
   };
</script>

<div class="container">
   <div class="parent">
      {#if searchResults && searchResults.length !== 0}
         <p class="search-info">Хайлтын үр дүн ({searchResults.length})</p>
         {#each searchResults as result}
            {#each posts as post}
               {#if result.oid?.toString() == post.oid?.toString()}
                  <div class="result" on:click={() => openModal(post)}>
                     <div class="info">
                        <strong>{titles.model}:</strong>
                        {post.model}
                     </div>
                     <div class="info">
                        <strong>{titles.phone}:</strong>
                        {post.phone}
                     </div>
                  </div>
               {/if}
            {/each}
         {/each}
      {:else}
         <div class="error">Хайлтын үр дүн олдсонгүй...</div>
      {/if}
   </div>
   {#if selectedCar}
      <div class="modal" on:click={closeModal}>
         <div class="modal-content" on:click={(e) => e.stopPropagation()}>
            <div class="modal-close" on:click={closeModal}>Close</div>
            <div class="modal-body">
               {#each Object.entries(selectedCar) as [key, value]}
                  {#if key in titles}
                     <div class="modal-info">
                        <strong>{titles[key]}:</strong>
                        {value}
                     </div>
                  {/if}
               {/each}
            </div>
         </div>
      </div>
   {/if}
</div>

<style>
   p {
      position: absolute;
      top: 150px;
   }
   .container {
      height: inherit;
      min-height: 100vh;
      width: 100vw;
      background: var(--background-color);
      display: flex;
      justify-content: center;
      padding-bottom: 50px;
   }
   .parent {
      margin-top: 50px;
      height: inherit;
      width: 90vw;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
   }
   .result {
      background: var(--primary-color);
      padding: 10px;
      margin-top: 50px;
      border-radius: 4px;
      height: 25vh;
   }
   .info {
      margin-bottom: 8px;
   }
   .search-info {
      font-weight: bold;
      color: #888;
   }
   .error {
      font-style: italic;
   }

   .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
   }

   .modal-content {
      background-color: white;
      padding: 20px;
      max-width: 600px;
      width: 90%;
      border-radius: 8px;
   }

   .modal-close {
      cursor: pointer;
      text-align: right;
      color: #888;
   }

   .modal-body {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
   }

   .modal-info {
      margin-bottom: 8px;
   }
</style>
