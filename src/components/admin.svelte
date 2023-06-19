<script>
   import Navbar from "./Navbar.svelte";
   import CarList from "./CarList.svelte";
   import PageButton from "./PageButton.svelte";
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
<title>Admin</title>
<meta name="description" content="About this app" />
<svelte:head>
   <title>Login</title>
   <meta name="description" content="About this app" />
</svelte:head>
<CarList on:showCarInfo={handleShowInfo} />
<PageButton />
