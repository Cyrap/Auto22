<script>
   import { each } from "svelte/internal";
   const car = [
      {
         mark: "toyota",
      },
      {
         mark: "nissan",
      },
   ];
</script>

<div class="dashboard">
   <ul id="data-list">
      {#each car as item}
         <li>{item.mark}</li>
      {/each}
   </ul>
</div>

<style>
   .dashboard {
      position: relative;
      background-color: var(--background-color);
      width: 100vw;
      height: 30vh;
      border: #00172e;
      border-radius: 10px;
      background: var(--background-color);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      margin: 2%;
   }
   ul {
      display: grid;
      grid-template-columns: repeat(3, 0.5fr);
      margin: 10px;
      padding: 10px;
   }
   ul li {
      text-align: center;
      width: 40%;
      border-bottom: #596a7b42 solid;
      list-style: none;
   }
</style>
