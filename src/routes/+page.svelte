<script lang="ts">
    import { onMount } from "svelte";
    import { API } from "../logic/api";
    import type { CarDto } from "car-api";
    import Footer from "../components/footer.svelte";
    import Navbar from "../components/navbar.svelte";
    import Dashboard from "../components/dashboard.svelte";
    import TrendingCars from "../components/trendingCars.svelte";
    import News from "../components/News.svelte";
    import Loading from "../components/loading.svelte";
    import Car from "../components/car.svelte";

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
</script>

<Car {posts} />

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
        <Dashboard {posts} />
        <TrendingCars trending={posts} />
        <News {posts} />
        <Footer />
        {#each posts as post}
            <div>
                <p>OID: {post.oid}</p>
                <p>Made Company: {post.madeCompany}</p>
                <p>Model: {post.model}</p>
                <p>Made Year: {post.madeYear}</p>
                <p>Made Month: {post.madeMonth}</p>
                <!-- Add other properties as needed -->
            </div>
        {/each}
    {/if}
</main>
