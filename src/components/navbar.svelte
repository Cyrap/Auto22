<script lang="ts">
   export var selected;
   var home = () => {
      selected = "home";
   };
   var about = () => {
      selected = "about";
   };
   var Login = () => {
      selected = "Login";
   };
   var AddCar = () => {
      selected = "AddCar";
   };
</script>

<div id="nav-container">
   <a href="/" id="logo" on:click={home}>
      <img id="logo-pic" src="../src/img/logo.png" alt="Logo" />
      <h1>Auto22.mn</h1>
   </a>
   <div id="nav-form">
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
   }
   #nav-container {
      z-index: 99;
      background: linear-gradient(0, var(--background-color), var(--disabled));
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2%;
   }
   #nav-container #nav-form {
      padding-right: 10%;
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
</style>
