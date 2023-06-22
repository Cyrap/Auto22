<script lang="ts">
   import { API } from "../logic/api";
   import type { AuthenticateRequest } from "car-api";
   let show_password = false;
   function togglePasswordVisibility() {
      show_password = !show_password;
   }
   function handlePasswordInput(event: Event) {
      newUser.password = (event.target as HTMLInputElement).value;
   }
   function handlePhoneInput(event: Event) {
      newUser.username = (event.target as HTMLInputElement).value;
   }
   let newUser: AuthenticateRequest = {
      username: "",
      password: "",
   };
   async function Login() {
      try {
         const response = await API.User.usersAuthenticatePost({
            authenticateRequest: newUser,
         });
         console.log("Login button daragdlaa", response.data); // Display the response data
      } catch (error) {
         console.error("ERROR IS HERE", error);
      }
   }
</script>

<svelte:head>
   <title>Login</title>
   <meta name="description" content="About this app" />
</svelte:head>
<div class="main">
   <div class="form">
      <label for="phoneNumber">User name</label>
      <input type="tel" id="phoneNumber" value={newUser.username} on:input={handlePhoneInput} required pattern="[0-9]{8}" />
      <label for="password">Нууц үг</label>
      <div class="password-input">
         <input
            type={show_password ? "text" : "password"}
            id="password"
            value={newUser.password}
            on:input={handlePasswordInput}
            required
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8}$"
         />
         <button class="show-password-btn" on:click={togglePasswordVisibility}>
            {#if show_password}
               <span class="hide-icon">Hide</span>
            {:else}
               <span class="show-icon">Show</span>
            {/if}
         </button>
      </div>
      <a class="forgot" href="/">Нууц үгээ мартсан</a>
      <button on:click={Login} class="login">Login</button>
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
   a,
   .login {
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
   .password-input {
      position: relative;
   }
   .show-password-btn {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
   }
   .show-icon,
   .hide-icon {
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--primary-color);
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 0;
      margin: 0;
      transition: color 0.3s;
   }
   .hide-icon {
      display: none;
   }
   .show-password-btn:hover .hide-icon {
      display: block;
   }
   .show-password-btn:hover .show-icon {
      display: none;
   }
</style>
