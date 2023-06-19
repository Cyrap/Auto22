<script lang="ts">
    import type { CarDto } from "car-api";
    import { DataHandler, Datatable, Th, ThFilter, type Row } from '@vincjo/datatables'

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
      oid: "OID",
      phone: "Утас",
      power: "Хүч",
      roadTraveled: "Туулсан зам",
      turul: "Төрөл",
   };

    $: handler = new DataHandler(posts as (CarDto & Record<string,unknown>)[], { rowsPerPage: 15 })
    $: rows = handler.getRows()
    
    console.log({posts, rows: $rows});
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                {#if posts.length > 0}
                {#each Object.entries(posts[0]) as [key]}
                {#if key in titles}
                <Th {handler} orderBy="model">{titles[key]}</Th>
                {/if}
                {/each}
                {/if}
            </tr>
            <tr>
                <ThFilter {handler} filterBy='oid'/>
                <ThFilter {handler} filterBy='madeCompany'/>
                <ThFilter {handler} filterBy='model'/>
                <ThFilter {handler} filterBy='madeYear'/>
                <ThFilter {handler} filterBy='madeMonth'/>
                <ThFilter {handler} filterBy='color'/>
                <ThFilter {handler} filterBy='roadTraveled'/>
                <ThFilter {handler} filterBy='power'/>
                <ThFilter {handler} filterBy='hutlugch'/>
                <ThFilter {handler} filterBy='engine'/>
                <ThFilter {handler} filterBy='turul'/>
                <ThFilter {handler} filterBy='hvrd'/>
                <ThFilter {handler} filterBy='engineCapacity'/>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    {#each ['oid', 'madeCompany', 'model', 'madeYear' , 'madeMonth','color' ,'roadTraveled','power','hutlugch','engine','turul','hvrd','engineCapacity'] as prop}
                    <td>{row[prop]}</td>
                  {/each}
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
