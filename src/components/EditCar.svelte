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
      hvrd: 0,
      engineCapacity: 0,
      hrop: 0,
      phone: 0,
      condition: 0,
      carNumber: 0,
      price: 0,
   };

   interface CarDto {
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      oid?: number;
      /**
       *
       * @type {string}
       * @memberof CarDto
       */
      madeCompany?: string | null;
      /**
       *
       * @type {string}
       * @memberof CarDto
       */
      model?: string | null;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      madeYear?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      madeMonth?: number;
      /**
       *
       * @type {string}
       * @memberof CarDto
       */
      color?: string | null;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      roadTraveled?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      power?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      hutlugch?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      engine?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      carType?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      hvrd?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      engineCapacity?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      hrop?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      phone?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      condition?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      carNumber?: number;
      /**
       *
       * @type {number}
       * @memberof CarDto
       */
      price?: number;
   }
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
