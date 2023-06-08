<script lang="ts">
    import { onMount } from "svelte";
    // Машиний үндсэн мэдээлэл хадгалах object
    import CarList from "../components/carList.svelte";
    import Footer from "../components/footer.svelte";
    import Navbar from "../components/navbar.svelte";
    import Dashboard from "../components/dashboard.svelte";
    import CarRegister from "../components/registeration.svelte";
    import Slider from "../components/slider.svelte";
    import PageButton from "../components/pageButton.svelte";
    import TrendingCars from "../components/trendingCars.svelte";
    import ApItest from "../components/APItest.svelte";
    import CarPage from "../components/car.svelte";
    let isDivVisible = false;

    const handleShowDiv = () => {
        isDivVisible = true;
    };

    const handleShowInfo = () => {
        isDivVisible = true;
    };

    const getPosts = async () => {
        const res = await fetch("https://api.publicapis.org/entries"); // Replace with your API URL
        const data = await res.json();
        console.log(data);
        return data;
    };

    let apiData: any;

    onMount(async () => {
        apiData = await getPosts();
    });
    console.log(apiData);
</script>

<!-- {#await getPosts()}
    <p>loading</p>
{:then data}
    {#each data as { count, entries }}
        <div class="grid">
            <p>{count}{entries}</p>
        </div>
    {/each}
{/await} -->
<!-- {#if isDivVisible}<CarRegister />{/if} -->
<CarRegister bind:isDivVisible />
<Navbar on:showDiv={handleShowDiv} />
<Dashboard />
<TrendingCars />
<CarList on:showCarInfo={handleShowInfo} />
<Slider />
<PageButton />
<CarPage />
<Footer />
<ApItest />
