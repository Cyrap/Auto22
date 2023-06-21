<script lang="ts">
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   console.log("here is dashboard's :", posts);
   var isMarkVisible = false;
   var isCompanyVisible = false;
   var isModelVisible = false;
   var isAgeVisible = false;
   var isConditionVisible = false;
   function showMark() {
      isMarkVisible = !isMarkVisible;
   }
   function showCompany() {
      isCompanyVisible = !isCompanyVisible;
   }
   function showModel() {
      isModelVisible = !isModelVisible;
   }
   function showAge() {
      isAgeVisible = !isAgeVisible;
   }
   function showCondition() {
      isConditionVisible = !isConditionVisible;
   }
</script>

<div class="dashboard">
   <h4>Автомашин хайх</h4>
   <ul id="data-list ">
      <ul class="menu">
         <li on:click={showMark}>
            Төрөл<span
               >{#if isMarkVisible}
                  ▲
               {:else}
                  ▼
               {/if}
            </span>
         </li>
         {#if isMarkVisible}
            <div>
               {#each posts as post}
                  <li>{post.turul}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li on:click={showCompany}>
            Үйлдвэрлэгч<span
               >{#if isCompanyVisible}
                  ▲
               {:else}
                  ▼
               {/if}
            </span>
         </li>
         {#if isCompanyVisible}
            <div>
               {#each posts as post}
                  <li>{post.madeCompany}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li on:click={showModel}>
            Загвар<span
               >{#if isModelVisible}
                  ▲
               {:else}
                  ▼
               {/if}
            </span>
         </li>
         {#if isModelVisible}
            <div>
               {#each posts as post}
                  <li>{post.model}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li on:click={showAge}>
            Он<span
               >{#if isAgeVisible}
                  ▲
               {:else}
                  ▼
               {/if}
            </span>
         </li>
         {#if isAgeVisible}
            <div>
               {#each posts as post}
                  <li>{post.madeYear}</li>
               {/each}
            </div>
         {/if}
      </ul>
      <ul class="menu">
         <li on:click={showCondition}>
            Нөхцөл<span
               >{#if isConditionVisible}
                  ▲
               {:else}
                  ▼
               {/if}
            </span>
         </li>
         {#if isConditionVisible}
            <div>
               {#each posts as post}
                  <li>{post.condition}</li>
               {/each}
            </div>
         {/if}
      </ul>
   </ul>
</div>

<style>
   span {
      position: relative;
      left: 20%;
   }

   .dashboard {
      user-select: none; /* Standard syntax */
      position: relative;
      background-color: var(--primary-color);
      width: 100vw;
      max-width: 90vw;
      height: 20vh;
      border-radius: 10px;
      margin: 2% auto;
   }

   ul {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 10px;
      padding: 10px;
      list-style: none;
      margin: 0;
   }

   ul li {
      text-align: center;
      width: 140px;
      padding: 10px;
      cursor: pointer;
      background: var(--background-color);
      border-radius: 10px;
   }
   .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
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
</style>
