<script lang="ts">
    import { onMount } from "svelte";
    import { API } from "../logic/api";
    import type { CarDto ,UserDto} from "car-api";
    import Footer from "../components/Footer.svelte";
    import Navbar from "../components/Navbar.svelte";
    import TrendingCars from "../components/TrendingCars.svelte";
    import News from "../components/News.svelte";
    import SearchSection from "../components/SearchSection.svelte";
    import Loading from "../components/Loading.svelte";
    import Login from "../components/Login.svelte";
    import AddCar from "../components/AddCar.svelte";
    import Error from "../components/Error.svelte";
    import SearchResult from "../components/SearchResult.svelte";
    import BackButton from "../components/BackButton.svelte";
    import type { SearchResult as SR } from "minisearch";
    import Auto22 from "../components/Auto22.svelte";
    import Table from "../components/table/Main.svelte";
    import DeleteCar from "../components/DeleteCar.svelte";
    import EditCar from "../components/EditCar.svelte";
    import Userpage from "../components/Userpage.svelte";
    import MapContainer from "../components/map/MapContainer.svelte";
    let ShowAddCarButton: any;
    let searchResults: SR[] | undefined | null;
    let busy = true;
    let error: any;
    let posts: CarDto[] = [];
    let token: string | null | undefined | void;
    let selected: any;
    let search: any;
    selected = "home";
    let searchQuery: any = "";
    let toglle: any;
    let CurrentUser: UserDto | undefined = undefined;
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
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>
<main>
    {#each posts as post}
        <!-- {post.power} -->
        <!-- {post.ownerId?.ownerId}
        {post.oid}<br /> -->
        <!-- {post.ownerId?.ownerId}
        {post.oid}<br /> -->
    {/each}
    <!-- <Map /> -->
    <!-- <Userpage {token} /> -->
    {#if busy}
        <Loading />
    {:else if error}
        <span style="color:red">Error: {error}</span>
        <!-- <Error /> -->
    {:else}
        <!-- <EditCar /> -->
        <!-- <DeleteCar /> -->
        <!-- <Table {posts} /> -->
        <Navbar bind:search bind:selected bind:ShowAddCarButton bind:toglle />
        {#if selected === "home"}
            <SearchSection bind:search bind:searchResults bind:selected {posts} bind:searchQuery />
        {/if}
        {#if search === "search"}
            <!-- <Dashboard {posts} bind:searchQuery /> -->
            <SearchResult {searchResults} {posts} />
            <BackButton />
            <Footer />
        {:else if selected === "home"}
            <!-- <Dashboard {posts} bind:searchQuery /> -->
            <!-- <MapContainer {posts} {CurrentUser}/> -->
            <TrendingCars {posts} />
            <TrendingCars {posts} />
            <News {posts} />
            <BackButton />
            <Auto22 />
            <Footer />
        {:else if selected === "AddCar"}
            <AddCar />
        {:else if selected === "Login"}
            <Login bind:ShowAddCarButton bind:token {posts} bind:toglle bind:selected {CurrentUser}/>
        {/if}
    {/if}
</main>
