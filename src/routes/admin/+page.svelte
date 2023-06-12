<script>
   import Navbar from "../navbar.svelte";
   import CarList from "../../components/carList.svelte";
   import PageButton from "../../components/pageButton.svelte";
   import Registeration from "../../components/registeration.svelte";
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher();

   function handleShowDiv() {
      dispatch("showDiv");
   }
   var isDivVisible = false;
   const handleShowInfo = () => {
      isDivVisible = true;
   };
</script>

<Navbar />
<Registeration bind:isDivVisible />
<div class="addCar">
   <button on:click={handleShowDiv}>Add car</button>
</div>
<title>Admin</title>
<meta name="description" content="About this app" />
<svelte:head>
   <title>Login</title>
   <meta name="description" content="About this app" />
</svelte:head>
<CarList on:showCarInfo={handleShowInfo} />
<PageButton />
