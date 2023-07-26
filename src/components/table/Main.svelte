<script lang="ts">
    import type { CarDto } from "car-api";
    import { DataHandler, Datatable, Th, ThFilter, type Row } from "@vincjo/datatables";
    export let posts: CarDto[];

    var titles: any = {
        carNumber: "Машины дугаар",
        color: "Өнгө",
        condition: "Нөхцөл",
        engine: "Хөдөлгүүр",
        engineCapacity: "Хөдөлгүүрийн багтаамж",
        hrop: "Хорооп",
        hutlugch: "Хөтлөгч",
        hvrd: "Хүрд",
        madeCompany: "Үйлдвэрлэсэн газар",
        madeMonth: "Үйлдвэрлэсэн сар",
        madeYear: "Үйлдвэрлэсэн жил",
        model: "Загвар",
        phone: "Утас",
        power: "Хүч",
        roadTraveled: "Туулсан зам",
        turul: "Төрөл",
    };

    $: handler = new DataHandler(posts as (CarDto & Record<string, unknown>)[], { rowsPerPage: 15 });
    $: rows = handler.getRows();
</script>

<Datatable {handler}>
    <div class="main">
        <div class="option">
            <div class="emthy">
                Танд автомашин алга байна.
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    {#if posts.length > 0}
                        {#each Object.entries(posts[0]) as [key]}
                            {#if key in titles}
                                <Th {handler} orderBy="model">{titles[key]}</Th>
                              
                            {/if}
                        {/each}
                        {:else}
                    {/if}
                </tr>
                <tr>
                    <ThFilter {handler} filterBy="madeCompany" />
                    <ThFilter {handler} filterBy="model" />
                    <ThFilter {handler} filterBy="madeYear" />
                    <ThFilter {handler} filterBy="madeMonth" />
                    <ThFilter {handler} filterBy="color" />
                    <ThFilter {handler} filterBy="roadTraveled" />
                    <ThFilter {handler} filterBy="power" />
                    <ThFilter {handler} filterBy="hutlugch" />
                    <ThFilter {handler} filterBy="engine" />
                    <ThFilter {handler} filterBy="turul" />
                    <ThFilter {handler} filterBy="hvrd" />
                    <ThFilter {handler} filterBy="engineCapacity" />
                    <ThFilter {handler} filterBy="hrop" />
                    <ThFilter {handler} filterBy="phone" />
                    <ThFilter {handler} filterBy="condition" />
                    <ThFilter {handler} filterBy="carNumber" />
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        {#each ["madeCompany", "model", "madeYear", "madeMonth", "color", "roadTraveled", "power", "hutlugch", "engine", "turul", "hvrd", "engineCapacity", "hrop", "phone", "condition", "carNumber"] as prop}
                            <td>
                                <input bind:value={row[prop]}>
                            </td>
                        {/each}
                        <div class="option-buttons">
                            <td>
                                <button>Устгах</button>
                                <button>Хадгалах</button>
                            </td>
                        </div>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Datatable>

<style>
    .option-buttons{
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .option {
        display: flex;
        justify-content: space-between;
        padding-left: 1vw;
        width: 97vw;
    }
    .main {
        height: 79vh;
    }
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
    }

    tbody tr:hover {
        background: #e5e9e9;
    }
    input{
        border-radius: 5px;
        border: none;
        width: 100px;
        height: 20px;
        padding: 10px 0px;
    }
    input:hover{
        background: #fafafa;;
    }
</style>
