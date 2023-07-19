<script lang="ts">
   import { API } from "../logic/api";
   import { onMount } from "svelte";
   import type { CarDto , CarParkingDto ,ParkingDto} from "car-api";
   import type { SearchResult as SR } from "minisearch";
   import { createEventDispatcher } from "svelte";
   import MiniSearch from "minisearch";
   import { element } from "svelte/internal";
   import type { UserDto } from "car-api";
   import Main from "../components/table/Main.svelte";
   export let CurrentUser: UserDto | undefined = undefined;
   export let selected: any;
   export let posts: CarDto[] = [];
   export let toglle: any;
   let newData: CarDto = {
  oid: 0,
  madeCompany: "string",
  model: "string",
  madeYear: 0,
  madeMonth: 0,
  color: "string",
  roadTraveled: 0,
  power: 0,
  hutlugch: 0,
  engine: 0,
  hvrd: 0,
  engineCapacity: 0,
  hrop: 0,
  phone: 0,
  condition: 0,
  carNumber: 0,
  price: 0,
  carType: 0,
  parkingId: {
    oid: 0,
    parkingNumber: 0,
    parkingId: 0
  }
};
// parkuudiig awj ylgah
// const getParking =async () => {
//    let busy = false;
//    try{
//       const res = await API.Parking.apiParkingIdGet();
//       return res.data ?? [];
//       }  catch (e) {
//            alert(e);
//         } finally {
//             busy = false;
//         }
//         return [];
// } 
   let selectedCar: CarDto | null;
   let search = "";
   let notification: any = "";
   let searchResults: SR[] = [];
   // let searchQuery: number | undefined = CurrentUser[0]?.id;
   let searchQuery: number | undefined = 0;

  
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
      ownerId: "ezemshigch id",
   };
   let miniSearch = new MiniSearch({
      idField: "oid",
      fields: ["power"],
      storeFields: ["oid"],
      searchOptions: {
         boost: { title: 2 },
         fuzzy: 0.1,
      },
   });

   const updateData = (posts: CarDto[]) => {
      miniSearch.removeAll();
      miniSearch.addAll(posts);
   };

   $: updateData(posts);

   const dispatch = createEventDispatcher();

   const handleSearch = () => {
      if (searchQuery !== undefined) {
         searchResults = miniSearch.search(searchQuery.toString());
         search = "search";
         dispatch("myevent", searchResults);
      }
   };
   let deleteActiveated: any;
   let DeleteMessage: any = "";
   $: handleSearch(), searchQuery;
   async function DeleteCar(carOID: number) {
      deleteActiveated = "a";
      notification = "cardeleted";
      try {
         const response = await API.Car.apiCarIdDelete({ id: carOID });
         console.log(response, "Delete car function's response is here");
         DeleteMessage = " Awtomashin ustgalt амжилттай";
      } catch (error) {
         console.error("ERROR IS HERE", error);
         alert("амжилтгүй");
      }
   }

   async function EditCar(carOID: number, editedData: CarDto) {
      try {
         const response = await API.Car.apiCarIdPut({ id: carOID, carDto: editedData });
         console.log(response);
         alert("Awtomashin zaswarlalt amjilttai");
      } catch (error) {
         console.error("ERROR IS HERE", error);
         alert("амжилтгүй");
      }
   }

   console.log(searchResults, "search result is here");

   const dispatcher = createEventDispatcher();

   const openModal = (car: CarDto) => {
  if (deleteActiveated === "a") {
    selectedCar = null;
  } else {
    selectedCar = car;
    newData = {
      ...newData,
      oid: car.oid
    };
  }
  dispatcher("modalOpen");
};

   const closeModal = () => {
      selectedCar = null;
      deleteActiveated = null;
      dispatcher("modalClose");
   };

   function Exit() {
      // toglle = "user";
      // selected = "Login";
   }
   function closenotfication() {
      notification = "";
   }
   onMount(() => {
      if (notification === "cardeleted") {
         setTimeout(() => {
            closenotfication();
         }, 1000);
      }
   });


    let error: any;
   let getCarParking = async () => {
      let busy = true
      try{
         const response = await API.CarParking.apiCarParkingPost();
         return response.data ?? [];
      } catch (e) {
            error = e;
        } finally {
            busy = false;
        }
        return [];
   }
   onMount(async ()=>{
      let carParkings =  await getCarParking();
   });
   let load = false
   let ErrorWhileGettingParks : any;
   let OwnedParks : CarParkingDto[] = [];
   const getOwnedParks = async () => {
      load = true
      try{
         const res = await API.CarParking.apiCarParkingPost();
         return res.data ?? [];
      }catch(e){
         e = ErrorWhileGettingParks;
      }finally{
         load = false;
      }
      return [];
   }
   // onMount( async () => {
   //    OwnedParks = await getOwnedParks();
   // }
   // )


   $: console.log(CurrentUser?.oid, " CurrentUser[0]?.oid");

   let g = true
   function WelcomeNotification() {
      g= false;
}


 setTimeout(WelcomeNotification, 3000);
</script>
<Main {posts}/>
{#if notification === "cardeleted"}
   <div class="message" on:click={closeModal}>
      <div>{DeleteMessage}</div>
   </div>
{/if}


<div style="display: none;">
   <input id="search" type="search" placeholder="Автомашин хайх..." bind:value={searchQuery} />
</div>
<!-- <button class="button-4" on:click={Exit}>Гарах</button> -->
{#if g === true}
<div class="profile">
   <p><span style="color: white; font-size:2srem;">Welcome back </span> {CurrentUser?.username}</p>
</div>
{/if}



<div class="container">
   <div class="parent">
      {#if searchResults && searchResults.length !== 0}
         <p class="search-info">Таны зогсоолууд({searchResults.length})</p>
         {#each searchResults as result}
            {#each posts as post}
               {#if result.oid?.toString() == post.oid?.toString()}
                  <div class="result" on:click={() => openModal(post)}>
                     <div class="info">
                        <div>
                           <strong>{titles.model}:</strong>
                           {post.model}
                        </div>
                        <div>
                           <button class="button-4" id="delete" on:click={() => DeleteCar(Number(result.oid))}>delete car</button>
                        </div>
                     </div>
                  </div>
               {/if}
            {/each}
         {/each}
      {:else}
         <div class="error">Танд зогсоол алга байна</div>
      {/if}
   </div>
</div>


<div>
   your OwnedParks
   {#each OwnedParks as i}
      <div>
         {i}
      </div>
   {/each}
</div>
{#if selectedCar}
   <div class="modal" on:click={closeModal}>
      <div class="modal-content" on:click={(e) => e.stopPropagation()}>
         <div class="modal-close" on:click={closeModal}>Хаах</div>
         <div class="modal-body">
            <div class="register-container">
               <h2>Автомашин бүртгэлийн хэсэг</h2>
               <form>
                  <div class="form-group">
                     <div>
                        <label for="carNumber">Машины дугаар</label>
                        <input type="number" bind:value={newData.carNumber} id="carNumber" />
                     </div>
                     <div>
                        <label for="color">Өнгө</label>
                        <input type="text" bind:value={newData.color} id="color" />
                     </div>
                     <div>
                        <label for="condition">Нөхцөл</label>
                        <input type="number" bind:value={newData.condition} id="condition" />
                     </div>
                     <div>
                        <label for="engine">Хөдөлгүүр</label>
                        <input type="number" bind:value={newData.engine} id="engine" />
                     </div>
                     <div>
                        <label for="engineCapacity">Хөдөлгүүрийн багтаамж</label>
                        <input type="number" bind:value={newData.engineCapacity} id="engineCapacity" />
                     </div>
                     <div>
                        <label for="hrop">Хроп</label>
                        <input type="number" bind:value={newData.hrop} id="hrop" />
                     </div>
                     <div>
                        <label for="hutlugch">Хөтлөгч</label>
                        <input type="number" bind:value={newData.hutlugch} id="hutlugch" />
                     </div>
                     <div>
                        <label for="hvrd">Хүрд</label>
                        <input type="number" bind:value={newData.hvrd} id="hvrd" />
                     </div>
                     <div>
                        <label for="madeCompany">Үйлдвэрлэгч компани</label>
                        <input type="text" bind:value={newData.madeCompany} id="madeCompany" />
                     </div>
                     <div>
                        <label for="madeMonth">Үйлдвэрлэсэн сар</label>
                        <input type="number" bind:value={newData.madeMonth} id="madeMonth" />
                     </div>
                     <div>
                        <label for="madeYear">Үйлдвэрлэсэн он</label>
                        <input type="number" bind:value={newData.madeYear} id="madeYear" />
                     </div>
                     <div>
                        <label for="model">Загвар</label>
                        <input type="text" bind:value={newData.model} id="model" />
                     </div>
                     <div>
                        <label for="phone">Утасны дугаар</label>
                        <input type="number" bind:value={newData.phone} id="phone" />
                     </div>
                     <div>
                        <label for="power">Хүчин чадал</label>
                        <input type="number" bind:value={newData.power} id="power" />
                     </div>
                     <div>
                        <label for="price">Үнэ</label>
                        <input type="number" bind:value={newData.price} id="price" />
                     </div>
                     <div>
                        <label for="roadTraveled">Туулсан зам</label>
                        <input type="number" bind:value={newData.roadTraveled} id="roadTraveled" />
                     </div>
                  </div>
               </form>
            </div>
            <button class="button-4" on:click={() => EditCar(Number(selectedCar?.oid), newData)}>Edit {newData.engine} car</button>
         </div>
      </div>
   </div>
{/if}

<style>
      .profile{
         width: 100vw;
         display: flex;

      }
   .profile p{
      background: #24292e;
      padding: 30px;
      border-radius: 10px;
      z-index: 999999;
      top: 60px;
      right: 30px;
   }
   .message {
      position: sticky;
      top: 10px;
      width: 100vw;
      height: 0;
      display: flex;
      justify-content: center;
      align-items: center;

   }
   .message > div {
      background: var(--primary-color);
      color: white;
      padding: 10px;
      border-radius: 10px;
   }
   p {
      position: absolute;
      top: 100px;
   }
   .container {
      height: inherit;
      min-height: 100vh;
      width: 100vw;
      background: var(--background-color);
      display: flex;
      justify-content: center;
      padding-bottom: 50px;
      background: rgb(35, 34, 34);
   }
   .parent {
      margin-top: 50px;
      height: inherit;
      width: 40vw;
   }
   .result {
      background: var(--primary-color);
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
      border: var(--primary-color) 2px solid;
   }
   .result:hover {
      color: white;
      background: rgb(101, 92, 92);
      border: var(--primary-color) 2px solid;
   }
   .info {
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
   }
   #delete:hover {
      background: rgb(205, 52, 52);
      color: white;
   }
   .search-info {
      font-weight: bold;
      color: #888;
      position: relative;
      top: 0;
   }
   .error {
      font-style: italic;
   }

   .car-list {
      background: rgb(199, 199, 208);
      height: 50vh;
      width: 50vw;
   }
   p {
      color: var(--primary-color);
      font-size: 2rem;
   }
   .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
   }

   .modal-content {
      background-color: white;
      padding: 20px;
      max-width: 900px;
      width: 90%;
      border-radius: 8px;
   }

   .modal-close {
      cursor: pointer;
      text-align: center;
      border-radius: 5px;
      color: #888;
      width: 50px;
      position: relative;
      left: 90%;
      border: 1px solid rgba(86, 76, 76, 0.544);
   }
   .modal-close:hover {
      background: var(--disabled);
      color: b;
   }

   .modal-body {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
   }

   .modal-info {
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      margin: 3px 10px;
   }
   .button-4 {
      appearance: none;
      background-color: #fafbfc;
      border: 1px solid rgba(27, 31, 35, 0.15);
      border-radius: 6px;
      box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
      box-sizing: border-box;
      color: #24292e;
      cursor: pointer;
      display: inline-block;
      font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      list-style: none;
      padding: 6px 16px;
      position: relative;
      transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: middle;
      white-space: nowrap;
      word-wrap: break-word;
   }

   .button-4:hover {
      background-color: #f3f4f6;
      text-decoration: none;
      transition-duration: 0.1s;
   }

   .button-4:disabled {
      background-color: #fafbfc;
      border-color: rgba(27, 31, 35, 0.15);
      color: #959da5;
      cursor: default;
   }

   .button-4:active {
      background-color: #edeff2;
      box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
      transition: none 0s;
   }

   .button-4:focus {
      outline: 1px transparent;
   }

   .button-4:before {
      display: none;
   }

   .button-4:-webkit-details-marker {
      display: none;
   }
</style>
