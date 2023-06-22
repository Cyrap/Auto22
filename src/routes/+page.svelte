<script lang="ts">
    import { onMount } from "svelte";
    import { API } from "../logic/api";
    import type { CarDto } from "car-api";
    import type { UserDto } from "car-api";
    import Footer from "../components/footer.svelte";
    import Navbar from "../components/Navbar.svelte";
    import Dashboard from "../components/dashboard.svelte";
    import TrendingCars from "../components/TrendingCars.svelte";
    import News from "../components/News.svelte";
    import Loading from "../components/Loading.svelte";
    import Login from "../components/Login.svelte";
    import AddCar from "../components/AddCar.svelte";
    import About from "../components/About.svelte";
    import Error from "../components/Error.svelte";
    import Table from "../components/table/Main.svelte";
    let busy = true;
    let error: any;
    let posts: CarDto[] = [];
    let user: UserDto | undefined = undefined;
    let isDivVisible = false;
    let modelFilter = "";
    let selected: any;
    selected = "home";
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

    $: console.log(user);
</script>

<button on:click={loginFunc}> get Token</button>
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
            <Dashboard {posts} />
            <TrendingCars {posts} />
            <News {posts} />
            <Footer />
        {:else if selected === "about"}
            <About />
        {:else if selected === "AddCar"}
            {#if !posts}
                <Table {posts} />
            {:else}
                <Login />
            {/if}
        {:else if selected === "Login"}
            <AddCar />
        {/if}
    {/if}
</main>
