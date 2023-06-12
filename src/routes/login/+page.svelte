<script lang="ts">
   import Navbar from "../navbar.svelte";
   // let show_password = true;
   // let type = show_password ? "text" : "password";
   // let value = "";

   // function onInput(event: Event) {
   //    value = (event.target as HTMLInputElement).value;
   // }
</script>

<Navbar />
<svelte:head>
   <title>Login</title>
   <meta name="description" content="About this app" />
</svelte:head>
<div class="main">
   <div class="form">
      <label for="input">Утас</label>
      <input type="number" />

      <label for="input">Нууц үг</label>
      <input type="password" name="kjdhjk" id="" />
      <a class="forgot" href="/">Нууц үгээ мартсан</a>
      <!-- <div>1: <input {type} {value} {...$$restProps} on:input={onInput} /></div>
      <div>2: <input {type} {value} on:input={onInput} /></div>
      <button type="button" on:click={() => (show_password = !show_password)}
         >{show_password ? "Hide" : "Show"}</button
      > -->

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
   .forgot {
      background: none;
      color: var(--primary-color);
      margin: -10px;
      padding: 0;
      position: relative;
      top: 5vh;
      left: 23vw;
   }
   .forgot:hover {
      color: rgb(52, 163, 147);
   }
   a {
      background: var(--primary-color);
      color: var(--background-color);
      padding: 10px 0px;
      text-align: center;
      border-radius: 10px;
      width: 10vw;
      margin: 20px;
      position: relative;
      top: 10vh;
      left: 21vw;
   }
   label {
      font-size: 1.3rem;
      margin: 10px;
   }
   input {
      padding: 0.3rem 1rem;
      height: 2rem;
      background: rgba(255, 255, 255, 0.711);
      border: none;
      border-bottom: 3px rgba(0, 0, 0, 0.439) solid;
      font-size: 1.2rem;
      width: 30vw;
   }
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
</style>
