<script lang="ts">
   import { API } from "../logic/api";
   import type { CarDto } from "car-api";
   let carOID: number;
   let newData: CarDto;
   newData = {
      oid: 0,
      madeCompany: "string",
      model: "land",
      madeYear: 0,
      madeMonth: 0,
      color: "string",
      roadTraveled: 0,
      power: 0,
      hutlugch: 0,
      engine: 0,
      turul: 0,
      hvrd: 0,
      engineCapacity: 0,
      hrop: 0,
      phone: 0,
      condition: 0,
      carNumber: 0,
      price: 0,
   };
   async function DeleteCar() {
      try {
         const response = await API.Car.apiCarIdPut({ id: carOID, carDto: newData });
         console.log(response);
         alert("Awtomashin zaswarlalt amjilttai");
      } catch (error) {
         console.error("ERROR IS HERE", error);
         alert("амжилтгүй");
      }
   }
</script>

<label for="text">Enter a car's oid value</label>
<input type="text" name="text" bind:value={carOID} />
<button on:click={DeleteCar}>Edit {carOID} car</button>
