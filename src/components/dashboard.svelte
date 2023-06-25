<script lang="ts">
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   console.log("here is dashboard's :", posts);
   var expandedItem: string | null = null;

   function toggleItem(item: string) {
      if (expandedItem === item) {
         expandedItem = null;
      } else {
         expandedItem = item;
      }
   }
</script>

<div class="dashboard">
   <h4>Автомашин хайх</h4>
   <div class="data-list">
      <ul class="menu">
         <li class="paretLi" on:click={() => toggleItem("mark")}>
            Төрөл
            <span>{expandedItem === "mark" ? "▲" : "▼"}</span>
         </li>
         {#if expandedItem === "mark"}
            <div>
               {#each posts as post}
                  <li class="childLi">{post.turul}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li class="paretLi" on:click={() => toggleItem("company")}>
            Үйлдвэрлэгч
            <span>{expandedItem === "company" ? "▲" : "▼"}</span>
         </li>
         {#if expandedItem === "company"}
            <div>
               {#each posts as post}
                  <li class="childLi">{post.madeCompany}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li class="paretLi" on:click={() => toggleItem("model")}>
            Загвар
            <span>{expandedItem === "model" ? "▲" : "▼"}</span>
         </li>
         {#if expandedItem === "model"}
            <div>
               {#each posts as post}
                  <li class="childLi">{post.model}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li class="paretLi" on:click={() => toggleItem("age")}>
            Он
            <span>{expandedItem === "age" ? "▲" : "▼"}</span>
         </li>
         {#if expandedItem === "age"}
            <div>
               {#each posts as post}
                  <li class="childLi">{post.madeYear}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li class="paretLi" on:click={() => toggleItem("condition")}>
            Нөхцөл
            <span>{expandedItem === "condition" ? "▲" : "▼"}</span>
         </li>
         {#if expandedItem === "condition"}
            <div>
               {#each posts as post}
                  <li class="childLi">{post.condition}</li>
               {/each}
            </div>
         {/if}
      </ul>
   </div>
</div>

<style>
   span {
      position: absolute;
      left: 85%;
   }

   .dashboard {
      user-select: none; /* Standard syntax */
      position: relative;
      background-color: var(--primary-color);
      width: 30vw;
      max-width: 90%;
      height: auto;
      border-radius: 10px;
      margin: 2% auto;
   }

   .data-list {
      grid-gap: 10px;
      padding: 10px;
      list-style: none;
      margin: 10px 20px;
   }

   .menu {
      display: flex;
      flex-direction: column;
      list-style: none;
      z-index: 1;
   }

   div {
      border-radius: 10px;
      background: var(--background-color);
   }

   h4 {
      color: var(--background-color);
      position: relative;
      top: 0.3rem;
      left: 2rem;
      font-size: 2rem;
   }
   .paretLi {
      border-bottom: 1px rgba(110, 103, 103, 0.21) solid;
      padding: 0.5rem 20px;
   }
   .childLi {
      background: rgba(240, 232, 232, 0.358);
      height: 1rem;
      margin-left: 3rem;
      padding: 2px 10px;
   }
   .childLi:hover,
   .paretLi:hover {
      cursor: pointer;
      background: rgba(86, 79, 79, 0.542);
   }

   @media (max-width: 800px) {
      .dashboard {
         display: flex;
         flex-direction: column;
         width: 80vw;
         font-size: 12px;
      }
   }
</style>
