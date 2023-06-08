<script lang="ts">
   import { onMount } from "svelte";

   import CarElement from "./car.svelte";

   interface Car {
      mark: string;
      age: number;
      color: string;
      phone: string;
      roadTraveled: string;
      power: number;
   }

   let cars: Car[] = [
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      {
         mark: "land",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
      // ... other car objects
   ];

   let currentPage = 1;
   const carsPerPage = 10; // Number of cars to display per page

   function handleNextPage() {
      currentPage++;
   }

   function handlePreviousPage() {
      if (currentPage > 1) {
         currentPage--;
      }
   }

   function getCurrentCars(): Car[] {
      const startIndex = (currentPage - 1) * carsPerPage;
      const endIndex = startIndex + carsPerPage;
      return cars.slice(startIndex, endIndex);
   }

   onMount(() => {
      // Fetch cars data from an API or perform any initialization tasks
   });
   let isInfoVisible = false;
   const showCarInfo = () => {
      isInfoVisible = true;
   };
</script>

<CarElement bind:isInfoVisible />
<div>
   <div class="list-info">
      <ul id="car-list" />
      <table id="carTable">
         <thead>
            <tr class="table-row">
               <th>Автомашины марк</th>
               <th>Үйлдвэрлэсэн он</th>
               <th>Өнгө</th>
               <th>Холбогдох утас</th>
               <th>Туулсан зам</th>
               <th>Дэлгэрэнгүй</th>
            </tr>
         </thead>
         <tbody>
            {#each getCurrentCars() as car}
               <tr>
                  <td>{car.mark}</td>
                  <td>{car.age}</td>
                  <td>{car.color}</td>
                  <td>{car.phone}</td>
                  <td>{car.roadTraveled}</td>
                  <td
                     ><button on:click={showCarInfo}>
                        {car.mark}
                     </button>
                  </td>
               </tr>
            {/each}
         </tbody>
      </table>

      <div>
         <!-- Pagination -->
         <button on:click={handlePreviousPage} disabled={currentPage === 1}
            >Previous</button
         >
         <button
            on:click={handleNextPage}
            disabled={currentPage * carsPerPage >= cars.length}>Next</button
         >
      </div>
   </div>
</div>

<style>
   .list-info {
      background: var(--background-color);
      width: 50vw;
   }

   table {
      border-collapse: collapse;
      width: 100%;
      height: 90vh;
      background: var(--background-color);
      border: 2px solid;
      position: relative;
      left: 35vw;
   }

   td > button {
      width: 100%;
      height: 100%;
   }

   th,
   td {
      border: 1px solid var(--hover-color);
      padding: 8px;
   }

   th {
      background-color: var(--background-color);
   }

   .table-row {
      height: 50px !important;
   }

   tr:nth-child(even) {
      background-color: var(--background-color);
   }

   tr:hover {
      background-color: var(--hover-color);
   }
</style>
