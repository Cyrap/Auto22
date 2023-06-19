<script lang="ts">
   import { createEventDispatcher } from "svelte";

   export let isDivVisible = true;
   const dispatch = createEventDispatcher();

   function hideDiv() {
      isDivVisible = false;
   }

   export function showDiv() {
      isDivVisible = true;
   }
</script>

<section
   class="register"
   style="position:absolute"
   class:register={isDivVisible}
   class:hidden={!isDivVisible}
>
   <div class="register-container">
      <h2>Машын бүртгэлийн хэсэг</h2>
      <form>
         <div class="form-group">
            <div>
               <a href="/admin" class="exit">
                  <button id="remove-register-form">
                     <div id="toogle">
                        <div />
                     </div>
                  </button></a
               >
            </div>
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
   /* .hidden {
       display: none;
   } */
   .register {
      /* background: #333 url(../img/Slider-5.jpg) no-repeat center center/cover; */
      background: var(--primary-color);
      width: 100vw;
      z-index: 9999;
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

   #remove-register-form {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3rem;
      width: 3rem;
      font-size: 1rem;
      position: absolute;
      left: 105%;
      background: var(--background-color);
      border-radius: 50%;
      border: none;
      cursor: pointer;
   }

   #remove-register-form > div {
      position: absolute;
      width: 32px;
      height: 32px;
      opacity: 0.7;
   }

   #remove-register-form > div::after,
   #remove-register-form > div::before {
      position: absolute;
      left: 15px;
      content: " ";
      height: 33px;
      width: 2px;
      background-color: var(--primary-color);
   }

   #remove-register-form > div:after {
      transform: rotate(-45deg);
   }

   #remove-register-form > div::before {
      transform: rotate(45deg);
   }

   #remove-register-form > div:hover {
      opacity: 1;
      transform: rotate(150deg);
      transition: 0.5s ease-in-out;
   }
</style>
