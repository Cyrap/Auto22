<script lang="ts">
    import { onMount } from "svelte";
    import { API } from "../logic/api";
    import type { CarDto } from "car-api";
    import type { UserDto } from "car-api";
    import Footer from "../components/Footer.svelte";
    import Navbar from "../components/Navbar.svelte";
    import Dashboard from "../components/Dashboard.svelte";
    import TrendingCars from "../components/TrendingCars.svelte";
    import News from "../components/News.svelte";
    import Loading from "../components/Loading.svelte";
    import Login from "../components/Login.svelte";
    import AddCar from "../components/AddCar.svelte";
    import About from "../components/About.svelte";
    import Error from "../components/Error.svelte";
    import Table from "../components/table/Main.svelte";
    import SearchResult from "../components/SearchResult.svelte";
    import Map from "../components/Map.svelte";
    import BackButton from "../components/BackButton.svelte";
    import type { SearchResult as SR } from "minisearch";
    let searchResults: SR[] | undefined | null;
    let busy = true;
    let error: any;
    let posts: CarDto[] = [];
    let user: UserDto | undefined = undefined;
    let selected: any;
    let search: any;
    selected = "home";
    let searchQuery: any = "";
    const getPosts = async () => {
        busy = true;
        try {
            // const res = await API.Car.apiCarGet({ modelFilter });
            const res = await API.Car.apiCarGet();
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

    $: console.log(posts);
    const loginFunc = async () => {
        busy = true;
        try {
            const res = await API.User.usersAuthenticatePost();

            // if (res.status == 200 || res.status == 201) {
            //     getUser();
            // }

            console.log(res.data);
            return res.data;
        } catch (e) {
            error = e;
        } finally {
            busy = false;
        }
        return [];
    };

    // const getUser = () async => {
    //     try {
    //         const res = await API.User.usersUsersIdGet("adsadbsuaibdsuiavdyuadyusvadyud");

    //         user = res.data;
    //     } catch (error) {

    //     }
    // }
    $: console.log(user, "user token is here");
</script>

<!-- <button on:click={loginFunc}> get Token</button> -->
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
        <Navbar bind:search bind:searchResults bind:selected {posts} bind:searchQuery />
        {#if search === "search"}
            <SearchResult {searchResults} {posts} />
            <BackButton />
            <Footer />
        {:else if selected === "about"}
            <About />
        {:else if selected === "home"}
            <div class="body">
                <Dashboard {posts} bind:searchQuery />
                <Map />
            </div>
            <TrendingCars {posts} />
            <TrendingCars {posts} />
            <News {posts} />
            <BackButton />
            <Footer />
        {:else if selected === "AddCar"}
            {#if posts}
                <Table {posts} />
            {:else}
                <Login />
            {/if}
        {:else if selected === "Login"}
            <AddCar />
        {/if}
    {/if}
</main>

<style>
    .body {
        display: flex;
        flex-direction: row;
    }
    @media (max-width: 800px) {
        .body {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
        }
    }
</style>
