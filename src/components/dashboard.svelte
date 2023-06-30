<script lang="ts">
   import { onMount } from "svelte";
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   import { createEventDispatcher } from "svelte/internal";
   export let searchQuery = "";
   let expandedItem: string | null = null;
   let isMinimized = false;
   const dispatch = createEventDispatcher();
   function toggleItem(item: string) {
      if (expandedItem === item) {
         expandedItem = null;
      } else {
         expandedItem = item;
      }
   }
   function toggleMinimize() {
      isMinimized = !isMinimized;
   }

   const handleItemClick = (e: string | undefined) => {
      if (e) {
         const event = new CustomEvent("myevent", {
            detail: { data: e },
         });
         searchQuery = e;
         dispatch("myevent", event.detail);
      }
   };

   onMount(() => {
      function handleOutsideClick(event: MouseEvent) {
         const dashboard = document.querySelector(".dashboard");
         if (dashboard && !dashboard.contains(event.target as Node)) {
            isMinimized = false;
         }
      }
      document.addEventListener("click", handleOutsideClick);
      return () => {
         document.removeEventListener("click", handleOutsideClick);
      };
   });
</script>

<div class="dashboard" class:isMinimized on:click={toggleMinimize} tabindex="0">
   {#if !isMinimized}
      <h4>Бүх ангилал</h4>
      <div class="data-list">
         <ul class="menu">
            <li class="paretLi" on:click={() => toggleItem("mark")}>
               Төрөл
               <span>{expandedItem === "mark" ? "▲" : "▼"}</span>
            </li>
            {#if expandedItem === "mark"}
               <div>
                  {#each posts as post}
                     <li class="childLi" on:click={() => handleItemClick(post.turul?.toString())}>
                        {post.turul}
                     </li>
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
                     <li class="childLi" on:click={() => handleItemClick(post.madeCompany?.toString())}>
                        {post.madeCompany}
                     </li>
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
                     <li class="childLi" on:click={() => handleItemClick(post.model?.toString())}>
                        {post.model}
                     </li>
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
                     <li class="childLi" on:click={() => handleItemClick(post.madeYear?.toString())}>
                        {post.madeYear}
                     </li>
                  {/each}
               </div>
            {/if}
         </ul>
         <ul class="menu">
            <li class="paretLi" on:click={() => toggleItem("condition")} on:keydown={() => toggleItem("condition")}>
               Нөхцөл
               <span>{expandedItem === "condition" ? "▲" : "▼"}</span>
            </li>
            {#if expandedItem === "condition"}
               <div>
                  {#each posts as post}
                     <li class="childLi" on:click={() => handleItemClick(post.condition?.toString())}>
                        {post.condition}
                     </li>
                  {/each}
               </div>
            {/if}
         </ul>
      </div>
   {/if}
</div>

<style>
   span {
      position: absolute;
      left: 85%;
   }

   .dashboard {
      user-select: none; /* Standard syntax */
      position: relative;
      /* background-color: var(--disabled); */
      width: 30vw;
      max-width: 280px;
      height: auto;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      position: sticky !important;
      top: 0%;
      transition: width 0.2s ease-in-out;
   }

   .dashboard.isMinimized {
      width: 50px;
      height: 50px;
      border-radius: 50%;
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

   h4 {
      position: relative;
      top: 0.3rem;
      left: 2rem;
      font-size: 1.3rem;
      margin: 20px 30px;
   }
   .paretLi {
      border-bottom: 2px rgba(110, 103, 103, 0.21) solid;
      padding: 0.5rem 20px;
   }
   .childLi {
      border-bottom: 2px rgba(110, 103, 103, 0.21) solid;
      height: 1rem;
      padding-top: 2px;
      margin-left: 1rem;
      padding: 5px 10px;
   }
   .childLi:hover,
   .paretLi:hover {
      cursor: pointer;
      background: rgba(171, 161, 161, 0.382);
   }

   @media (max-width: 800px) {
      .dashboard {
         display: flex;
         flex-direction: column;
         width: 80vw;
         font-size: 12px;
      }
      .dashboard.isMinimized {
         width: 100%;
      }
      .dashboard {
         position: absolute;
         border-radius: 10px;
      }
      h4 {
         margin-top: 10px;
      }
   }
</style>
