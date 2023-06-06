<script>
   import { text } from "@sveltejs/kit";
</script>

<div class="buttonContainer">
   <div>
      <button>Pre</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>...</button>
      <button>Next</button>
   </div>
</div>

<style>
   .buttonContainer {
      display: flex;
      justify-content: center;
   }
   .buttonContainer > div {
      display: flex;
      justify-content: space-between;
      width: 30%;
      background: var(--background-color);
      border: var(--primary-color) 5px;
      box-shadow: 5px black;
      border-radius: 10px;
      position: relative;
      left: 10%;
   }
   button {
      background: var(--primary-color);
      border: var(--background-color);
      color: var(--background-color);
      padding: 15px 30px;
      border-radius: 30px;
      margin: 5px;
      box-shadow: var(--primary-color) 0px -23px 25px 0px inset,
         rgba(255, 255, 255, 0.15) 0px -36px 30px 0px inset,
         rgba(255, 255, 255, 0.1) 0px -79px 40px 0px inset,
         rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
         rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
         rgba(0, 0, 0, 0.09) 0px 32px 16px;
   }
   button:hover {
      box-shadow: rgba(35, 69, 49, 0.17) 0px -23px 25px 0px inset,
         rgba(11, 67, 56, 0.15) 0px -36px 30px 0px inset,
         rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
         rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
         rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
         rgba(0, 0, 0, 0.09) 0px 32px 16px;
   }
</style>
