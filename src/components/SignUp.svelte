<script lang="ts">
   import { useForm, Hint, HintGroup, validators, required, minLength } from "svelte-use-form";
   import { API } from "../logic/api";
   import type { RegisterRequest } from "car-api";
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

   const requiredMessage = "This field is required";

   let newUser: RegisterRequest = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
   };
   let passwordA = "";
   let passwordB = "";

   function handlePhoneInput(event: Event) {
      newUser.username = (event.target as HTMLInputElement).value;
   }
   function handleFirstNameInput(event: Event) {
      newUser.firstName = (event.target as HTMLInputElement).value;
   }
   function handleLastNameInput(event: Event) {
      newUser.lastName = (event.target as HTMLInputElement).value;
   }
   function handleEmailInput(event: Event) {
      newUser.email = (event.target as HTMLInputElement).value;
   }

   const handlePasswordAInput = (event: Event) => {
      passwordA = (event.target as HTMLInputElement).value;
   };

   const handlePasswordBInput = (event: Event) => {
      passwordB = (event.target as HTMLInputElement).value;
   };

   async function Register() {
      if (passwordA === passwordB) {
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
         <input type="text" name="text" value={newUser.username} on:input={handlePhoneInput} use:validators={[required, minLength(3)]} />
         <HintGroup for="text">
            <Hint on="required">{requiredMessage}</Hint>
         </HintGroup>

         <label for="text">Овог</label>
         <input type="text" name="text" value={newUser.lastName} on:input={handleLastNameInput} use:validators={[required, minLength(3)]} />
         <HintGroup for="text">
            <Hint on="required">{requiredMessage}</Hint>
         </HintGroup>

         <label for="text">Нэр</label>
         <input type="text" name="text" value={newUser.firstName} on:input={handleFirstNameInput} use:validators={[required, minLength(3)]} />
         <HintGroup for="text">
            <Hint on="required">{requiredMessage}</Hint>
         </HintGroup>

         <label for="email">E mail хаяг</label>
         <input type="email" name="email" value={newUser.email} on:input={handleEmailInput} use:validators={[required, minLength(3)]} />
         <HintGroup for="email">
            <Hint on="required">{requiredMessage}</Hint>
            <Hint on="email" hideWhenRequired>This must be a valid email</Hint>
         </HintGroup>

         <label for="password">Нууц үг</label>
         <input type="password" name="password" on:input={handlePasswordAInput} use:validators={[required, minLength(8), containNumbers(2)]} />
         <HintGroup for="password">
            <Hint on="required">{requiredMessage}</Hint>
            <Hint on="minLength" hideWhenRequired let:value>This field must have at least {value} characters.</Hint>
            <Hint on="containNumbers" hideWhen="minLength" let:value>
               This field must contain at least {value} numbers.
            </Hint>
         </HintGroup>

         <label for="passwordConfirmation">Нууц үг дахин оруулна уу.</label>
         <input type="password" name="passwordConfirmation" on:input={handlePasswordBInput} use:validators={[required, passwordMatch]} />
         <HintGroup for="passwordConfirmation">
            <Hint on="required">{requiredMessage}</Hint>
            <Hint on="passwordMatch" hideWhenRequired>Passwords do not match</Hint>
         </HintGroup><br />

         <button disabled={!$form.valid} on:click={Register}> Submit </button>
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
      margin: 20px 0px;
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
