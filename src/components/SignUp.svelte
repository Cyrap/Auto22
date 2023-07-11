<script lang="ts">
   import { useForm, Hint, HintGroup, validators, required, minLength } from "svelte-use-form";
   import { API } from "../logic/api";
   export let toglle: any;
   import type { RegisterRequest } from "car-api";
   function Back() {
      toglle = "login";
   }
   function passwordMatch(value: any, form: any) {
      if (value !== form.values.password) {
         return { passwordMatch: true };
      }
      return null;
   }
   function containNumbers(numbers: any) {
      return function (value: any) {
         if (value.replace(/[^0-9]/g, "").length < numbers) {
            return { containNumbers: numbers };
         }
         return null;
      };
   }

   const form = useForm();

   const requiredMessage = "Мэдээлэл ээ оруулна уу";

   let newUser: RegisterRequest = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
   };

   //    {
   //   "username": "sugar",
   //   "password": "qwerty123",
   //   "firstName": "sugar",
   //   "lastName": "nymdawaa",
   //   "email": "cyrap2001@gmail.com"
   // }
   let passwordRepeat = "";

   async function register() {
      if (newUser.password === passwordRepeat) {
         try {
            const response = await API.User.usersRegisterPost({
               registerRequest: newUser,
            });
            console.log("Registeration successful", response.data);
            alert("Registeration successful");
         } catch (error) {
            console.error("Registration error", error);
            alert("Registeration failed");
         }
      }
   }
</script>

<main>
   <div class="main">
      <form use:form>
         <h4>Хэрэглэгчийн бүртгэл үүсгэх</h4>
         <label for="text">Хэрэглэгчийн нэр</label>
         <input type="text" name="text" bind:value={newUser.username} use:validators={[required, minLength(3)]} />
         <HintGroup for="text">
            <Hint on="required">{requiredMessage}</Hint>
         </HintGroup>

         <label for="text">Овог</label>
         <input type="text" name="text" bind:value={newUser.lastName} use:validators={[required, minLength(3)]} />
         <HintGroup for="text">
            <Hint on="required">{requiredMessage}</Hint>
         </HintGroup>

         <label for="text">Нэр</label>
         <input type="text" name="text" bind:value={newUser.firstName} use:validators={[required, minLength(3)]} />
         <HintGroup for="text">
            <Hint on="required">{requiredMessage}</Hint>
         </HintGroup>

         <label for="email">E mail хаяг</label>
         <input type="email" name="email" bind:value={newUser.email} use:validators={[required, minLength(3)]} />
         <HintGroup for="email">
            <Hint on="required">{requiredMessage}</Hint>
            <Hint on="email" hideWhenRequired>This must be a valid email</Hint>
         </HintGroup>

         <label for="password">Нууц үг</label>
         <input type="password" name="password" bind:value={newUser.password} use:validators={[required, minLength(8), containNumbers(2)]} />
         <HintGroup for="password">
            <Hint on="required">{requiredMessage}</Hint>
            <Hint on="minLength" hideWhenRequired let:value>This field must have at least {value} characters.</Hint>
            <Hint on="containNumbers" hideWhen="minLength" let:value>
               This field must contain at least {value} numbers.
            </Hint>
         </HintGroup>

         <label for="passwordConfirmation">Нууц үг дахин оруулна уу.</label>
         <input type="password" name="passwordConfirmation" bind:value={passwordRepeat} use:validators={[required, passwordMatch]} />
         <HintGroup for="passwordConfirmation">
            <Hint on="required">{requiredMessage}</Hint>
            <Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
         </HintGroup><br />

         <button disabled={!$form.valid} on:click={register}> Бүртгүүлэх </button>
         <button on:click={Back}> Нэвтрэх </button>
      </form>
   </div>
</main>

<style>
   h4 {
      align-self: center;
   }
   :global(.touched:invalid) {
      border-color: red;
      outline-color: red;
   }
   main {
      background: var(--disabled);
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   form {
      background-color: var(--background-color);
      height: auto; /* Change height to auto */
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      padding: 20px; /* Remove position and top properties */
   }

   button {
      background: var(--primary-color);
      color: var(--background-color);
      padding: 10px 0px;
      text-align: center;
      border-radius: 10px;
      margin-top: 10px;
      position: relative;
   }
   label {
      font-size: 0.9rem;
      margin: 10px;
   }
   input {
      padding: 0.3rem 1rem;
      height: 2rem;
      background: rgba(255, 255, 255, 0.711);
      border: 1px solid black;
      border-radius: 3px;
      font-size: 1.2rem;
      width: 25vw;
      min-width: 350px;
   }
</style>
