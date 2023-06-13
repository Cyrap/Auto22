<script>
   import { page } from "$app/stores";
</script>

<div id="nav-container">
   <a href="/" id="logo">
      <img id="logo-pic" src="../src/img/logo.png" alt="Logo" />
      <h1>Auto22.mn</h1>
   </a>
   <div id="nav-form">
      <ul>
         <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
            <a href="/">Home</a>
         </li>
         <li>
            <a href="/about">About</a>
         </li>
         <li
            aria-current={$page.url.pathname === "/login" ? "page" : undefined}
         >
            <a href="/login">Login</a>
         </li>
      </ul>
   </div>
</div>

<style>
   h1 {
      color: var(--background-color);
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

   #nav-container #nav-form ul li {
      list-style: none;
      text-align: center;
   }

   #nav-container #nav-form ul li a {
      padding: 15px 10px;
      color: var(--text-color);
      text-decoration: none;
      cursor: pointer;
   }

   #nav-container #logo {
      display: flex;
      align-items: center;
      color: var(--text-color);
      cursor: pointer;
      text-decoration: none;
   }

   #nav-container #logo #logo-pic {
      height: 100px;
   }

   #nav-container #nav-form ul li:hover {
      background-color: var(--disabled);
      transition: 0.3s;
      border-radius: 3px;
   }
</style>
