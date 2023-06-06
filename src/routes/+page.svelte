<script lang="ts">
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
</script>

<!-- {#if isDivVisible}<CarRegister />{/if} -->
<CarRegister bind:isDivVisible />
<Navbar on:showDiv={handleShowDiv} />
<Dashboard />
<CarList />
<Slider />
<PageButton />
<TrendingCars />
<CarPage />
<Footer />
<ApItest />
