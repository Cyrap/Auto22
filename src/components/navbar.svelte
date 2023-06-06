<script>
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher();

   function handleShowDiv() {
      dispatch("showDiv");
   }
</script>

<div id="nav-container">
   <div id="logo">
      <img id="logo-pic" src="../src/img/logo.png" alt="Logo" />
      <h1>Auto22.mn</h1>
   </div>
   <div id="nav-form">
      <ul>
         <li><a href="#">Түрээслэх</a></li>
         <!-- ... -->
         <li>
            <button id="register" on:click={handleShowDiv}>Бүртгүүлэх </button>
         </li>
      </ul>
   </div>
</div>

<style>
   h1 {
      color: var(--background-color);
   }
   button {
      background: none;
      border: none;
      color: aliceblue;
      font-weight: bold;
   }
   #nav-container {
      z-index: 99;
      background: linear-gradient(
         90deg,
         var(--primary-color),
         rgb(4, 161, 140)
      );
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   #nav-container #nav-form {
      padding-right: 10%;
   }

   #nav-container #nav-form ul {
      display: flex;
      flex-direction: row;
      align-items: center;
   }

   #nav-container #nav-form ul li button {
      padding: 15px 1px;
      width: 150px;
      list-style: none;
      text-align: center;
      cursor: pointer;
   }

   #nav-container #nav-form ul li a {
      color: var(--background-color);
      font-weight: bold;
   }

   #nav-container #logo {
      display: flex;
      align-items: center;
      padding-left: 10%;
      color: var(--text-color);
      cursor: pointer;
   }

   #nav-container #logo #logo-pic {
      height: 100px;
   }

   #nav-container #nav-form ul li:hover {
      background-color: var(--disabled);
      transition: 1s;
      border-radius: 3px;
   }
</style>
