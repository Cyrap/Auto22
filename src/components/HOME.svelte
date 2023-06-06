<!-- <script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { afterUpdate, onDestroy, setContext } from "svelte";

    export let photos = [];

    onMount(async () => {
        await fetchData();
    });

    async function fetchData() {
        try {
            const response = await axios.get(
                "https://api.pexels.com/v1/search",
                {
                    headers: {
                        Authorization:
                            "XbefhaUr0XfQSYvisb4tBSPJX1W4L8eUNcIBEQM1rTIoJ1QRBRfqvWCN",
                    },
                    params: {
                        per_page: 12,
                        page: 1,
                        query: "coding",
                    },
                }
            );
            photos = response.data.photos;
        } catch (error) {
            alert(error);
        }
    }
</script>

<div class="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto w-3/5">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
            <thead>
                <tr>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                        Photographer
                    </th>
                    <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                        Image
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each photos as photo, index}
                    <tr key={photo.id}>
                        <td
                            class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        >
                            <p class="text-gray-900 whitespace-no-wrap">
                                {index + 1}
                            </p>
                        </td>
                        <td
                            class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        >
                            <p class="text-gray-900 whitespace-no-wrap">
                                {photo.photographer}
                            </p>
                        </td>
                        <td class="border-b border-gray-200 bg-white text-sm">
                            <a href={photo.src.original}>
                                <img
                                    src={photo.src.small}
                                    class="w-20 rounded-md"
                                />
                            </a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div> -->
