<script lang="ts">
   import { onMount } from "svelte";

   import CarElement from "./car.svelte";

   interface Car {
      mark: string;
      age: number;
      color: string;
      phone: number;
      roadTraveled: string;
      power: number;
   }

   let cars: Car[] = [
      // ... car objects
      {
         mark: "Kia",
         age: 2023,
         color: "black",
         phone: 99111111,
         roadTraveled: "0km",
         power: 1000,
      },
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

   function handleNameChange(event: any, row: Car) {
      row.mark = event.target.innerText;
   }

   function handleAgeChange(event: any, row: Car) {
      row.age = parseInt(event.target.innerText);
   }
</script>

<CarElement bind:isInfoVisible />

<div class="list-info">
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
               <td
                  contenteditable="true"
                  on:blur={(e) => handleNameChange(e, car)}>{car.mark}</td
               >
               <td
                  contenteditable="true"
                  on:blur={(e) => handleAgeChange(e, car)}>{car.age}</td
               >
               <td
                  contenteditable="true"
                  on:blur={(e) => handleNameChange(e, car)}>{car.color}</td
               >
               <td
                  contenteditable="true"
                  on:blur={(e) => handleNameChange(e, car)}>{car.phone}</td
               >
               <td
                  contenteditable="true"
                  on:blur={(e) => handleNameChange(e, car)}
                  >{car.roadTraveled}</td
               >
               <td><button on:click={showCarInfo}>{car.mark}</button></td>
            </tr>
         {/each}
      </tbody>
   </table>
</div>

<style>
   .list-info {
      margin-left: -30vw;
      background: var(--background-color);
      width: 90vw;
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
