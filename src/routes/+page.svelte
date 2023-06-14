<script lang="ts">
    import { onMount } from "svelte";
    // Машиний үндсэн мэдээлэл хадгалах object
    import CarList from "../components/carList.svelte";
    import Footer from "../components/footer.svelte";
    import Navbar from "./navbar.svelte";
    import Dashboard from "../components/dashboard.svelte";
    import Slider from "../components/slider.svelte";
    import PageButton from "../components/pageButton.svelte";
    import TrendingCars from "../components/trendingCars.svelte";
    import ApItest from "../components/APItest.svelte";
    import News from "../components/News.svelte";
    import { API } from "../logic/api";
    import type { CarDto } from "car-api";
    import LastAddedCars from "../components/LastAddedCars.svelte";
    import Loading from "../components/loading.svelte";

    let busy = true;
    let error: any;

    let posts: CarDto[] = [];
    let isDivVisible = false;

    const handleShowDiv = () => {
        isDivVisible = true;
    };
    const getPosts = async () => {
        busy = true;

        try {
            const res = await API.Car.apiCarGet();
            console.log(res.data);

            return res.data;
        } catch (e) {
            error = e;
        } finally {
            busy = false;
        }

        return [];
    };
    onMount(async () => {
        posts = await getPosts();
    });
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>
<main>
    {#if busy}
        <Loading />
    {:else if error}
        <span style="color:red">Error: {error}</span>
    {:else}
        <Navbar on:showDiv={handleShowDiv} />
        <Dashboard />
        <TrendingCars trending={posts} />
        <LastAddedCars />
        <News />
        <div>{posts}</div>
        {#each posts as post}
            <div>{post.madeCompany}</div>
        {/each}
    {/if}
</main>
<Footer />
<ApItest />
