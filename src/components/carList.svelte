<script lang="ts">
   import { onMount, afterUpdate } from "svelte";
   import type { CarDto } from "car-api";
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher();
   export let posts: CarDto[] = [];
   let columnWidths: Record<string, number> = {};
   onMount(() => {
     if (posts.length > 0) {
       const firstPost = posts[0];
       for (const key in firstPost) {
         columnWidths[key] = 0; // Set initial width (adjust as needed)
       }
     }
   });
   afterUpdate(() => {
     dispatch("columnWidthsUpdated", columnWidths);
   });
   let isResizing = false;
   let startX = 0;
   let startWidth = 0;
   let resizingKey = "";
   function handleMouseDown(event: MouseEvent, key: string) {
     isResizing = true;
     startX = event.clientX;
     startWidth = columnWidths[key] || 0;
     resizingKey = key;
   }
   function handleMouseMove(event: MouseEvent) {
     if (!isResizing) return;
     const widthChange = event.clientX - startX;
     columnWidths = {
       ...columnWidths,
       [resizingKey]: startWidth + widthChange,
     };
   }
   function handleMouseUp() {
     isResizing = false;
     startX = 0;
     startWidth = 0;
     resizingKey = "";
   }
 </script>
 <div class="list-info">
   <div class="table-container">
     {#if posts.length > 0}
       <table id="carTable">
         <thead>
           <tr class="table-row">
             {#each Object.entries(posts[0]) as [key, value]}
               <th
                 class="resizable"
                 style="min-width: 50px; width: {columnWidths[key]}px;"
                 on:mousedown={(event) => handleMouseDown(event, key)}
                 on:mousemove={handleMouseMove}
                 on:mouseup={handleMouseUp}
               >
                 <div
                   class="resizer"
                   on:mouseenter={() => document.body.style.cursor = 'col-resize'}
                   on:mouseleave={() => document.body.style.cursor = ''}
                 ></div>
                 {key}
               </th>
             {/each}
           </tr>
         </thead>
         <tbody>
           {#each posts as post}
             <tr>
               {#each Object.values(post) as value}
                 <td>{value}</td>
               {/each}
             </tr>
           {/each}
         </tbody>
       </table>
     {:else}
       <p>No data available.</p>
     {/if}
   </div>
 </div>
 <style>
   .list-info {
     display: flex;
     justify-content: center;
     align-items: center;
     height: inherit;
     width: 100vw;
     background: var(--primary-color);
   }
 
   .table-container {
     overflow-x: auto;
     width: 90vw;
   }
 
   table {
     border-collapse: collapse;
     width: 100%;
     background: var(--background-color);
     border: 2px solid;
   }
 
   th,
   td {
     border: 1px solid var(--hover-color);
     padding: 8px;
   }
 
   th {
     background-color: var(--background-color);
     position: relative;
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
 
   .resizable {
     position: relative;
   }
 
   .resizer {
     position: absolute;
     top: 0;
     right: -5px;
     bottom: 0;
     width: 10px;
     background-color: #ccc;
     cursor: col-resize;
   }
 </style>
