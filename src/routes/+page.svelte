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
    import Table from "../components/table/Main.svelte";
    import Login from "../components/Login.svelte";
    import AddCar from "../components/AddCar.svelte";
    import About from "../components/About.svelte";
    import Error from "../components/Error.svelte";
    let busy = true;
    let error: any;

    let posts: CarDto[] = [];
    let isDivVisible = false;
    let isFormVisible = true;

    let modelFilter = "";

    const handleShowForm = () => {
        isFormVisible = true;
    };
    const handleShowDiv = () => {
        isDivVisible = true;
    };
    const getPosts = async () => {
        busy = true;

        try {
            const res = await API.Car.apiCarGet({ modelFilter });
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
    let selectedCar: CarDto | null;
    const onClose = () => {
        selectedCar = null;
    };
    let selected: any;
    selected = "home";
    let success = true;
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
        <Error />
    {:else}
        <Navbar on:showDiv={handleShowDiv} bind:selected />
        {#if selected === "home"}
            <Dashboard {posts} />PO432123456- <TrendingCars {posts} />
            <News {posts} />
            <Footer />
        {:else if selected === "about"}
            <About />
        {:else if selected === "AddCar"}
            {#if success == true}
                <Table {posts} />
            {:else}
                <Login />
            {/if}
        {:else if selected === "Login"}
            <AddCar />
        {/if}
    {/if}
</main>
