<script lang="ts">
    import { onMount } from "svelte";
    // Машиний үндсэн мэдээлэл хадгалах object
    import CarList from "../components/carList.svelte";
    import Footer from "../components/footer.svelte";
    import Navbar from "./navbar.svelte";
    import Dashboard from "../components/dashboard.svelte";
    import CarRegister from "../components/registeration.svelte";
    import Slider from "../components/slider.svelte";
    import PageButton from "../components/pageButton.svelte";
    import TrendingCars from "../components/trendingCars.svelte";
    import ApItest from "../components/APItest.svelte";
    import News from "../components/News.svelte";
    let isDivVisible = false;

    const handleShowDiv = () => {
        isDivVisible = true;
    };
    const getPosts = async () => {
        const res = await fetch("http://192.168.1.174:5262/api/Car"); // Replace with your API URL
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

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>
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
<Navbar on:showDiv={handleShowDiv} />
<Dashboard />
<TrendingCars />
<News />
<Slider />
<!-- <CarPage /> -->
<Footer />
<ApItest />
