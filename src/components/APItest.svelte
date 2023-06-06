<!-- <script lang="ts">
   import { onMount } from "svelte";
   import axios from "axios";

   let responseData: any;

   onMount(async () => {
      try {
         const response = await axios.get("http://192.168.1.174:5262/api/Car");
         responseData = response.data; // Store the API response data
      } catch (error) {
         console.error(error);
      }
   });
</script>

<div>
   {#if responseData}
      <ul>
         {#each responseData as item}
            <li>{item}</li>
         {/each}
      </ul>
   {:else}
      <p>Loading...</p>
   {/if}
</div> -->
<script lang="ts">
   import { onMount } from "svelte";

   let swaggerData: any = null;

   // Fetch Swagger data from the URL
   async function fetchSwaggerData() {
      try {
         const response = await fetch("https://catfact.ninja/fact");
         swaggerData = await response.json();
      } catch (error) {
         console.error("Error fetching Swagger data:", error);
      }
   }

   // Call the fetchSwaggerData function when the component is mounted
   onMount(fetchSwaggerData);
   fetchSwaggerData();
</script>

{#if swaggerData}
   <!-- Render the Swagger data in your component -->
   <pre>{JSON.stringify(swaggerData, null, 2)}</pre>
{:else}
   <p>Loading Swagger data...</p>
{/if}
