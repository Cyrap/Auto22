<script lang="ts">
   import type { CarDto } from "car-api";
   import Car from "./Car.svelte";
   import CarButton from "./CarButton.svelte";
   export let posts: CarDto[] = [];
   const perPage = 10;
   let currentPage = 1;
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
   };
   function setPage(page: number) {
      currentPage = page;
   }
   let selectedCar: CarDto | null;
   const onClose = () => {
      selectedCar = null;
   };
   // lsvkdsvkdsvkdsvkdsvkdsvkdsvkdsvkdsvkdsvkdsvkdsvkd
   import VirtualList from "./filter/VirtualList.svelte";
   import ListItem from "./filter/ListItem.svelte";

   let searchTerm = "";

   $: filteredList = posts.filter((post) => post.model?.indexOf(searchTerm) !== -1);
   let start: any;
   let end: any;
   //lakgbbbbbbbbbbvdevdbsjksjksjksjksjksjksjksjksjksjksjksjksjksjksjkvb
</script>

<!-- kjdsvbjkvbdkjkdssssssssssssv -->
Filter: <input bind:value={searchTerm} />
{searchTerm}

<div class="container">
   <VirtualList posts={filteredList} bind:start bind:end let:item>
      {#each filteredList.slice(start, end) as post}
         <ListItem {post} />
      {/each}
   </VirtualList>
   <p>Showing items {start}-{end}</p>
</div>

<!-- kjdsvbjkvbdkjkdssssssssssssv -->
<div class="container">
   <div class="feed">
      {#each posts.slice((currentPage - 1) * perPage, currentPage * perPage) as post}
         <div class="car">
            <div class="image-wrapper">
               <img src="./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg" alt="car" />
            </div>
            <div class="information">
               <div class="first">
                  <h4>{post.model}</h4>
                  <ul>
                     {#each Object.entries(post) as [key, value]}
                        {#if key in titles}
                           <li>
                              <strong>{titles[key]}:</strong>
                              {value}
                           </li>
                        {/if}
                     {/each}
                  </ul>
               </div>
               <div class="main">
                  <CarButton {post} on:carClicked={(event) => (selectedCar = event.detail)} />
                  <div class="contact">{post.phone}</div>
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
         <button on:click={() => setPage(currentPage - 1)}>Previous</button>
      {/if}

      {#if currentPage > 3}
         <button on:click={() => setPage(1)}>1</button>
         <span>...</span>
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

      {#if currentPage < Math.ceil(posts.length / perPage) - 2}
         <span>...</span>
         <button on:click={() => setPage(Math.ceil(posts.length / perPage))}>{Math.ceil(posts.length / perPage)}</button>
      {/if}

      {#if currentPage < Math.ceil(posts.length / perPage)}
         <button on:click={() => setPage(currentPage + 1)}>Next</button>
      {/if}
   </div>
</div>

<style>
   :root {
      --secondary-color: #6c757d; /* Secondary color (gray) */
      --accent-color: var(--primary-color); /* Accent color (yellow) */
      --text-color: #333333; /* Text color (dark gray) */
      --background-color: #ffffff; /* Background color (white) */
   }
   .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
   }
   .car {
      background-color: var(--background-color);
      width: 70vw;
      height: 400px;
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      border: #333333 1px solid;
      margin-bottom: 10px;
   }
   .image-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
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
      padding: 1rem;
   }
   .first {
      padding-right: 1rem;
   }
   h4 {
      font-size: 2rem;
      margin-bottom: 1rem;
   }
   ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
   }
   li {
      list-style: none;
      margin-left: 1.5rem;
      display: flex;
      justify-content: space-between;
   }
   .main > div {
      padding: 0.5rem;
      border-radius: 10px;
      font-size: 1.4rem;
      text-align: center;
      margin: 0.5rem;
   }
   .contact {
      background: var(--primary-color);
      color: white;
   }
   .pagination {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
   }
   .pagination button,
   .pagination span {
      padding: 0.5rem 1rem;
      border: none;
      background-color: var(--secondary-color);
      color: white;
      margin-right: 0.5rem;
      cursor: pointer;
   }
   .pagination button.active {
      background-color: var(--accent-color);
   }
   .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
   }
</style>
