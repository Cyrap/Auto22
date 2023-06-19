<script lang="ts">
    import type { CarDto } from "car-api";
    import { DataHandler, Datatable, Th, ThFilter, type Row } from '@vincjo/datatables'

    export let posts: CarDto[];

    
    $: handler = new DataHandler(posts as (CarDto & Record<string,unknown>)[], { rowsPerPage: 20 })
    $: rows = handler.getRows()
    
    console.log({posts, rows: $rows});
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                {#each posts as post}
                <Th {handler} orderBy="model">{post}</Th>
                {/each}
            </tr>
            <tr>
                <ThFilter {handler} filterBy="model"/>
                <ThFilter {handler} filterBy="madeYear"/>
                <ThFilter {handler} filterBy="color"/>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.model}</td>
                    <td>{row.madeYear}</td>
                    <td>{row.color}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>
