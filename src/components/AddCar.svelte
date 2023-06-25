<script lang="ts">
   import { API } from "../logic/api";
   import type { CarDto } from "car-api";
   let newData: CarDto = {
      carNumber: undefined,
      color: "",
      condition: undefined,
      engine: undefined,
      engineCapacity: undefined,
      hrop: undefined,
      hutlugch: undefined,
      hvrd: undefined,
      madeCompany: "",
      madeMonth: undefined,
      madeYear: undefined,
      model: "",
      oid: undefined,
      phone: undefined,
      power: undefined,
      price: undefined,
      roadTraveled: undefined,
      turul: undefined,
      zogsoolBus: undefined,
      zogsoolDugaar: undefined,
   };
   async function createCar() {
      try {
         const response = await API.Car.apiCarPost({
            carDto: newData,
         });
         console.log("Successss???>?>?>s", response.data); // Display the response data
         alert(`${response.data.model} авто машин амжилттай бүртгэгдлээ!`);
      } catch (error) {
         console.error("Mashin hadgalalt amjiltgvi", error);
         alert("Mashin hadgalalt amjiltgvi");
      }
   }
</script>

<!-- {#await createCar() catch error}
   Error {error}
{/await} -->

<section class="register" style="position:absolute">
   <div class="register-container">
      <h2>Машын бүртгэлийн хэсэг</h2>
      <form>
         <div class="form-group">
            <input type="number" bind:value={newData.carNumber} placeholder="Машиний дугаар оруулна уу" />
            <input type="text" bind:value={newData.color} placeholder="Өнгө оруулна уу" />
            <input type="number" bind:value={newData.condition} placeholder="Нөхцөл оруулна уу" />
            <input type="number" bind:value={newData.engine} placeholder="Хөдөлгүүр оруулна уу" />
            <input type="number" bind:value={newData.engineCapacity} placeholder="Хөдөлгүүрийн багтаамж оруулна уу" />
            <input type="number" bind:value={newData.hrop} placeholder="Хроп оруулна уу" />
            <input type="number" bind:value={newData.hutlugch} placeholder="Хутлагч оруулна уу" />
            <input type="number" bind:value={newData.hvrd} placeholder="Хүрд оруулна уу" />
            <input type="text" bind:value={newData.madeCompany} placeholder="Үйлдвэрлэгч компани оруулна уу" />
            <input type="number" bind:value={newData.madeMonth} placeholder="Үйлдвэрлэсэн сар оруулна уу" />
            <input type="number" bind:value={newData.madeYear} placeholder="Үйлдвэрлэсэн он оруулна уу" />
            <input type="text" bind:value={newData.model} placeholder="Загвар оруулна уу" />
            <input type="number" bind:value={newData.oid} placeholder="OID оруулна уу" />
            <input type="number" bind:value={newData.phone} placeholder="Утасны дугаар оруулна уу" />
            <input type="number" bind:value={newData.power} placeholder="Хүчин чадал оруулна уу" />
            <input type="number" bind:value={newData.price} placeholder="Үнэ оруулна уу" />
            <input type="number" bind:value={newData.roadTraveled} placeholder="Аялагдсан зам оруулна уу" />
            <input type="number" bind:value={newData.turul} placeholder="Төрөл оруулна уу" />
            <input type="number" bind:value={newData.zogsoolBus} placeholder="Зөөлөн автобус оруулна уу" />
            <input type="text" bind:value={newData.zogsoolDugaar} placeholder="Зөөлөн дугаар оруулна уу" />
            <button on:click={() => createCar()}>Submit</button>
            <div class="exit" />
         </div>
         <div />
         <button>Add</button>
      </form>
   </div>
</section>

<style>
   .exit {
      position: absolute;
      top: 2vh;
      left: 75vw;
   }
   .register {
      background: var(--primary-color);
      width: 100vw;
   }
   h2 {
      color: var(--background-color);
      position: absolute;
      margin-top: 20px;
   }
   .register-container {
      z-index: 999;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: rgb(0, 0, 0);
      height: 130vh;
   }
   .form-group {
      margin-bottom: 1rem;
      display: grid;
      background: rgba(226, 228, 230, 0.913);
      padding: 10px;
      border-radius: 10px;
      grid-template-columns: repeat(2, 1fr);
      width: 70vw;
      height: 80vh;
      position: relative;
      top: 50px;
   }
   .form-group > div {
      display: flex;
      flex-direction: column;
   }
</style>
