<script>
   import Navbar from "../navbar.svelte";
</script>

<Navbar />
<svelte:head>
   <title>Login</title>
   <meta name="description" content="About this app" />
</svelte:head>
<div class="main">
   <div class="form">
      <label for="input">Утас</label>
      <input type="text" />

      <label for="input">Нууц үг</label>
      <input type="text" />

      <a href="/admin">Нэвтрэх</a>
   </div>
</div>

<style>
   .main {
      background: rgba(61, 119, 146, 0.19);
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
   }
   .form {
      background-color: rgb(179, 187, 194);
      height: 50vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      position: absolute;
      top: 25vh;
      padding: 50px;
   }
   a {
      background: var(--primary-color);
      color: var(--background-color);
      padding: 10px 20px;
      border-radius: 10px;
      width: 10vw;
      margin: 20px;
      position: relative;
      top: 10vh;
      left: 15vw;
   }
   label {
      font-size: 1.3rem;
      margin: 10px;
   }
   input {
      height: 2rem;
      background: rgba(255, 255, 255, 0.711);
      border: none;
      border-bottom: 3px rgba(0, 0, 0, 0.439) solid;
      font-size: 1.2rem;
      width: 30vw;
   }
</style>
