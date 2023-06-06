<script>
   var cars2 = [
      {
         mark: "prius",
         age: 2001,
         color: "white",
         phone: "94232720",
         roadTraveled: "2400km",
         power: 240,
      },
   ];
</script>

<div>
   <div class="list-info">
      <ul id="car-list" />
      <table id="carTable">
         <thead>
            <tr>
               <th>Автомашины марк</th>
               <th>Үйлдвэрлэсэн он</th>
               <th>Өнгө</th>
               <th>Холбогдох утас</th>
               <th>Туулсан зам</th>
               <th>Хүч</th>
            </tr>
         </thead>
         <tbody>
            {#each cars2 as car}
               <tr>
                  <td>{car.mark}</td>
                  <td>{car.age}</td>
                  <td>{car.color}</td>
                  <td>{car.phone}</td>
                  <td>{car.roadTraveled}</td>
                  <td>{car.power}HP</td>
               </tr>
            {/each}
         </tbody>
      </table>
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

   th,
   td {
      border: 1px solid var(--hover-color);
      padding: 8px;
   }

   th {
      background-color: var(--background-color);
   }

   tr:nth-child(even) {
      background-color: var(--background-color);
   }

   tr:hover {
      background-color: var(--hover-color);
   }
</style>
