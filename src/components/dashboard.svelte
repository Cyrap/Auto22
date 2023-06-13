<script>
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
   :root {
      --background-color: #f0f0f0;
   }

   .dashboard {
      position: relative;
      background-color: var(--background-color);
      width: 100vw;
      max-width: 1200px;
      height: 30vh;
      border-radius: 10px;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
      margin: 2% auto;
   }

   ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      padding: 10px;
      list-style: none;
      margin: 0;
   }

   ul li {
      text-align: center;
      border-bottom: 1px solid #596a7b42;
      padding: 10px;
      cursor: pointer;
   }
</style>
