<script lang="ts">
    import { onMount } from "svelte";
    import { API } from "../logic/api";
    import type { CarDto } from "car-api";
    import Footer from "../components/footer.svelte";
    import Navbar from "../components/Navbar.svelte";
    import Dashboard from "../components/dashboard.svelte";
    import TrendingCars from "../components/TrendingCars.svelte";
    import News from "../components/News.svelte";
    import Loading from "../components/Loading.svelte";
    import CarList from "../components/CarList.svelte";
    import Table from "../components/table/Main.svelte"
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
            console.log(res.data.items);

            return res.data.items ?? [];
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

    import CarButton from "../components/CarButton.svelte";

    let selectedCar: CarDto | null;

    const onClose = () => {
        selectedCar = null;
    };
</script>

<!-- {#each posts as post}
    <CarButton {post} on:carClicked={(event) => (selectedCar = event.detail)} />
{/each}

{#if selectedCar}
    <Car post={selectedCar} {onClose} />
{/if} -->

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
        <!--     <Car info={posts} /> -->
        <Navbar on:showDiv={handleShowDiv} />
        <Dashboard {posts} />
        <TrendingCars {posts} />
        <News {posts} />
        <Footer />
        <CarList {posts}/>
        <Table {posts}/>
    {/if}
</main>
