<script lang="ts">
   import Car from "../../components/car.svelte";
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
</script>

<Car {posts} />
