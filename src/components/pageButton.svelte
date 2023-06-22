<div class="buttonContainer">
   <div>
      <a href="/registerPage">Pre</a>
      <a href="/registerPage">1</a>
      <a href="/registerPage">2</a>
      <a href="/registerPage">3</a>
      <a href="/registerPage">...</a>
      <a href="/registerPage">Next</a>
      <a href="/registerPage" class="add">Add car</a>
   </div>
</div>

<style>
   .add {
      background: var(--secondary-color);
      box-shadow: none;
      border-radius: 5px;
      margin-left: 20vw;
   }
   a {
      color: var(--background-color);
   }
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
      left: -10vw;
      align-items: center;
   }
   a {
      background: var(--primary-color);
      border: var(--background-color);
      color: var(--background-color);
      padding: 15px 30px;
      border-radius: 30px;
      margin: 5px;
      box-shadow: var(--primary-color) 0px -23px 25px 0px inset, rgba(255, 255, 255, 0.15) 0px -36px 30px 0px inset,
         rgba(255, 255, 255, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
         rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
   }
   a:hover {
      box-shadow: rgba(35, 69, 49, 0.17) 0px -23px 25px 0px inset, rgba(11, 67, 56, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
         rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
         rgba(0, 0, 0, 0.09) 0px 32px 16px;
   }
</style>
