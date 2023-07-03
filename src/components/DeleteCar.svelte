<script lang="ts">
   import { API } from "../logic/api";
   let carOID: number;
   async function DeleteCar() {
      try {
         const response = await API.Car.apiCarIdDelete({ id: carOID });
         console.log(response);
         alert("Awtomashin ustgalt амжилттай");
      } catch (error) {
         console.error("ERROR IS HERE", error);
         alert("амжилтгүй");
      }
   }
</script>

<label for="text">Enter a car's oid value</label>
<input type="text" name="text" bind:value={carOID} />
<button on:click={DeleteCar}>delete {carOID} car</button>
