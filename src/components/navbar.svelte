<script lang="ts">
   import Search from "./Search.svelte";
   export var selected: any;
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   export let search: any;
   var home = () => {
      selected = "home";
      search = "";
   };
   var about = () => {
      selected = "about";
      search = "";
   };
   var Login = () => {
      selected = "Login";
      search = "";
   };
   var AddCar = () => {
      selected = "AddCar";
      search = "";
   };
</script>

<div id="nav-container">
   <a href="/" id="logo" on:click={home}>
      <img id="logo-pic" src="../src/img/logo.png" alt="Logo" />
      <h1>Auto22.mn</h1>
   </a>
   <div class="search">
      <Search bind:search {posts} />
   </div>
   <div id="nav-form">
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" id="menu-toggle-label">
         <span />
         <span />
         <span />
      </label>
      <ul>
         <button on:click={home}>Home</button>
         <button on:click={about}>About</button>
         <button on:click={Login}>AddCar</button>
         <button on:click={AddCar}>Login</button>
      </ul>
   </div>
</div>

<style>
   h1 {
      color: var(--background-color);
      font-size: 1.8rem;
   }
   #nav-container {
      z-index: 99;
      background: linear-gradient(0, var(--background-color), var(--disabled));
      display: flex;
      align-items: center;
      height: 90px;
      /* justify-content: space-between; */
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
      margin: 0px 20px;
      border: none;
   }
   #nav-container #logo {
      display: flex;
      align-items: center;
      color: var(--text-color);
      cursor: pointer;
      text-decoration: none;
   }
   #nav-container #logo #logo-pic {
      height: 60px;
   }
   #nav-container #nav-form ul button:hover {
      background-color: var(--disabled);
      transition: 0.3s;
      border-radius: 3px;
   }
   #nav-container #nav-form #menu-toggle {
      display: none;
   }
   /* Responsive Design */
   @media (max-width: 1200px) {
      #nav-container #nav-form {
         position: relative;
      }
      #nav-container #nav-form ul {
         position: absolute;
         top: 90px;
         left: -250%;
         z-index: 99;
         width: 300px;
         border: 1px solid;
         background-color: var(--background-color);
         flex-direction: column;
         width: 100%;
         padding: 10px;
         display: none;
         width: 30vw;
      }
      #nav-container #nav-form ul button {
         margin: 5px;
         width: 30vw;
      }
      #nav-container #nav-form ul button :hover {
         background: var(--disabled);
      }
      #nav-container #nav-form input[type="checkbox"] {
         display: none;
      }
      #nav-container #nav-form #menu-toggle-label {
         display: block;
         cursor: pointer;
         padding: 10px;
         position: absolute;
         top: -20px;
         background: white;
         border-radius: 50%;
         z-index: 100;
         right: 20px;
      }
      #nav-container #nav-form #menu-toggle-label span {
         display: block;
         width: 30px;
         height: 3px;
         background-color: var(--text-color);
         margin: 5px 0;
      }
      #nav-container #nav-form input[type="checkbox"]:checked ~ ul {
         display: flex;
      }
   }
   @media (max-width: 850px) {
      h1 {
         display: none;
      }
      .search {
         position: relative;
         left: -100px;
      }
   }
</style>
