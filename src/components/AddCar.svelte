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
      <h2>Автомашин бүртгэлийн хэсэг</h2>
      <form>
         <div class="form-group">
            <div>
               <label for="carNumber">Машины дугаар</label>
               <input type="number" bind:value={newData.carNumber} id="carNumber" />
            </div>
            <div>
               <label for="color">Өнгө</label>
               <input type="text" bind:value={newData.color} id="color" />
            </div>
            <div>
               <label for="condition">Нөхцөл</label>
               <input type="number" bind:value={newData.condition} id="condition" />
            </div>
            <div>
               <label for="engine">Хөдөлгүүр</label>
               <input type="number" bind:value={newData.engine} id="engine" />
            </div>
            <div>
               <label for="engineCapacity">Хөдөлгүүрийн багтаамж</label>
               <input type="number" bind:value={newData.engineCapacity} id="engineCapacity" />
            </div>
            <div>
               <label for="hrop">Хроп</label>
               <input type="number" bind:value={newData.hrop} id="hrop" />
            </div>
            <div>
               <label for="hutlugch">Хөтлөгч</label>
               <input type="number" bind:value={newData.hutlugch} id="hutlugch" />
            </div>
            <div>
               <label for="hvrd">Хүрд</label>
               <input type="number" bind:value={newData.hvrd} id="hvrd" />
            </div>
            <div>
               <label for="madeCompany">Үйлдвэрлэгч компани</label>
               <input type="text" bind:value={newData.madeCompany} id="madeCompany" />
            </div>
            <div>
               <label for="madeMonth">Үйлдвэрлэсэн сар</label>
               <input type="number" bind:value={newData.madeMonth} id="madeMonth" />
            </div>
            <div>
               <label for="madeYear">Үйлдвэрлэсэн он</label>
               <input type="number" bind:value={newData.madeYear} id="madeYear" />
            </div>
            <div>
               <label for="model">Загвар</label>
               <input type="text" bind:value={newData.model} id="model" />
            </div>
            <div>
               <label for="oid">OID</label>
               <input type="number" bind:value={newData.oid} id="oid" />
            </div>
            <div>
               <label for="phone">Утасны дугаар</label>
               <input type="number" bind:value={newData.phone} id="phone" />
            </div>
            <div>
               <label for="power">Хүчин чадал</label>
               <input type="number" bind:value={newData.power} id="power" />
            </div>
            <div>
               <label for="price">Үнэ</label>
               <input type="number" bind:value={newData.price} id="price" />
            </div>
            <div>
               <label for="roadTraveled">Туулсан зам</label>
               <input type="number" bind:value={newData.roadTraveled} id="roadTraveled" />
            </div>
            <div>
               <label for="turul">Төрөл</label>
               <input type="number" bind:value={newData.turul} id="turul" />
            </div>
            <div>
               <label for="zogsoolBus">Зогсоолын бүс</label>
               <input type="number" bind:value={newData.zogsoolBus} id="zogsoolBus" />
            </div>
            <div>
               <label for="zogsoolDugaar">Зогсоолын дугаар</label>
               <input type="text" bind:value={newData.zogsoolDugaar} id="zogsoolDugaar" />
            </div>
            <button on:click={() => createCar()}>Хадгалах</button>
         </div>
         <div />
      </form>
   </div>
</section>

<style>
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
      display: flex;
      align-items: center;
      flex-direction: column;
      color: rgb(0, 0, 0);
      height: 130vh;
   }
   .form-group {
      margin-bottom: 1rem;
      display: grid;
      background: var(--background-color);
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
   input {
      height: 1.6rem;
      margin: 0 10px;
   }
   button {
      position: relative;
      left: 145%;
      width: 50%;
   }
   label {
      margin: 0 10px;
      font-size: 0.8rem;
      padding: 3px;
   }
   @media (max-width: 700px) {
      .register {
         font-size: 0.7rem;
      }
      .form-group {
         width: 90vw;
      }
   }
</style>
