<script lang="ts">
   import AddCar from "./AddCar.svelte";

   export let selected: any;
   export let search: string = "";
   export let ShowAddCarButton: any;
   const home = () => {
      selected = "home";
      search = "";
   };

   const Login = () => {
      selected = "Login";
      search = "";
   };

   const addCar = () => {
      selected = "AddCar";
      search = "";
   };

   // localStorage.setItem("name", JSON.stringify(data));
   // JSON.parse(localStorage.getItem("name"));
</script>

<div id="nav-container" data-theme="dark">
   <div class="intro">"Олон улсын худалдаа логистикийн төв" ХК</div>
   <div id="nav-form">
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" id="menu-toggle-label">
         <span />
         <span />
         <span />
      </label>
      <ul>
         <button class={selected === "home" ? "active" : ""} on:click={home}>Нүүр</button>
         {#if ShowAddCarButton == "user"}
            <button class={selected === "Login" ? "active" : ""} on:click={addCar}>Автомашин бүртгэх</button>
         {/if}
         <button class={selected === "AddCar" ? "active" : ""} on:click={Login}><i class="fa-regular fa-user fa" style="color: #ffffff;" /></button>
      </ul>
   </div>
</div>

<style>
   #nav-container {
      z-index: 99;
      background: var(--primary-color);
      display: flex;
      position: sticky;
      top: 0;
      align-items: center;
      justify-content: space-between;
   }
   .intro {
      color: var(--background-color);
      font-size: 0.8rem;
      margin-left: 10vw;
   }
   #nav-container #nav-form ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0;
      margin: 0;
   }
   #nav-container #nav-form ul button {
      background-color: rgba(255, 0, 0, 0);
      padding: 10px 20px;
      margin: 0px 5px;
      border: none;
      color: var(--background-color);
   }
   #nav-container #nav-form ul button:hover {
      background-color: var(--disabled);
      transition: 0.3s;
      border-radius: 3px;
   }
   #nav-container #nav-form #menu-toggle {
      display: none;
   }
   #nav-container #nav-form ul button.active::after {
      content: "";
      display: block;
      height: 2px;
      width: 150%;
      background-color: var(--text-color);
      position: relative;
      top: 12px;
      left: -25%;
   }
</style>
