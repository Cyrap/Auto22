<script lang="ts">
   import { createEventDispatcher } from "svelte";
   import type { CarDto } from "car-api";
   import type { ParkingDto } from "car-api";
   import { onMount } from "svelte";
   import Moveable from "svelte-moveable";
   import { API } from "../../logic/api";
   export let posts: CarDto[] = [];
   let selectedCar: CarDto | null = null;
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
   const draggable = true;
   const throttleDrag = 1;
   const edgeDraggable = false;
   const startDragRotate = 0;
   const throttleDragRotate = 0;
   let targetRef = null;
   let plan: SVGElement;
   // export let parks: ParkingDto[] = [];
   let parks: String[] = [];
   // mashin baiwal oor ongoor haruulah
   parks.forEach((a) => {
      const rect = plan.querySelector(`g[class^="$"] > g#${a} > rect`)
      if (rect) {
         const carObject = posts.find((car) => car?.engine !== undefined && car?.engine.toString() === a);
         if (carObject) {
            rect.setAttribute("fill", "green");
         } else {
            rect.setAttribute("fill", "blue");
         }
      }
   });
   // daragdsan mashinii id-g awah
   parks.forEach((a) => {
      const rect = plan.querySelector(`g[class^="$"] > g#${a} > rect`);
      if (rect) {
         rect.classList.add("selected");
      }
   });

   const dispatcher = createEventDispatcher();
   let a: any = "";
   function passId(id: number) {
      let car = null;
      for (let i = 0; i < posts.length; i++) {
         if (posts[i].engine === id) {
            car = posts[i];
            break;
         }
      }
      if (car) {
         openModal(car);
      } else {
         a = "emthyPark";
      }
   }

   let selectedParkNumber: string | null = null;
   function handleClick(e: MouseEvent) {
      const target = e.target as SVGElement;
      if (target.tagName.toLowerCase() === "rect" && target.parentElement?.parentElement?.id.startsWith("$")) {
         selectedParkNumber = target.parentElement?.id;
         console.log(selectedParkNumber,"park2");
         passId(Number(selectedParkNumber));
      }
   }
   onMount(() => {
      plan.addEventListener("click", handleClick);
      return () => {
         plan.removeEventListener("click", handleClick);
      };
   });
   const openModal = (car: CarDto) => {
      selectedCar = car;
      dispatcher("modalOpen");
   };

   const closeModal = () => {
      selectedCar = null;
      a = "";
      dispatcher("modalClose");
   };

   // let busy = false;
   // let error: any = "";
   // let parkObjects: ParkingDto[] = [];
   // const getPark = async () => {
   //    busy = true;
   //    try {
   //       const res = await API.Park.apiParkingPost();
   //       return res.data;
   //    } catch (e) {
   //       error = e;
   //    } finally {
   //       busy = false;
   //    }
   //    return [];
   // };
   // onMount(async () => {
   //    parkObjects = getPark();
   // });
   // console.log(parkObjects);
   let scrollValue: number = 0;
   function Zoom(){
      
   }
function increaseHeight() {
   if(  plan.height.baseVal.value > 3000 ) return 
      plan.height.baseVal.value += 500;
  }
   function decHeight() {
      if(  plan.height.baseVal.value < 600 ) return 
      plan.height.baseVal.value -= 500;
  }
</script>
{#if selectedCar}
   <div class="modal" on:click={closeModal}>
      <div class="modal-content" on:click={(e) => e.stopPropagation()}>
         <div class="modal-close" on:click={closeModal}>Close</div>
         <div class="modal-body">
            {#each Object.entries(selectedCar) as [key, value]}
               {#if key in titles}
                  <div class="modal-info">
                     <strong>{titles[key]}:</strong>
                     {value}
                  </div>
               {/if}
            {/each}
         </div>
      </div>
   </div>
{/if}

{#if a === "emthyPark"}
   <div class="modal" on:click={closeModal}>
      <div class="modal-content" on:click={(e) => e.stopPropagation()}>
         <div class="modal-close" on:click={closeModal}>Close</div>
         <div class="modal-body">
            <div class="modal-info">
               <strong>Энэ {selectedParkNumber} зогсоолд автомашин алга байна</strong>
            </div>
            <!-- {#if CurrentUser} -->
            <button>Зогсоолыг захиалах</button>
            <!-- {/if} -->
         </div>
      </div>
   </div>
{/if}


<div class="map-container">
   <div class="button-container">
      <button  class="zoomButton" on:click={decHeight}>-</button>
      <button class="zoomButton" on:click={increaseHeight}>+</button>
   </div>
   <div bind:this={targetRef}>
<svg width="2500" height="2001" viewBox="0 0 2898 3301" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={handleClick} bind:this={plan} >
   <rect width="2898" height="3301"/>
   <g id="area-two" clip-path="url(#clip0_0_1)">
   <g id="Extras">
   <path id="Vector 25" d="M808.887 1338.95L451.166 688.875L947.046 416.004L1298.98 1055.57L808.887 1338.95Z" fill="#FFF1E4" stroke="grey" stroke-width="3"/>
   <path id="Vector 23" d="M879.874 1198.3L830.7 1108.94L951.098 1035.27C870.432 941.775 943.634 887.569 990.318 872.152L879.02 677.152L928.082 650.154L1001.58 669.634L1125.96 884.259L1131.65 881.125L1149.25 913.104C1133.81 925.707 1125.6 924.404 1123.43 922.178C1080.01 974.374 1084.37 1036.5 1091.98 1061.04L1097.23 1058.15L1112.66 1086.19L1082 1103.06L1075.25 1090.79L879.874 1198.3Z" fill="#D9D9D9" stroke="grey" stroke-width="3" stroke-dasharray="6 6"/>
   </g>
   <g id="Items">
   <path id="BG$1-126" d="M68.8731 1480.14L66.5597 899.297L452.05 687.171L807.843 1333.74L196.978 1698.42L68.8731 1480.14Z" fill="#FFF1E4" stroke="grey" stroke-width="3"/>
   <g id="$1-126">
   <g id="02">
   <rect id="2335_rectangle" x="109.67" y="1095.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 109.67 1095.62)" fill="#85929E"/>
   </g>
   <g id="20">
   <rect id="2335_rectangle_2" x="161.544" y="1187.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 161.544 1187.22)" fill="#85929E"/>
   </g>
   <g id="01">
   <rect id="2335_rectangle_3" x="86.3138" y="1108.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 86.3138 1108.91)" fill="#85929E"/>
   </g>
   <g id="19">
   <rect id="2335_rectangle_4" x="138.257" y="1200.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 138.257 1200.64)" fill="#85929E"/>
   </g>
   <g id="37">
   <rect id="2335_rectangle_5" x="164.859" y="1246.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 164.859 1246.87)" fill="#85929E"/>
   </g>
   <g id="55">
   <rect id="2335_rectangle_6" x="218.197" y="1339.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 218.197 1339.65)" fill="#85929E"/>
   </g>
   <g id="73">
   <rect id="2335_rectangle_7" x="244.624" y="1385.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 244.624 1385.6)" fill="#85929E"/>
   </g>
   <g id="91">
   <rect id="2335_rectangle_8" x="298.356" y="1477.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 298.356 1477.03)" fill="#85929E"/>
   </g>
   <g id="109">
   <rect id="2335_rectangle_9" x="324.783" y="1522.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 324.783 1522.98)" fill="#85929E"/>
   </g>
   <g id="38">
   <rect id="2335_rectangle_10" x="188.146" y="1233.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 188.146 1233.46)" fill="#85929E"/>
   </g>
   <g id="56">
   <rect id="2335_rectangle_11" x="241.484" y="1326.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 241.484 1326.24)" fill="#85929E"/>
   </g>
   <g id="74">
   <rect id="2335_rectangle_12" x="267.911" y="1372.19" width="25.0361" height="51.6308" transform="rotate(-30.0029 267.911 1372.19)" fill="#85929E"/>
   </g>
   <g id="92">
   <rect id="2335_rectangle_13" x="321.643" y="1463.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 321.643 1463.61)" fill="#85929E"/>
   </g>
   <g id="110">
   <rect id="2335_rectangle_14" x="348.07" y="1509.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 348.07 1509.56)" fill="#85929E"/>
   </g>
   <g id="03">
   <rect id="2335_rectangle_15" x="133.026" y="1082.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 133.026 1082.32)" fill="#85929E"/>
   </g>
   <g id="21">
   <rect id="2335_rectangle_16" x="184.831" y="1173.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 184.831 1173.81)" fill="#85929E"/>
   </g>
   <g id="39">
   <rect id="2335_rectangle_17" x="211.433" y="1220.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 211.433 1220.04)" fill="#85929E"/>
   </g>
   <g id="57">
   <rect id="2335_rectangle_18" x="264.771" y="1312.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 264.771 1312.82)" fill="#85929E"/>
   </g>
   <g id="75">
   <rect id="2335_rectangle_19" x="291.198" y="1358.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 291.198 1358.77)" fill="#85929E"/>
   </g>
   <g id="93">
   <rect id="2335_rectangle_20" x="344.93" y="1450.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 344.93 1450.2)" fill="#85929E"/>
   </g>
   <g id="111">
   <rect id="2335_rectangle_21" x="371.357" y="1496.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 371.357 1496.15)" fill="#85929E"/>
   </g>
   <g id="04">
   <rect id="2335_rectangle_22" x="156.382" y="1069.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 156.382 1069.03)" fill="#85929E"/>
   </g>
   <g id="22">
   <rect id="2335_rectangle_23" x="208.117" y="1160.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 208.117 1160.39)" fill="#85929E"/>
   </g>
   <g id="40">
   <rect id="2335_rectangle_24" x="234.72" y="1206.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 234.72 1206.63)" fill="#85929E"/>
   </g>
   <g id="58">
   <rect id="2335_rectangle_25" x="288.058" y="1299.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 288.058 1299.41)" fill="#85929E"/>
   </g>
   <g id="76">
   <rect id="2335_rectangle_26" x="314.485" y="1345.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 314.485 1345.36)" fill="#85929E"/>
   </g>
   <g id="94">
   <rect id="2335_rectangle_27" x="368.217" y="1436.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 368.217 1436.78)" fill="#85929E"/>
   </g>
   <g id="112">
   <rect id="2335_rectangle_28" x="394.644" y="1482.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 394.644 1482.73)" fill="#85929E"/>
   </g>
   <g id="05">
   <rect id="2335_rectangle_29" x="179.738" y="1055.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 179.738 1055.74)" fill="#85929E"/>
   </g>
   <g id="23">
   <rect id="2335_rectangle_30" x="231.404" y="1146.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 231.404 1146.98)" fill="#85929E"/>
   </g>
   <g id="41">
   <rect id="2335_rectangle_31" x="258.007" y="1193.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 258.007 1193.21)" fill="#85929E"/>
   </g>
   <g id="59">
   <rect id="2335_rectangle_32" x="311.344" y="1285.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 311.344 1285.99)" fill="#85929E"/>
   </g>
   <g id="77">
   <rect id="2335_rectangle_33" x="337.772" y="1331.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 337.772 1331.95)" fill="#85929E"/>
   </g>
   <g id="95">
   <rect id="2335_rectangle_34" x="391.503" y="1423.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 391.503 1423.37)" fill="#85929E"/>
   </g>
   <g id="113">
   <rect id="2335_rectangle_35" x="417.931" y="1469.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 417.931 1469.32)" fill="#85929E"/>
   </g>
   <g id="06">
   <rect id="2335_rectangle_36" x="203.094" y="1042.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 203.094 1042.44)" fill="#85929E"/>
   </g>
   <g id="24">
   <rect id="2335_rectangle_37" x="254.691" y="1133.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 254.691 1133.56)" fill="#85929E"/>
   </g>
   <g id="42">
   <rect id="2335_rectangle_38" x="281.294" y="1179.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 281.294 1179.8)" fill="#85929E"/>
   </g>
   <g id="60">
   <rect id="2335_rectangle_39" x="334.631" y="1272.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 334.631 1272.58)" fill="#85929E"/>
   </g>
   <g id="78">
   <rect id="2335_rectangle_40" x="361.059" y="1318.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 361.059 1318.53)" fill="#85929E"/>
   </g>
   <g id="96">
   <rect id="2335_rectangle_41" x="414.79" y="1409.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 414.79 1409.95)" fill="#85929E"/>
   </g>
   <g id="114">
   <rect id="2335_rectangle_42" x="441.218" y="1455.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 441.218 1455.91)" fill="#85929E"/>
   </g>
   <g id="07">
   <rect id="2335_rectangle_43" x="226.449" y="1029.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 226.449 1029.15)" fill="#85929E"/>
   </g>
   <g id="25">
   <rect id="2335_rectangle_44" x="277.978" y="1120.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 277.978 1120.15)" fill="#85929E"/>
   </g>
   <g id="43">
   <rect id="2335_rectangle_45" x="304.581" y="1166.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 304.581 1166.39)" fill="#85929E"/>
   </g>
   <g id="61">
   <rect id="2335_rectangle_46" x="357.918" y="1259.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 357.918 1259.17)" fill="#85929E"/>
   </g>
   <g id="79">
   <rect id="2335_rectangle_47" x="384.346" y="1305.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 384.346 1305.12)" fill="#85929E"/>
   </g>
   <g id="97">
   <rect id="2335_rectangle_48" x="438.077" y="1396.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 438.077 1396.54)" fill="#85929E"/>
   </g>
   <g id="115">
   <rect id="2335_rectangle_49" x="464.505" y="1442.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 464.505 1442.49)" fill="#85929E"/>
   </g>
   <g id="08">
   <rect id="2335_rectangle_50" x="249.805" y="1015.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 249.805 1015.86)" fill="#85929E"/>
   </g>
   <g id="26">
   <rect id="2335_rectangle_51" x="301.265" y="1106.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 301.265 1106.74)" fill="#85929E"/>
   </g>
   <g id="44">
   <rect id="2335_rectangle_52" x="327.868" y="1152.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 327.868 1152.97)" fill="#85929E"/>
   </g>
   <g id="62">
   <rect id="2335_rectangle_53" x="381.205" y="1245.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 381.205 1245.75)" fill="#85929E"/>
   </g>
   <g id="80">
   <rect id="2335_rectangle_54" x="407.633" y="1291.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 407.633 1291.7)" fill="#85929E"/>
   </g>
   <g id="98">
   <rect id="2335_rectangle_55" x="461.364" y="1383.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 461.364 1383.12)" fill="#85929E"/>
   </g>
   <g id="116">
   <rect id="2335_rectangle_56" x="487.792" y="1429.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 487.792 1429.08)" fill="#85929E"/>
   </g>
   <g id="09">
   <rect id="2335_rectangle_57" x="273.161" y="1002.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 273.161 1002.56)" fill="#85929E"/>
   </g>
   <g id="27">
   <rect id="2335_rectangle_58" x="324.552" y="1093.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 324.552 1093.32)" fill="#85929E"/>
   </g>
   <g id="45">
   <rect id="2335_rectangle_59" x="351.155" y="1139.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 351.155 1139.56)" fill="#85929E"/>
   </g>
   <g id="63">
   <rect id="2335_rectangle_60" x="404.492" y="1232.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 404.492 1232.34)" fill="#85929E"/>
   </g>
   <g id="81">
   <rect id="2335_rectangle_61" x="430.92" y="1278.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 430.92 1278.29)" fill="#85929E"/>
   </g>
   <g id="99">
   <rect id="2335_rectangle_62" x="484.651" y="1369.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 484.651 1369.71)" fill="#85929E"/>
   </g>
   <g id="117">
   <rect id="2335_rectangle_63" x="511.079" y="1415.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 511.079 1415.66)" fill="#85929E"/>
   </g>
   <g id="10">
   <rect id="2335_rectangle_64" x="296.517" y="989.269" width="25.0361" height="51.6308" transform="rotate(-30.0029 296.517 989.269)" fill="#85929E"/>
   </g>
   <g id="28">
   <rect id="2335_rectangle_65" x="347.839" y="1079.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 347.839 1079.91)" fill="#85929E"/>
   </g>
   <g id="46">
   <rect id="2335_rectangle_66" x="374.442" y="1126.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 374.442 1126.14)" fill="#85929E"/>
   </g>
   <g id="64">
   <rect id="2335_rectangle_67" x="427.779" y="1218.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 427.779 1218.92)" fill="#85929E"/>
   </g>
   <g id="82">
   <rect id="2335_rectangle_68" x="454.206" y="1264.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 454.206 1264.87)" fill="#85929E"/>
   </g>
   <g id="100">
   <rect id="2335_rectangle_69" x="507.938" y="1356.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 507.938 1356.3)" fill="#85929E"/>
   </g>
   <g id="118">
   <rect id="2335_rectangle_70" x="534.365" y="1402.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 534.365 1402.25)" fill="#85929E"/>
   </g>
   <g id="11">
   <rect id="2335_rectangle_71" x="319.873" y="975.975" width="25.0361" height="51.6308" transform="rotate(-30.0029 319.873 975.975)" fill="#85929E"/>
   </g>
   <g id="29">
   <rect id="2335_rectangle_72" x="371.126" y="1066.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 371.126 1066.49)" fill="#85929E"/>
   </g>
   <g id="47">
   <rect id="2335_rectangle_73" x="397.728" y="1112.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 397.728 1112.73)" fill="#85929E"/>
   </g>
   <g id="65">
   <rect id="2335_rectangle_74" x="451.066" y="1205.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 451.066 1205.51)" fill="#85929E"/>
   </g>
   <g id="83">
   <rect id="2335_rectangle_75" x="477.493" y="1251.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 477.493 1251.46)" fill="#85929E"/>
   </g>
   <g id="101">
   <rect id="2335_rectangle_76" x="531.225" y="1342.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 531.225 1342.88)" fill="#85929E"/>
   </g>
   <g id="119">
   <rect id="2335_rectangle_77" x="557.652" y="1388.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 557.652 1388.83)" fill="#85929E"/>
   </g>
   <g id="12">
   <rect id="2335_rectangle_78" x="343.229" y="962.681" width="25.0361" height="51.6308" transform="rotate(-30.0029 343.229 962.681)" fill="#85929E"/>
   </g>
   <g id="30">
   <rect id="2335_rectangle_79" x="394.413" y="1053.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 394.413 1053.08)" fill="#85929E"/>
   </g>
   <g id="48">
   <rect id="2335_rectangle_80" x="421.015" y="1099.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 421.015 1099.31)" fill="#85929E"/>
   </g>
   <g id="66">
   <rect id="2335_rectangle_81" x="474.353" y="1192.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 474.353 1192.09)" fill="#85929E"/>
   </g>
   <g id="84">
   <rect id="2335_rectangle_82" x="500.78" y="1238.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 500.78 1238.05)" fill="#85929E"/>
   </g>
   <g id="102">
   <rect id="2335_rectangle_83" x="554.512" y="1329.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 554.512 1329.47)" fill="#85929E"/>
   </g>
   <g id="120">
   <rect id="2335_rectangle_84" x="580.939" y="1375.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 580.939 1375.42)" fill="#85929E"/>
   </g>
   <g id="13">
   <rect id="2335_rectangle_85" x="366.585" y="949.388" width="25.0361" height="51.6308" transform="rotate(-30.0029 366.585 949.388)" fill="#85929E"/>
   </g>
   <g id="31">
   <rect id="2335_rectangle_86" x="417.699" y="1039.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 417.699 1039.66)" fill="#85929E"/>
   </g>
   <g id="49">
   <rect id="2335_rectangle_87" x="444.302" y="1085.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 444.302 1085.9)" fill="#85929E"/>
   </g>
   <g id="67">
   <rect id="2335_rectangle_88" x="497.639" y="1178.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 497.639 1178.68)" fill="#85929E"/>
   </g>
   <g id="85">
   <rect id="2335_rectangle_89" x="524.067" y="1224.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 524.067 1224.63)" fill="#85929E"/>
   </g>
   <g id="103">
   <rect id="2335_rectangle_90" x="577.799" y="1316.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 577.799 1316.05)" fill="#85929E"/>
   </g>
   <g id="121">
   <rect id="2335_rectangle_91" x="604.226" y="1362" width="25.0361" height="51.6308" transform="rotate(-30.0029 604.226 1362)" fill="#85929E"/>
   </g>
   <g id="14">
   <rect id="2335_rectangle_92" x="389.941" y="936.094" width="25.0361" height="51.6308" transform="rotate(-30.0029 389.941 936.094)" fill="#85929E"/>
   </g>
   <g id="32">
   <rect id="2335_rectangle_93" x="440.986" y="1026.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 440.986 1026.25)" fill="#85929E"/>
   </g>
   <g id="50">
   <rect id="2335_rectangle_94" x="467.589" y="1072.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 467.589 1072.48)" fill="#85929E"/>
   </g>
   <g id="68">
   <rect id="2335_rectangle_95" x="520.927" y="1165.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 520.927 1165.26)" fill="#85929E"/>
   </g>
   <g id="86">
   <rect id="2335_rectangle_96" x="547.354" y="1211.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 547.354 1211.22)" fill="#85929E"/>
   </g>
   <g id="104">
   <rect id="2335_rectangle_97" x="601.085" y="1302.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 601.085 1302.64)" fill="#85929E"/>
   </g>
   <g id="122">
   <rect id="2335_rectangle_98" x="627.513" y="1348.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 627.513 1348.59)" fill="#85929E"/>
   </g>
   <g id="15">
   <rect id="2335_rectangle_99" x="413.297" y="922.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 413.297 922.8)" fill="#85929E"/>
   </g>
   <g id="33">
   <rect id="2335_rectangle_100" x="464.273" y="1012.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 464.273 1012.84)" fill="#85929E"/>
   </g>
   <g id="51">
   <rect id="2335_rectangle_101" x="490.876" y="1059.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 490.876 1059.07)" fill="#85929E"/>
   </g>
   <g id="69">
   <rect id="2335_rectangle_102" x="544.213" y="1151.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 544.213 1151.85)" fill="#85929E"/>
   </g>
   <g id="87">
   <rect id="2335_rectangle_103" x="570.641" y="1197.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 570.641 1197.8)" fill="#85929E"/>
   </g>
   <g id="105">
   <rect id="2335_rectangle_104" x="624.372" y="1289.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 624.372 1289.22)" fill="#85929E"/>
   </g>
   <g id="123">
   <rect id="2335_rectangle_105" x="650.8" y="1335.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 650.8 1335.18)" fill="#85929E"/>
   </g>
   <g id="16">
   <rect id="2335_rectangle_106" x="436.653" y="909.506" width="25.0361" height="51.6308" transform="rotate(-30.0029 436.653 909.506)" fill="#85929E"/>
   </g>
   <g id="34">
   <rect id="2335_rectangle_107" x="487.56" y="999.421" width="25.0361" height="51.6308" transform="rotate(-30.0029 487.56 999.421)" fill="#85929E"/>
   </g>
   <g id="52">
   <rect id="2335_rectangle_108" x="514.163" y="1045.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 514.163 1045.66)" fill="#85929E"/>
   </g>
   <g id="70">
   <rect id="2335_rectangle_109" x="567.5" y="1138.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 567.5 1138.44)" fill="#85929E"/>
   </g>
   <g id="88">
   <rect id="2335_rectangle_110" x="593.928" y="1184.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 593.928 1184.39)" fill="#85929E"/>
   </g>
   <g id="106">
   <rect id="2335_rectangle_111" x="647.659" y="1275.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 647.659 1275.81)" fill="#85929E"/>
   </g>
   <g id="124">
   <rect id="2335_rectangle_112" x="674.087" y="1321.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 674.087 1321.76)" fill="#85929E"/>
   </g>
   <g id="17">
   <rect id="2335_rectangle_113" x="460.009" y="896.213" width="25.0361" height="51.6308" transform="rotate(-30.0029 460.009 896.213)" fill="#85929E"/>
   </g>
   <g id="35">
   <rect id="2335_rectangle_114" x="510.847" y="986.007" width="25.0361" height="51.6308" transform="rotate(-30.0029 510.847 986.007)" fill="#85929E"/>
   </g>
   <g id="53">
   <rect id="2335_rectangle_115" x="537.45" y="1032.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 537.45 1032.24)" fill="#85929E"/>
   </g>
   <g id="71">
   <rect id="2335_rectangle_116" x="590.787" y="1125.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 590.787 1125.02)" fill="#85929E"/>
   </g>
   <g id="89">
   <rect id="2335_rectangle_117" x="617.214" y="1170.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 617.214 1170.97)" fill="#85929E"/>
   </g>
   <g id="107">
   <rect id="2335_rectangle_118" x="670.946" y="1262.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 670.946 1262.4)" fill="#85929E"/>
   </g>
   <g id="125">
   <rect id="2335_rectangle_119" x="697.374" y="1308.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 697.374 1308.35)" fill="#85929E"/>
   </g>
   <g id="18">
   <rect id="2335_rectangle_120" x="483.365" y="882.919" width="25.0361" height="51.6308" transform="rotate(-30.0029 483.365 882.919)" fill="#85929E"/>
   </g>
   <g id="36">
   <rect id="2335_rectangle_121" x="534.134" y="972.593" width="25.0361" height="51.6308" transform="rotate(-30.0029 534.134 972.593)" fill="#85929E"/>
   </g>
   <g id="54">
   <rect id="2335_rectangle_122" x="560.736" y="1018.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 560.736 1018.83)" fill="#85929E"/>
   </g>
   <g id="72">
   <rect id="2335_rectangle_123" x="614.074" y="1111.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 614.074 1111.61)" fill="#85929E"/>
   </g>
   <g id="90">
   <rect id="2335_rectangle_124" x="640.502" y="1157.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 640.502 1157.56)" fill="#85929E"/>
   </g>
   <g id="108">
   <rect id="2335_rectangle_125" x="694.233" y="1248.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 694.233 1248.98)" fill="#85929E"/>
   </g>
   <g id="126">
   <rect id="2335_rectangle_126" x="720.661" y="1294.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 720.661 1294.93)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$925-1043" d="M1605.23 46.8948L955.027 412.677L1296.58 1049.96L2007.72 628.967L1672.02 151.676C1656.77 137.239 1638.5 107.347 1631.27 94.2049L1605.23 46.8948Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$925-1043">
   <g id="925">
   <rect id="2335_rectangle_127" x="1054.61" y="552.996" width="25.0361" height="51.6308" transform="rotate(-30.0029 1054.61 552.996)" fill="#85929E"/>
   </g>
   <g id="942">
   <rect id="2335_rectangle_128" x="1107.64" y="645.302" width="25.0361" height="51.6308" transform="rotate(-30.0029 1107.64 645.302)" fill="#85929E"/>
   </g>
   <g id="959">
   <rect id="2335_rectangle_129" x="1134.07" y="691.254" width="25.0361" height="51.6308" transform="rotate(-30.0029 1134.07 691.254)" fill="#85929E"/>
   </g>
   <g id="976">
   <rect id="2335_rectangle_130" x="1186.04" y="783.641" width="25.0361" height="51.6308" transform="rotate(-30.0029 1186.04 783.641)" fill="#85929E"/>
   </g>
   <g id="993">
   <rect id="2335_rectangle_131" x="1213.83" y="829.988" width="25.0361" height="51.6308" transform="rotate(-30.0029 1213.83 829.988)" fill="#85929E"/>
   </g>
   <g id="1010">
   <rect id="2335_rectangle_132" x="1266.68" y="921.893" width="25.0361" height="51.6308" transform="rotate(-30.0029 1266.68 921.893)" fill="#85929E"/>
   </g>
   <g id="1027">
   <rect id="2335_rectangle_133" x="1294.47" y="968.239" width="25.0361" height="51.6308" transform="rotate(-30.0029 1294.47 968.239)" fill="#85929E"/>
   </g>
   <g id="926">
   <rect id="2335_rectangle_134" x="1078" y="539.522" width="25.0361" height="51.6308" transform="rotate(-30.0029 1078 539.522)" fill="#85929E"/>
   </g>
   <g id="943">
   <rect id="2335_rectangle_135" x="1131.03" y="631.827" width="25.0361" height="51.6308" transform="rotate(-30.0029 1131.03 631.827)" fill="#85929E"/>
   </g>
   <g id="960">
   <rect id="2335_rectangle_136" x="1157.45" y="677.779" width="25.0361" height="51.6308" transform="rotate(-30.0029 1157.45 677.779)" fill="#85929E"/>
   </g>
   <g id="977">
   <rect id="2335_rectangle_137" x="1209.43" y="770.166" width="25.0361" height="51.6308" transform="rotate(-30.0029 1209.43 770.166)" fill="#85929E"/>
   </g>
   <g id="994">
   <rect id="2335_rectangle_138" x="1237.22" y="816.512" width="25.0361" height="51.6308" transform="rotate(-30.0029 1237.22 816.512)" fill="#85929E"/>
   </g>
   <g id="1011">
   <rect id="2335_rectangle_139" x="1290.07" y="908.417" width="25.0361" height="51.6308" transform="rotate(-30.0029 1290.07 908.417)" fill="#85929E"/>
   </g>
   <g id="1028">
   <rect id="2335_rectangle_140" x="1317.85" y="954.764" width="25.0361" height="51.6308" transform="rotate(-30.0029 1317.85 954.764)" fill="#85929E"/>
   </g>
   <g id="927">
   <rect id="2335_rectangle_141" x="1101.15" y="526.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1101.15 526.18)" fill="#85929E"/>
   </g>
   <g id="944">
   <rect id="2335_rectangle_142" x="1154.18" y="618.486" width="25.0361" height="51.6308" transform="rotate(-30.0029 1154.18 618.486)" fill="#85929E"/>
   </g>
   <g id="961">
   <rect id="2335_rectangle_143" x="1180.61" y="664.438" width="25.0361" height="51.6308" transform="rotate(-30.0029 1180.61 664.438)" fill="#85929E"/>
   </g>
   <g id="978">
   <rect id="2335_rectangle_144" x="1232.59" y="756.825" width="25.0361" height="51.6308" transform="rotate(-30.0029 1232.59 756.825)" fill="#85929E"/>
   </g>
   <g id="995">
   <rect id="2335_rectangle_145" x="1260.37" y="803.171" width="25.0361" height="51.6308" transform="rotate(-30.0029 1260.37 803.171)" fill="#85929E"/>
   </g>
   <g id="1012">
   <rect id="2335_rectangle_146" x="1313.23" y="895.076" width="25.0361" height="51.6308" transform="rotate(-30.0029 1313.23 895.076)" fill="#85929E"/>
   </g>
   <g id="1029">
   <rect id="2335_rectangle_147" x="1341.01" y="941.422" width="25.0361" height="51.6308" transform="rotate(-30.0029 1341.01 941.422)" fill="#85929E"/>
   </g>
   <g id="928">
   <rect id="2335_rectangle_148" x="1123.91" y="513.072" width="25.0361" height="51.6308" transform="rotate(-30.0029 1123.91 513.072)" fill="#85929E"/>
   </g>
   <g id="945">
   <rect id="2335_rectangle_149" x="1176.94" y="605.378" width="25.0361" height="51.6308" transform="rotate(-30.0029 1176.94 605.378)" fill="#85929E"/>
   </g>
   <g id="962">
   <rect id="2335_rectangle_150" x="1203.36" y="651.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1203.36 651.33)" fill="#85929E"/>
   </g>
   <g id="979">
   <rect id="2335_rectangle_151" x="1255.34" y="743.717" width="25.0361" height="51.6308" transform="rotate(-30.0029 1255.34 743.717)" fill="#85929E"/>
   </g>
   <g id="996">
   <rect id="2335_rectangle_152" x="1283.13" y="790.063" width="25.0361" height="51.6308" transform="rotate(-30.0029 1283.13 790.063)" fill="#85929E"/>
   </g>
   <g id="1013">
   <rect id="2335_rectangle_153" x="1335.98" y="881.969" width="25.0361" height="51.6308" transform="rotate(-30.0029 1335.98 881.969)" fill="#85929E"/>
   </g>
   <g id="1030">
   <rect id="2335_rectangle_154" x="1363.77" y="928.315" width="25.0361" height="51.6308" transform="rotate(-30.0029 1363.77 928.315)" fill="#85929E"/>
   </g>
   <g id="929">
   <rect id="2335_rectangle_155" x="1147.29" y="499.598" width="25.0361" height="51.6308" transform="rotate(-30.0029 1147.29 499.598)" fill="#85929E"/>
   </g>
   <g id="946">
   <rect id="2335_rectangle_156" x="1200.32" y="591.904" width="25.0361" height="51.6308" transform="rotate(-30.0029 1200.32 591.904)" fill="#85929E"/>
   </g>
   <g id="963">
   <rect id="2335_rectangle_157" x="1226.75" y="637.856" width="25.0361" height="51.6308" transform="rotate(-30.0029 1226.75 637.856)" fill="#85929E"/>
   </g>
   <g id="980">
   <rect id="2335_rectangle_158" x="1278.73" y="730.242" width="25.0361" height="51.6308" transform="rotate(-30.0029 1278.73 730.242)" fill="#85929E"/>
   </g>
   <g id="997">
   <rect id="2335_rectangle_159" x="1306.51" y="776.589" width="25.0361" height="51.6308" transform="rotate(-30.0029 1306.51 776.589)" fill="#85929E"/>
   </g>
   <g id="1014">
   <rect id="2335_rectangle_160" x="1359.37" y="868.493" width="25.0361" height="51.6308" transform="rotate(-30.0029 1359.37 868.493)" fill="#85929E"/>
   </g>
   <g id="1031">
   <rect id="2335_rectangle_161" x="1387.16" y="914.841" width="25.0361" height="51.6308" transform="rotate(-30.0029 1387.16 914.841)" fill="#85929E"/>
   </g>
   <g id="930">
   <rect id="2335_rectangle_162" x="1170.68" y="486.124" width="25.0361" height="51.6308" transform="rotate(-30.0029 1170.68 486.124)" fill="#85929E"/>
   </g>
   <g id="947">
   <rect id="2335_rectangle_163" x="1223.71" y="578.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1223.71 578.43)" fill="#85929E"/>
   </g>
   <g id="964">
   <rect id="2335_rectangle_164" x="1250.14" y="624.382" width="25.0361" height="51.6308" transform="rotate(-30.0029 1250.14 624.382)" fill="#85929E"/>
   </g>
   <g id="981">
   <rect id="2335_rectangle_165" x="1302.12" y="716.769" width="25.0361" height="51.6308" transform="rotate(-30.0029 1302.12 716.769)" fill="#85929E"/>
   </g>
   <g id="998">
   <rect id="2335_rectangle_166" x="1329.9" y="763.115" width="25.0361" height="51.6308" transform="rotate(-30.0029 1329.9 763.115)" fill="#85929E"/>
   </g>
   <g id="1015">
   <rect id="2335_rectangle_167" x="1382.76" y="855.019" width="25.0361" height="51.6308" transform="rotate(-30.0029 1382.76 855.019)" fill="#85929E"/>
   </g>
   <g id="1032">
   <rect id="2335_rectangle_168" x="1410.54" y="901.367" width="25.0361" height="51.6308" transform="rotate(-30.0029 1410.54 901.367)" fill="#85929E"/>
   </g>
   <g id="931">
   <rect id="2335_rectangle_169" x="1194.07" y="472.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1194.07 472.65)" fill="#85929E"/>
   </g>
   <g id="948">
   <rect id="2335_rectangle_170" x="1247.1" y="564.955" width="25.0361" height="51.6308" transform="rotate(-30.0029 1247.1 564.955)" fill="#85929E"/>
   </g>
   <g id="965">
   <rect id="2335_rectangle_171" x="1273.53" y="610.907" width="25.0361" height="51.6308" transform="rotate(-30.0029 1273.53 610.907)" fill="#85929E"/>
   </g>
   <g id="982">
   <rect id="2335_rectangle_172" x="1325.51" y="703.294" width="25.0361" height="51.6308" transform="rotate(-30.0029 1325.51 703.294)" fill="#85929E"/>
   </g>
   <g id="999">
   <rect id="2335_rectangle_173" x="1353.29" y="749.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1353.29 749.64)" fill="#85929E"/>
   </g>
   <g id="1016">
   <rect id="2335_rectangle_174" x="1406.15" y="841.545" width="25.0361" height="51.6308" transform="rotate(-30.0029 1406.15 841.545)" fill="#85929E"/>
   </g>
   <g id="1033">
   <rect id="2335_rectangle_175" x="1433.93" y="887.892" width="25.0361" height="51.6308" transform="rotate(-30.0029 1433.93 887.892)" fill="#85929E"/>
   </g>
   <g id="932">
   <rect id="2335_rectangle_176" x="1216.59" y="459.675" width="25.0361" height="51.6308" transform="rotate(-30.0029 1216.59 459.675)" fill="#85929E"/>
   </g>
   <g id="949">
   <rect id="2335_rectangle_177" x="1269.62" y="551.981" width="25.0361" height="51.6308" transform="rotate(-30.0029 1269.62 551.981)" fill="#85929E"/>
   </g>
   <g id="966">
   <rect id="2335_rectangle_178" x="1296.05" y="597.933" width="25.0361" height="51.6308" transform="rotate(-30.0029 1296.05 597.933)" fill="#85929E"/>
   </g>
   <g id="983">
   <rect id="2335_rectangle_179" x="1348.03" y="690.319" width="25.0361" height="51.6308" transform="rotate(-30.0029 1348.03 690.319)" fill="#85929E"/>
   </g>
   <g id="1000">
   <rect id="2335_rectangle_180" x="1375.81" y="736.666" width="25.0361" height="51.6308" transform="rotate(-30.0029 1375.81 736.666)" fill="#85929E"/>
   </g>
   <g id="1017">
   <rect id="2335_rectangle_181" x="1428.67" y="828.572" width="25.0361" height="51.6308" transform="rotate(-30.0029 1428.67 828.572)" fill="#85929E"/>
   </g>
   <g id="1034">
   <rect id="2335_rectangle_182" x="1456.45" y="874.917" width="25.0361" height="51.6308" transform="rotate(-30.0029 1456.45 874.917)" fill="#85929E"/>
   </g>
   <g id="933">
   <rect id="2335_rectangle_183" x="1239.98" y="446.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1239.98 446.2)" fill="#85929E"/>
   </g>
   <g id="950">
   <rect id="2335_rectangle_184" x="1293.01" y="538.506" width="25.0361" height="51.6308" transform="rotate(-30.0029 1293.01 538.506)" fill="#85929E"/>
   </g>
   <g id="967">
   <rect id="2335_rectangle_185" x="1319.44" y="584.458" width="25.0361" height="51.6308" transform="rotate(-30.0029 1319.44 584.458)" fill="#85929E"/>
   </g>
   <g id="984">
   <rect id="2335_rectangle_186" x="1371.42" y="676.845" width="25.0361" height="51.6308" transform="rotate(-30.0029 1371.42 676.845)" fill="#85929E"/>
   </g>
   <g id="1001">
   <rect id="2335_rectangle_187" x="1399.2" y="723.191" width="25.0361" height="51.6308" transform="rotate(-30.0029 1399.2 723.191)" fill="#85929E"/>
   </g>
   <g id="1018">
   <rect id="2335_rectangle_188" x="1452.06" y="815.096" width="25.0361" height="51.6308" transform="rotate(-30.0029 1452.06 815.096)" fill="#85929E"/>
   </g>
   <g id="1035">
   <rect id="2335_rectangle_189" x="1479.84" y="861.442" width="25.0361" height="51.6308" transform="rotate(-30.0029 1479.84 861.442)" fill="#85929E"/>
   </g>
   <g id="934">
   <rect id="2335_rectangle_190" x="1262.5" y="433.225" width="25.0361" height="51.6308" transform="rotate(-30.0029 1262.5 433.225)" fill="#85929E"/>
   </g>
   <g id="951">
   <rect id="2335_rectangle_191" x="1315.53" y="525.531" width="25.0361" height="51.6308" transform="rotate(-30.0029 1315.53 525.531)" fill="#85929E"/>
   </g>
   <g id="968">
   <rect id="2335_rectangle_192" x="1341.96" y="571.483" width="25.0361" height="51.6308" transform="rotate(-30.0029 1341.96 571.483)" fill="#85929E"/>
   </g>
   <g id="985">
   <rect id="2335_rectangle_193" x="1393.94" y="663.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1393.94 663.87)" fill="#85929E"/>
   </g>
   <g id="1002">
   <rect id="2335_rectangle_194" x="1421.72" y="710.216" width="25.0361" height="51.6308" transform="rotate(-30.0029 1421.72 710.216)" fill="#85929E"/>
   </g>
   <g id="1019">
   <rect id="2335_rectangle_195" x="1474.58" y="802.121" width="25.0361" height="51.6308" transform="rotate(-30.0029 1474.58 802.121)" fill="#85929E"/>
   </g>
   <g id="1036">
   <rect id="2335_rectangle_196" x="1502.36" y="848.467" width="25.0361" height="51.6308" transform="rotate(-30.0029 1502.36 848.467)" fill="#85929E"/>
   </g>
   <g id="935">
   <rect id="2335_rectangle_197" x="1285.89" y="419.752" width="25.0361" height="51.6308" transform="rotate(-30.0029 1285.89 419.752)" fill="#85929E"/>
   </g>
   <g id="952">
   <rect id="2335_rectangle_198" x="1338.92" y="512.057" width="25.0361" height="51.6308" transform="rotate(-30.0029 1338.92 512.057)" fill="#85929E"/>
   </g>
   <g id="969">
   <rect id="2335_rectangle_199" x="1365.35" y="558.009" width="25.0361" height="51.6308" transform="rotate(-30.0029 1365.35 558.009)" fill="#85929E"/>
   </g>
   <g id="986">
   <rect id="2335_rectangle_200" x="1417.33" y="650.396" width="25.0361" height="51.6308" transform="rotate(-30.0029 1417.33 650.396)" fill="#85929E"/>
   </g>
   <g id="1003">
   <rect id="2335_rectangle_201" x="1445.11" y="696.742" width="25.0361" height="51.6308" transform="rotate(-30.0029 1445.11 696.742)" fill="#85929E"/>
   </g>
   <g id="1020">
   <rect id="2335_rectangle_202" x="1497.96" y="788.647" width="25.0361" height="51.6308" transform="rotate(-30.0029 1497.96 788.647)" fill="#85929E"/>
   </g>
   <g id="1037">
   <rect id="2335_rectangle_203" x="1525.75" y="834.994" width="25.0361" height="51.6308" transform="rotate(-30.0029 1525.75 834.994)" fill="#85929E"/>
   </g>
   <g id="936">
   <rect id="2335_rectangle_204" x="1309.27" y="406.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1309.27 406.28)" fill="#85929E"/>
   </g>
   <g id="953">
   <rect id="2335_rectangle_205" x="1362.3" y="498.585" width="25.0361" height="51.6308" transform="rotate(-30.0029 1362.3 498.585)" fill="#85929E"/>
   </g>
   <g id="970">
   <rect id="2335_rectangle_206" x="1388.73" y="544.537" width="25.0361" height="51.6308" transform="rotate(-30.0029 1388.73 544.537)" fill="#85929E"/>
   </g>
   <g id="987">
   <rect id="2335_rectangle_207" x="1440.71" y="636.924" width="25.0361" height="51.6308" transform="rotate(-30.0029 1440.71 636.924)" fill="#85929E"/>
   </g>
   <g id="1004">
   <rect id="2335_rectangle_208" x="1468.49" y="683.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 1468.49 683.27)" fill="#85929E"/>
   </g>
   <g id="1021">
   <rect id="2335_rectangle_209" x="1521.35" y="775.175" width="25.0361" height="51.6308" transform="rotate(-30.0029 1521.35 775.175)" fill="#85929E"/>
   </g>
   <g id="1038">
   <rect id="2335_rectangle_210" x="1549.13" y="821.522" width="25.0361" height="51.6308" transform="rotate(-30.0029 1549.13 821.522)" fill="#85929E"/>
   </g>
   <g id="937">
   <rect id="2335_rectangle_211" x="1332.67" y="392.802" width="25.0361" height="51.6308" transform="rotate(-30.0029 1332.67 392.802)" fill="#85929E"/>
   </g>
   <g id="954">
   <rect id="2335_rectangle_212" x="1385.7" y="485.107" width="25.0361" height="51.6308" transform="rotate(-30.0029 1385.7 485.107)" fill="#85929E"/>
   </g>
   <g id="971">
   <rect id="2335_rectangle_213" x="1412.13" y="531.059" width="25.0361" height="51.6308" transform="rotate(-30.0029 1412.13 531.059)" fill="#85929E"/>
   </g>
   <g id="988">
   <rect id="2335_rectangle_214" x="1464.1" y="623.446" width="25.0361" height="51.6308" transform="rotate(-30.0029 1464.1 623.446)" fill="#85929E"/>
   </g>
   <g id="1005">
   <rect id="2335_rectangle_215" x="1491.89" y="669.792" width="25.0361" height="51.6308" transform="rotate(-30.0029 1491.89 669.792)" fill="#85929E"/>
   </g>
   <g id="1022">
   <rect id="2335_rectangle_216" x="1544.74" y="761.697" width="25.0361" height="51.6308" transform="rotate(-30.0029 1544.74 761.697)" fill="#85929E"/>
   </g>
   <g id="1039">
   <rect id="2335_rectangle_217" x="1572.53" y="808.044" width="25.0361" height="51.6308" transform="rotate(-30.0029 1572.53 808.044)" fill="#85929E"/>
   </g>
   <g id="938">
   <rect id="2335_rectangle_218" x="1356.06" y="379.323" width="25.0361" height="51.6308" transform="rotate(-30.0029 1356.06 379.323)" fill="#85929E"/>
   </g>
   <g id="955">
   <rect id="2335_rectangle_219" x="1409.09" y="471.629" width="25.0361" height="51.6308" transform="rotate(-30.0029 1409.09 471.629)" fill="#85929E"/>
   </g>
   <g id="972">
   <rect id="2335_rectangle_220" x="1435.52" y="517.581" width="25.0361" height="51.6308" transform="rotate(-30.0029 1435.52 517.581)" fill="#85929E"/>
   </g>
   <g id="989">
   <rect id="2335_rectangle_221" x="1487.5" y="609.968" width="25.0361" height="51.6308" transform="rotate(-30.0029 1487.5 609.968)" fill="#85929E"/>
   </g>
   <g id="1006">
   <rect id="2335_rectangle_222" x="1515.28" y="656.314" width="25.0361" height="51.6308" transform="rotate(-30.0029 1515.28 656.314)" fill="#85929E"/>
   </g>
   <g id="1023">
   <rect id="2335_rectangle_223" x="1568.14" y="748.219" width="25.0361" height="51.6308" transform="rotate(-30.0029 1568.14 748.219)" fill="#85929E"/>
   </g>
   <g id="1040">
   <rect id="2335_rectangle_224" x="1595.92" y="794.566" width="25.0361" height="51.6308" transform="rotate(-30.0029 1595.92 794.566)" fill="#85929E"/>
   </g>
   <g id="939">
   <rect id="2335_rectangle_225" x="1379.46" y="365.846" width="25.0361" height="51.6308" transform="rotate(-30.0029 1379.46 365.846)" fill="#85929E"/>
   </g>
   <g id="956">
   <rect id="2335_rectangle_226" x="1432.49" y="458.151" width="25.0361" height="51.6308" transform="rotate(-30.0029 1432.49 458.151)" fill="#85929E"/>
   </g>
   <g id="973">
   <rect id="2335_rectangle_227" x="1458.92" y="504.103" width="25.0361" height="51.6308" transform="rotate(-30.0029 1458.92 504.103)" fill="#85929E"/>
   </g>
   <g id="990">
   <rect id="2335_rectangle_228" x="1510.89" y="596.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1510.89 596.49)" fill="#85929E"/>
   </g>
   <g id="1007">
   <rect id="2335_rectangle_229" x="1538.68" y="642.836" width="25.0361" height="51.6308" transform="rotate(-30.0029 1538.68 642.836)" fill="#85929E"/>
   </g>
   <g id="1024">
   <rect id="2335_rectangle_230" x="1591.53" y="734.741" width="25.0361" height="51.6308" transform="rotate(-30.0029 1591.53 734.741)" fill="#85929E"/>
   </g>
   <g id="1041">
   <rect id="2335_rectangle_231" x="1619.32" y="781.088" width="25.0361" height="51.6308" transform="rotate(-30.0029 1619.32 781.088)" fill="#85929E"/>
   </g>
   <g id="940">
   <rect id="2335_rectangle_232" x="1402.85" y="352.367" width="25.0361" height="51.6308" transform="rotate(-30.0029 1402.85 352.367)" fill="#85929E"/>
   </g>
   <g id="957">
   <rect id="2335_rectangle_233" x="1455.88" y="444.673" width="25.0361" height="51.6308" transform="rotate(-30.0029 1455.88 444.673)" fill="#85929E"/>
   </g>
   <g id="974">
   <rect id="2335_rectangle_234" x="1482.31" y="490.625" width="25.0361" height="51.6308" transform="rotate(-30.0029 1482.31 490.625)" fill="#85929E"/>
   </g>
   <g id="991">
   <rect id="2335_rectangle_235" x="1534.29" y="583.011" width="25.0361" height="51.6308" transform="rotate(-30.0029 1534.29 583.011)" fill="#85929E"/>
   </g>
   <g id="1008">
   <rect id="2335_rectangle_236" x="1562.07" y="629.358" width="25.0361" height="51.6308" transform="rotate(-30.0029 1562.07 629.358)" fill="#85929E"/>
   </g>
   <g id="1025">
   <rect id="2335_rectangle_237" x="1614.93" y="721.263" width="25.0361" height="51.6308" transform="rotate(-30.0029 1614.93 721.263)" fill="#85929E"/>
   </g>
   <g id="1042">
   <rect id="2335_rectangle_238" x="1642.71" y="767.609" width="25.0361" height="51.6308" transform="rotate(-30.0029 1642.71 767.609)" fill="#85929E"/>
   </g>
   <g id="941">
   <rect id="2335_rectangle_239" x="1426.25" y="338.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1426.25 338.89)" fill="#85929E"/>
   </g>
   <g id="958">
   <rect id="2335_rectangle_240" x="1479.28" y="431.195" width="25.0361" height="51.6308" transform="rotate(-30.0029 1479.28 431.195)" fill="#85929E"/>
   </g>
   <g id="975">
   <rect id="2335_rectangle_241" x="1505.71" y="477.147" width="25.0361" height="51.6308" transform="rotate(-30.0029 1505.71 477.147)" fill="#85929E"/>
   </g>
   <g id="992">
   <rect id="2335_rectangle_242" x="1557.68" y="569.534" width="25.0361" height="51.6308" transform="rotate(-30.0029 1557.68 569.534)" fill="#85929E"/>
   </g>
   <g id="1009">
   <rect id="2335_rectangle_243" x="1585.47" y="615.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 1585.47 615.88)" fill="#85929E"/>
   </g>
   <g id="1026">
   <rect id="2335_rectangle_244" x="1638.32" y="707.785" width="25.0361" height="51.6308" transform="rotate(-30.0029 1638.32 707.785)" fill="#85929E"/>
   </g>
   <g id="1043">
   <rect id="2335_rectangle_245" x="1666.11" y="754.132" width="25.0361" height="51.6308" transform="rotate(-30.0029 1666.11 754.132)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$1044-1218" d="M2011.4 631.508L1301.53 1050.66L1720.03 1755.18L2323.54 1408.25L2513.22 1338.11L2011.4 631.508Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$1044-1218">
   <g id="1218">
   <rect id="2335_rectangle_246" x="2119.48" y="1434.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 2119.48 1434.9)" fill="#85929E"/>
   </g>
   <g id="1217">
   <rect id="2335_rectangle_247" x="2095.82" y="1447.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 2095.82 1447.91)" fill="#85929E"/>
   </g>
   <g id="1216">
   <rect id="2335_rectangle_248" x="2072.65" y="1461.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 2072.65 1461.81)" fill="#85929E"/>
   </g>
   <g id="1215">
   <rect id="2335_rectangle_249" x="2049.25" y="1475.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 2049.25 1475.28)" fill="#85929E"/>
   </g>
   <g id="1214">
   <rect id="2335_rectangle_250" x="2025.86" y="1488.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 2025.86 1488.76)" fill="#85929E"/>
   </g>
   <g id="1213">
   <rect id="2335_rectangle_251" x="2002.46" y="1502.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 2002.46 1502.24)" fill="#85929E"/>
   </g>
   <g id="1212">
   <rect id="2335_rectangle_252" x="1979.07" y="1515.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1979.07 1515.72)" fill="#85929E"/>
   </g>
   <g id="1211">
   <rect id="2335_rectangle_253" x="1955.67" y="1529.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1955.67 1529.2)" fill="#85929E"/>
   </g>
   <g id="1210">
   <rect id="2335_rectangle_254" x="1932.29" y="1542.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1932.29 1542.67)" fill="#85929E"/>
   </g>
   <g id="1209">
   <rect id="2335_rectangle_255" x="1908.9" y="1556.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1908.9 1556.14)" fill="#85929E"/>
   </g>
   <g id="1208">
   <rect id="2335_rectangle_256" x="1886.38" y="1569.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1886.38 1569.12)" fill="#85929E"/>
   </g>
   <g id="1207">
   <rect id="2335_rectangle_257" x="1862.99" y="1582.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 1862.99 1582.59)" fill="#85929E"/>
   </g>
   <g id="1206">
   <rect id="2335_rectangle_258" x="1840.47" y="1595.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1840.47 1595.57)" fill="#85929E"/>
   </g>
   <g id="1205">
   <rect id="2335_rectangle_259" x="1817.08" y="1609.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1817.08 1609.04)" fill="#85929E"/>
   </g>
   <g id="1204">
   <rect id="2335_rectangle_260" x="1793.7" y="1622.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 1793.7 1622.51)" fill="#85929E"/>
   </g>
   <g id="1203">
   <rect id="2335_rectangle_261" x="1770.31" y="1635.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1770.31 1635.99)" fill="#85929E"/>
   </g>
   <g id="1202">
   <rect id="2335_rectangle_262" x="1747.56" y="1649.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 1747.56 1649.1)" fill="#85929E"/>
   </g>
   <g id="1201">
   <rect id="2335_rectangle_263" x="1724.4" y="1662.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 1724.4 1662.44)" fill="#85929E"/>
   </g>
   <g id="1200">
   <rect id="2335_rectangle_264" x="1701.01" y="1675.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1701.01 1675.91)" fill="#85929E"/>
   </g>
   <g id="1199">
   <rect id="2335_rectangle_265" x="2068.91" y="1401.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 2068.91 1401.08)" fill="#85929E"/>
   </g>
   <g id="1198">
   <rect id="2335_rectangle_266" x="2045.74" y="1414.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 2045.74 1414.98)" fill="#85929E"/>
   </g>
   <g id="1197">
   <rect id="2335_rectangle_267" x="2022.34" y="1428.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 2022.34 1428.45)" fill="#85929E"/>
   </g>
   <g id="1196">
   <rect id="2335_rectangle_268" x="1998.94" y="1441.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 1998.94 1441.93)" fill="#85929E"/>
   </g>
   <g id="1195">
   <rect id="2335_rectangle_269" x="1975.55" y="1455.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 1975.55 1455.41)" fill="#85929E"/>
   </g>
   <g id="1194">
   <rect id="2335_rectangle_270" x="1952.15" y="1468.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1952.15 1468.89)" fill="#85929E"/>
   </g>
   <g id="1193">
   <rect id="2335_rectangle_271" x="1928.76" y="1482.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1928.76 1482.37)" fill="#85929E"/>
   </g>
   <g id="1192">
   <rect id="2335_rectangle_272" x="1905.38" y="1495.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1905.38 1495.84)" fill="#85929E"/>
   </g>
   <g id="1191">
   <rect id="2335_rectangle_273" x="1881.99" y="1509.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1881.99 1509.31)" fill="#85929E"/>
   </g>
   <g id="1190">
   <rect id="2335_rectangle_274" x="1859.47" y="1522.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1859.47 1522.29)" fill="#85929E"/>
   </g>
   <g id="1189">
   <rect id="2335_rectangle_275" x="1836.08" y="1535.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1836.08 1535.76)" fill="#85929E"/>
   </g>
   <g id="1188">
   <rect id="2335_rectangle_276" x="1813.56" y="1548.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1813.56 1548.74)" fill="#85929E"/>
   </g>
   <g id="1187">
   <rect id="2335_rectangle_277" x="1790.17" y="1562.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1790.17 1562.21)" fill="#85929E"/>
   </g>
   <g id="1186">
   <rect id="2335_rectangle_278" x="1766.78" y="1575.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1766.78 1575.68)" fill="#85929E"/>
   </g>
   <g id="1185">
   <rect id="2335_rectangle_279" x="1743.39" y="1589.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1743.39 1589.16)" fill="#85929E"/>
   </g>
   <g id="1184">
   <rect id="2335_rectangle_280" x="1720.64" y="1602.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 1720.64 1602.27)" fill="#85929E"/>
   </g>
   <g id="1183">
   <rect id="2335_rectangle_281" x="1697.48" y="1615.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 1697.48 1615.61)" fill="#85929E"/>
   </g>
   <g id="1182">
   <rect id="2335_rectangle_282" x="1674.1" y="1629.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1674.1 1629.08)" fill="#85929E"/>
   </g>
   <g id="1181">
   <rect id="2335_rectangle_283" x="2016.54" y="1310.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 2016.54 1310.06)" fill="#85929E"/>
   </g>
   <g id="1180">
   <rect id="2335_rectangle_284" x="1993.36" y="1323.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1993.36 1323.95)" fill="#85929E"/>
   </g>
   <g id="1179">
   <rect id="2335_rectangle_285" x="1969.97" y="1337.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1969.97 1337.43)" fill="#85929E"/>
   </g>
   <g id="1178">
   <rect id="2335_rectangle_286" x="1946.57" y="1350.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1946.57 1350.91)" fill="#85929E"/>
   </g>
   <g id="1177">
   <rect id="2335_rectangle_287" x="1923.18" y="1364.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1923.18 1364.38)" fill="#85929E"/>
   </g>
   <g id="1176">
   <rect id="2335_rectangle_288" x="1899.78" y="1377.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1899.78 1377.86)" fill="#85929E"/>
   </g>
   <g id="1175">
   <rect id="2335_rectangle_289" x="1876.39" y="1391.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 1876.39 1391.34)" fill="#85929E"/>
   </g>
   <g id="1174">
   <rect id="2335_rectangle_290" x="1853.01" y="1404.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 1853.01 1404.81)" fill="#85929E"/>
   </g>
   <g id="1173">
   <rect id="2335_rectangle_291" x="1829.62" y="1418.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1829.62 1418.28)" fill="#85929E"/>
   </g>
   <g id="1172">
   <rect id="2335_rectangle_292" x="1807.1" y="1431.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1807.1 1431.26)" fill="#85929E"/>
   </g>
   <g id="1171">
   <rect id="2335_rectangle_293" x="1783.71" y="1444.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 1783.71 1444.73)" fill="#85929E"/>
   </g>
   <g id="1170">
   <rect id="2335_rectangle_294" x="1761.19" y="1457.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 1761.19 1457.71)" fill="#85929E"/>
   </g>
   <g id="1169">
   <rect id="2335_rectangle_295" x="1737.8" y="1471.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1737.8 1471.18)" fill="#85929E"/>
   </g>
   <g id="1168">
   <rect id="2335_rectangle_296" x="1714.41" y="1484.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 1714.41 1484.66)" fill="#85929E"/>
   </g>
   <g id="1167">
   <rect id="2335_rectangle_297" x="1691.02" y="1498.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1691.02 1498.13)" fill="#85929E"/>
   </g>
   <g id="1166">
   <rect id="2335_rectangle_298" x="1668.27" y="1511.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 1668.27 1511.24)" fill="#85929E"/>
   </g>
   <g id="1165">
   <rect id="2335_rectangle_299" x="1645.11" y="1524.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1645.11 1524.58)" fill="#85929E"/>
   </g>
   <g id="1164">
   <rect id="2335_rectangle_300" x="1621.73" y="1538.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1621.73 1538.06)" fill="#85929E"/>
   </g>
   <g id="1163">
   <rect id="2335_rectangle_301" x="1977.18" y="1242.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1977.18 1242.69)" fill="#85929E"/>
   </g>
   <g id="1162">
   <rect id="2335_rectangle_302" x="1954.01" y="1256.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1954.01 1256.58)" fill="#85929E"/>
   </g>
   <g id="1161">
   <rect id="2335_rectangle_303" x="1930.62" y="1270.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1930.62 1270.06)" fill="#85929E"/>
   </g>
   <g id="1160">
   <rect id="2335_rectangle_304" x="1907.22" y="1283.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1907.22 1283.53)" fill="#85929E"/>
   </g>
   <g id="1159">
   <rect id="2335_rectangle_305" x="1883.83" y="1297.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1883.83 1297.01)" fill="#85929E"/>
   </g>
   <g id="1158">
   <rect id="2335_rectangle_306" x="1860.43" y="1310.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1860.43 1310.49)" fill="#85929E"/>
   </g>
   <g id="1157">
   <rect id="2335_rectangle_307" x="1837.04" y="1323.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1837.04 1323.97)" fill="#85929E"/>
   </g>
   <g id="1156">
   <rect id="2335_rectangle_308" x="1813.65" y="1337.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 1813.65 1337.44)" fill="#85929E"/>
   </g>
   <g id="1155">
   <rect id="2335_rectangle_309" x="1790.26" y="1350.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1790.26 1350.91)" fill="#85929E"/>
   </g>
   <g id="1154">
   <rect id="2335_rectangle_310" x="1767.74" y="1363.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1767.74 1363.89)" fill="#85929E"/>
   </g>
   <g id="1153">
   <rect id="2335_rectangle_311" x="1744.35" y="1377.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1744.35 1377.36)" fill="#85929E"/>
   </g>
   <g id="1152">
   <rect id="2335_rectangle_312" x="1721.84" y="1390.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 1721.84 1390.34)" fill="#85929E"/>
   </g>
   <g id="1151">
   <rect id="2335_rectangle_313" x="1698.45" y="1403.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 1698.45 1403.81)" fill="#85929E"/>
   </g>
   <g id="1150">
   <rect id="2335_rectangle_314" x="1675.06" y="1417.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1675.06 1417.29)" fill="#85929E"/>
   </g>
   <g id="1149">
   <rect id="2335_rectangle_315" x="1651.67" y="1430.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1651.67 1430.76)" fill="#85929E"/>
   </g>
   <g id="1148">
   <rect id="2335_rectangle_316" x="1628.92" y="1443.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1628.92 1443.87)" fill="#85929E"/>
   </g>
   <g id="1147">
   <rect id="2335_rectangle_317" x="1605.76" y="1457.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1605.76 1457.21)" fill="#85929E"/>
   </g>
   <g id="1146">
   <rect id="2335_rectangle_318" x="1582.37" y="1470.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1582.37 1470.68)" fill="#85929E"/>
   </g>
   <g id="1145">
   <rect id="2335_rectangle_319" x="1902.5" y="1165.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 1902.5 1165.07)" fill="#85929E"/>
   </g>
   <g id="1144">
   <rect id="2335_rectangle_320" x="1879.11" y="1178.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1879.11 1178.55)" fill="#85929E"/>
   </g>
   <g id="1143">
   <rect id="2335_rectangle_321" x="1855.71" y="1192.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 1855.71 1192.03)" fill="#85929E"/>
   </g>
   <g id="1142">
   <rect id="2335_rectangle_322" x="1832.32" y="1205.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 1832.32 1205.51)" fill="#85929E"/>
   </g>
   <g id="1141">
   <rect id="2335_rectangle_323" x="1808.92" y="1218.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1808.92 1218.99)" fill="#85929E"/>
   </g>
   <g id="1140">
   <rect id="2335_rectangle_324" x="1785.53" y="1232.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 1785.53 1232.46)" fill="#85929E"/>
   </g>
   <g id="1139">
   <rect id="2335_rectangle_325" x="1762.14" y="1245.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1762.14 1245.94)" fill="#85929E"/>
   </g>
   <g id="1138">
   <rect id="2335_rectangle_326" x="1738.75" y="1259.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 1738.75 1259.41)" fill="#85929E"/>
   </g>
   <g id="1137">
   <rect id="2335_rectangle_327" x="1716.23" y="1272.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1716.23 1272.38)" fill="#85929E"/>
   </g>
   <g id="1136">
   <rect id="2335_rectangle_328" x="1692.84" y="1285.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1692.84 1285.86)" fill="#85929E"/>
   </g>
   <g id="1135">
   <rect id="2335_rectangle_329" x="1670.33" y="1298.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 1670.33 1298.83)" fill="#85929E"/>
   </g>
   <g id="1134">
   <rect id="2335_rectangle_330" x="1646.94" y="1312.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1646.94 1312.31)" fill="#85929E"/>
   </g>
   <g id="1133">
   <rect id="2335_rectangle_331" x="1623.55" y="1325.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1623.55 1325.78)" fill="#85929E"/>
   </g>
   <g id="1132">
   <rect id="2335_rectangle_332" x="1600.16" y="1339.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1600.16 1339.26)" fill="#85929E"/>
   </g>
   <g id="1131">
   <rect id="2335_rectangle_333" x="1577.41" y="1352.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1577.41 1352.36)" fill="#85929E"/>
   </g>
   <g id="1130">
   <rect id="2335_rectangle_334" x="1554.25" y="1365.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 1554.25 1365.71)" fill="#85929E"/>
   </g>
   <g id="1129">
   <rect id="2335_rectangle_335" x="1530.86" y="1379.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1530.86 1379.18)" fill="#85929E"/>
   </g>
   <g id="1128">
   <rect id="2335_rectangle_336" x="1874.72" y="1118.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 1874.72 1118.73)" fill="#85929E"/>
   </g>
   <g id="1127">
   <rect id="2335_rectangle_337" x="1851.33" y="1132.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1851.33 1132.21)" fill="#85929E"/>
   </g>
   <g id="1126">
   <rect id="2335_rectangle_338" x="1827.93" y="1145.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1827.93 1145.68)" fill="#85929E"/>
   </g>
   <g id="1125">
   <rect id="2335_rectangle_339" x="1804.53" y="1159.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1804.53 1159.16)" fill="#85929E"/>
   </g>
   <g id="1124">
   <rect id="2335_rectangle_340" x="1781.14" y="1172.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1781.14 1172.64)" fill="#85929E"/>
   </g>
   <g id="1123">
   <rect id="2335_rectangle_341" x="1757.74" y="1186.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1757.74 1186.12)" fill="#85929E"/>
   </g>
   <g id="1122">
   <rect id="2335_rectangle_342" x="1734.36" y="1199.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 1734.36 1199.59)" fill="#85929E"/>
   </g>
   <g id="1121">
   <rect id="2335_rectangle_343" x="1710.97" y="1213.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1710.97 1213.06)" fill="#85929E"/>
   </g>
   <g id="1120">
   <rect id="2335_rectangle_344" x="1688.45" y="1226.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1688.45 1226.04)" fill="#85929E"/>
   </g>
   <g id="1119">
   <rect id="2335_rectangle_345" x="1665.06" y="1239.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 1665.06 1239.51)" fill="#85929E"/>
   </g>
   <g id="1118">
   <rect id="2335_rectangle_346" x="1642.54" y="1252.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1642.54 1252.49)" fill="#85929E"/>
   </g>
   <g id="1117">
   <rect id="2335_rectangle_347" x="1619.15" y="1265.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1619.15 1265.96)" fill="#85929E"/>
   </g>
   <g id="1116">
   <rect id="2335_rectangle_348" x="1595.76" y="1279.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 1595.76 1279.44)" fill="#85929E"/>
   </g>
   <g id="1115">
   <rect id="2335_rectangle_349" x="1572.38" y="1292.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1572.38 1292.91)" fill="#85929E"/>
   </g>
   <g id="1114">
   <rect id="2335_rectangle_350" x="1549.63" y="1306.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 1549.63 1306.02)" fill="#85929E"/>
   </g>
   <g id="1113">
   <rect id="2335_rectangle_351" x="1526.47" y="1319.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1526.47 1319.36)" fill="#85929E"/>
   </g>
   <g id="1112">
   <rect id="2335_rectangle_352" x="1503.08" y="1332.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 1503.08 1332.83)" fill="#85929E"/>
   </g>
   <g id="1111">
   <rect id="2335_rectangle_353" x="1824.1" y="1026.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1824.1 1026.74)" fill="#85929E"/>
   </g>
   <g id="1110">
   <rect id="2335_rectangle_354" x="1800.71" y="1040.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1800.71 1040.22)" fill="#85929E"/>
   </g>
   <g id="1109">
   <rect id="2335_rectangle_355" x="1777.31" y="1053.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1777.31 1053.69)" fill="#85929E"/>
   </g>
   <g id="1108">
   <rect id="2335_rectangle_356" x="1753.92" y="1067.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1753.92 1067.17)" fill="#85929E"/>
   </g>
   <g id="1107">
   <rect id="2335_rectangle_357" x="1730.52" y="1080.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1730.52 1080.65)" fill="#85929E"/>
   </g>
   <g id="1106">
   <rect id="2335_rectangle_358" x="1707.13" y="1094.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1707.13 1094.13)" fill="#85929E"/>
   </g>
   <g id="1105">
   <rect id="2335_rectangle_359" x="1683.74" y="1107.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1683.74 1107.6)" fill="#85929E"/>
   </g>
   <g id="1104">
   <rect id="2335_rectangle_360" x="1660.36" y="1121.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 1660.36 1121.07)" fill="#85929E"/>
   </g>
   <g id="1103">
   <rect id="2335_rectangle_361" x="1637.83" y="1134.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1637.83 1134.05)" fill="#85929E"/>
   </g>
   <g id="1102">
   <rect id="2335_rectangle_362" x="1614.45" y="1147.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1614.45 1147.52)" fill="#85929E"/>
   </g>
   <g id="1101">
   <rect id="2335_rectangle_363" x="1591.93" y="1160.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1591.93 1160.5)" fill="#85929E"/>
   </g>
   <g id="1100">
   <rect id="2335_rectangle_364" x="1568.53" y="1173.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1568.53 1173.97)" fill="#85929E"/>
   </g>
   <g id="1099">
   <rect id="2335_rectangle_365" x="1545.15" y="1187.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1545.15 1187.45)" fill="#85929E"/>
   </g>
   <g id="1098">
   <rect id="2335_rectangle_366" x="1521.76" y="1200.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1521.76 1200.92)" fill="#85929E"/>
   </g>
   <g id="1097">
   <rect id="2335_rectangle_367" x="1499.01" y="1214.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 1499.01 1214.03)" fill="#85929E"/>
   </g>
   <g id="1096">
   <rect id="2335_rectangle_368" x="1475.85" y="1227.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1475.85 1227.37)" fill="#85929E"/>
   </g>
   <g id="1095">
   <rect id="2335_rectangle_369" x="1452.46" y="1240.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1452.46 1240.84)" fill="#85929E"/>
   </g>
   <g id="1094">
   <rect id="2335_rectangle_370" x="1796.32" y="980.391" width="25.0361" height="51.6308" transform="rotate(-30.0029 1796.32 980.391)" fill="#85929E"/>
   </g>
   <g id="1093">
   <rect id="2335_rectangle_371" x="1772.92" y="993.869" width="25.0361" height="51.6308" transform="rotate(-30.0029 1772.92 993.869)" fill="#85929E"/>
   </g>
   <g id="1092">
   <rect id="2335_rectangle_372" x="1749.53" y="1007.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1749.53 1007.35)" fill="#85929E"/>
   </g>
   <g id="1091">
   <rect id="2335_rectangle_373" x="1726.13" y="1020.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1726.13 1020.82)" fill="#85929E"/>
   </g>
   <g id="1090">
   <rect id="2335_rectangle_374" x="1702.74" y="1034.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1702.74 1034.3)" fill="#85929E"/>
   </g>
   <g id="1089">
   <rect id="2335_rectangle_375" x="1679.34" y="1047.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1679.34 1047.78)" fill="#85929E"/>
   </g>
   <g id="1088">
   <rect id="2335_rectangle_376" x="1655.96" y="1061.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1655.96 1061.25)" fill="#85929E"/>
   </g>
   <g id="1087">
   <rect id="2335_rectangle_377" x="1632.57" y="1074.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 1632.57 1074.73)" fill="#85929E"/>
   </g>
   <g id="1086">
   <rect id="2335_rectangle_378" x="1610.05" y="1087.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1610.05 1087.7)" fill="#85929E"/>
   </g>
   <g id="1085">
   <rect id="2335_rectangle_379" x="1586.66" y="1101.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1586.66 1101.18)" fill="#85929E"/>
   </g>
   <g id="1084">
   <rect id="2335_rectangle_380" x="1564.14" y="1114.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1564.14 1114.15)" fill="#85929E"/>
   </g>
   <g id="1083">
   <rect id="2335_rectangle_381" x="1540.75" y="1127.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 1540.75 1127.62)" fill="#85929E"/>
   </g>
   <g id="1082">
   <rect id="2335_rectangle_382" x="1517.36" y="1141.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 1517.36 1141.1)" fill="#85929E"/>
   </g>
   <g id="1081">
   <rect id="2335_rectangle_383" x="1493.97" y="1154.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1493.97 1154.57)" fill="#85929E"/>
   </g>
   <g id="1080">
   <rect id="2335_rectangle_384" x="1471.22" y="1167.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1471.22 1167.68)" fill="#85929E"/>
   </g>
   <g id="1079">
   <rect id="2335_rectangle_385" x="1448.06" y="1181.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 1448.06 1181.02)" fill="#85929E"/>
   </g>
   <g id="1078">
   <rect id="2335_rectangle_386" x="1424.67" y="1194.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1424.67 1194.5)" fill="#85929E"/>
   </g>
   <g id="1077">
   <rect id="2335_rectangle_387" x="1742.98" y="887.605" width="25.0361" height="51.6308" transform="rotate(-30.0029 1742.98 887.605)" fill="#85929E"/>
   </g>
   <g id="1076">
   <rect id="2335_rectangle_388" x="1719.59" y="901.082" width="25.0361" height="51.6308" transform="rotate(-30.0029 1719.59 901.082)" fill="#85929E"/>
   </g>
   <g id="1075">
   <rect id="2335_rectangle_389" x="1696.19" y="914.561" width="25.0361" height="51.6308" transform="rotate(-30.0029 1696.19 914.561)" fill="#85929E"/>
   </g>
   <g id="1074">
   <rect id="2335_rectangle_390" x="1672.8" y="928.039" width="25.0361" height="51.6308" transform="rotate(-30.0029 1672.8 928.039)" fill="#85929E"/>
   </g>
   <g id="1073">
   <rect id="2335_rectangle_391" x="1649.4" y="941.517" width="25.0361" height="51.6308" transform="rotate(-30.0029 1649.4 941.517)" fill="#85929E"/>
   </g>
   <g id="1072">
   <rect id="2335_rectangle_392" x="1626.01" y="954.995" width="25.0361" height="51.6308" transform="rotate(-30.0029 1626.01 954.995)" fill="#85929E"/>
   </g>
   <g id="1071">
   <rect id="2335_rectangle_393" x="1602.63" y="968.467" width="25.0361" height="51.6308" transform="rotate(-30.0029 1602.63 968.467)" fill="#85929E"/>
   </g>
   <g id="1070">
   <rect id="2335_rectangle_394" x="1579.24" y="981.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1579.24 981.94)" fill="#85929E"/>
   </g>
   <g id="1069">
   <rect id="2335_rectangle_395" x="1556.72" y="994.916" width="25.0361" height="51.6308" transform="rotate(-30.0029 1556.72 994.916)" fill="#85929E"/>
   </g>
   <g id="1068">
   <rect id="2335_rectangle_396" x="1533.33" y="1008.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 1533.33 1008.39)" fill="#85929E"/>
   </g>
   <g id="1067">
   <rect id="2335_rectangle_397" x="1510.81" y="1021.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1510.81 1021.36)" fill="#85929E"/>
   </g>
   <g id="1066">
   <rect id="2335_rectangle_398" x="1487.42" y="1034.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1487.42 1034.84)" fill="#85929E"/>
   </g>
   <g id="1065">
   <rect id="2335_rectangle_399" x="1464.03" y="1048.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1464.03 1048.31)" fill="#85929E"/>
   </g>
   <g id="1064">
   <rect id="2335_rectangle_400" x="1440.64" y="1061.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1440.64 1061.79)" fill="#85929E"/>
   </g>
   <g id="1063">
   <rect id="2335_rectangle_401" x="1417.89" y="1074.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 1417.89 1074.9)" fill="#85929E"/>
   </g>
   <g id="1062">
   <rect id="2335_rectangle_402" x="1394.73" y="1088.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 1394.73 1088.24)" fill="#85929E"/>
   </g>
   <g id="1061">
   <rect id="2335_rectangle_403" x="1371.34" y="1101.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 1371.34 1101.71)" fill="#85929E"/>
   </g>
   <g id="1060">
   <rect id="2335_rectangle_404" x="1715.2" y="841.258" width="25.0361" height="51.6308" transform="rotate(-30.0029 1715.2 841.258)" fill="#85929E"/>
   </g>
   <g id="1059">
   <rect id="2335_rectangle_405" x="1691.8" y="854.736" width="25.0361" height="51.6308" transform="rotate(-30.0029 1691.8 854.736)" fill="#85929E"/>
   </g>
   <g id="1058">
   <rect id="2335_rectangle_406" x="1668.41" y="868.214" width="25.0361" height="51.6308" transform="rotate(-30.0029 1668.41 868.214)" fill="#85929E"/>
   </g>
   <g id="1057">
   <rect id="2335_rectangle_407" x="1645.01" y="881.692" width="25.0361" height="51.6308" transform="rotate(-30.0029 1645.01 881.692)" fill="#85929E"/>
   </g>
   <g id="1056">
   <rect id="2335_rectangle_408" x="1621.62" y="895.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1621.62 895.17)" fill="#85929E"/>
   </g>
   <g id="1055">
   <rect id="2335_rectangle_409" x="1598.23" y="908.648" width="25.0361" height="51.6308" transform="rotate(-30.0029 1598.23 908.648)" fill="#85929E"/>
   </g>
   <g id="1054">
   <rect id="2335_rectangle_410" x="1574.84" y="922.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1574.84 922.12)" fill="#85929E"/>
   </g>
   <g id="1053">
   <rect id="2335_rectangle_411" x="1551.45" y="935.594" width="25.0361" height="51.6308" transform="rotate(-30.0029 1551.45 935.594)" fill="#85929E"/>
   </g>
   <g id="1052">
   <rect id="2335_rectangle_412" x="1528.93" y="948.569" width="25.0361" height="51.6308" transform="rotate(-30.0029 1528.93 948.569)" fill="#85929E"/>
   </g>
   <g id="1051">
   <rect id="2335_rectangle_413" x="1505.54" y="962.044" width="25.0361" height="51.6308" transform="rotate(-30.0029 1505.54 962.044)" fill="#85929E"/>
   </g>
   <g id="1050">
   <rect id="2335_rectangle_414" x="1483.02" y="975.018" width="25.0361" height="51.6308" transform="rotate(-30.0029 1483.02 975.018)" fill="#85929E"/>
   </g>
   <g id="1049">
   <rect id="2335_rectangle_415" x="1459.63" y="988.493" width="25.0361" height="51.6308" transform="rotate(-30.0029 1459.63 988.493)" fill="#85929E"/>
   </g>
   <g id="1048">
   <rect id="2335_rectangle_416" x="1436.24" y="1001.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1436.24 1001.97)" fill="#85929E"/>
   </g>
   <g id="1047">
   <rect id="2335_rectangle_417" x="1412.86" y="1015.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 1412.86 1015.44)" fill="#85929E"/>
   </g>
   <g id="1046">
   <rect id="2335_rectangle_418" x="1390.1" y="1028.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1390.1 1028.55)" fill="#85929E"/>
   </g>
   <g id="1045">
   <rect id="2335_rectangle_419" x="1366.95" y="1041.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1366.95 1041.89)" fill="#85929E"/>
   </g>
   <g id="1044">
   <rect id="2335_rectangle_420" x="1343.56" y="1055.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1343.56 1055.37)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$1211-1447" d="M2326.34 1411.27L1724.19 1758.6L2186.65 2567.91L3043.93 2084.76L2842.08 1800.9L2513.79 1341.22L2326.34 1411.27Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$1211-1447">
   <g id="1447">
   <rect id="2335_rectangle_421" x="2665.85" y="2166.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 2665.85 2166.07)" fill="#85929E"/>
   </g>
   <g id="1446">
   <rect id="2335_rectangle_422" x="2642.67" y="2179.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 2642.67 2179.97)" fill="#85929E"/>
   </g>
   <g id="1445">
   <rect id="2335_rectangle_423" x="2619.5" y="2193.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 2619.5 2193.86)" fill="#85929E"/>
   </g>
   <g id="1444">
   <rect id="2335_rectangle_424" x="2595.72" y="2206.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 2595.72 2206.95)" fill="#85929E"/>
   </g>
   <g id="1443">
   <rect id="2335_rectangle_425" x="2573.42" y="2220.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 2573.42 2220.36)" fill="#85929E"/>
   </g>
   <g id="1442">
   <rect id="2335_rectangle_426" x="2549.76" y="2233.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 2549.76 2233.37)" fill="#85929E"/>
   </g>
   <g id="1441">
   <rect id="2335_rectangle_427" x="2526.59" y="2247.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 2526.59 2247.27)" fill="#85929E"/>
   </g>
   <g id="1440">
   <rect id="2335_rectangle_428" x="2503.19" y="2260.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 2503.19 2260.75)" fill="#85929E"/>
   </g>
   <g id="1439">
   <rect id="2335_rectangle_429" x="2479.79" y="2274.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 2479.79 2274.23)" fill="#85929E"/>
   </g>
   <g id="1438">
   <rect id="2335_rectangle_430" x="2456.4" y="2287.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 2456.4 2287.7)" fill="#85929E"/>
   </g>
   <g id="1437">
   <rect id="2335_rectangle_431" x="2433" y="2301.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 2433 2301.18)" fill="#85929E"/>
   </g>
   <g id="1436">
   <rect id="2335_rectangle_432" x="2409.61" y="2314.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 2409.61 2314.66)" fill="#85929E"/>
   </g>
   <g id="1435">
   <rect id="2335_rectangle_433" x="2386.22" y="2328.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 2386.22 2328.14)" fill="#85929E"/>
   </g>
   <g id="1434">
   <rect id="2335_rectangle_434" x="2362.82" y="2341.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 2362.82 2341.61)" fill="#85929E"/>
   </g>
   <g id="1433">
   <rect id="2335_rectangle_435" x="2340.3" y="2354.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 2340.3 2354.59)" fill="#85929E"/>
   </g>
   <g id="1432">
   <rect id="2335_rectangle_436" x="2316.91" y="2368.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 2316.91 2368.06)" fill="#85929E"/>
   </g>
   <g id="1431">
   <rect id="2335_rectangle_437" x="2294.39" y="2381.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 2294.39 2381.04)" fill="#85929E"/>
   </g>
   <g id="1430">
   <rect id="2335_rectangle_438" x="2271" y="2394.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 2271 2394.51)" fill="#85929E"/>
   </g>
   <g id="1429">
   <rect id="2335_rectangle_439" x="2247.61" y="2407.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 2247.61 2407.99)" fill="#85929E"/>
   </g>
   <g id="1428">
   <rect id="2335_rectangle_440" x="2224.22" y="2421.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 2224.22 2421.46)" fill="#85929E"/>
   </g>
   <g id="1427">
   <rect id="2335_rectangle_441" x="2201.47" y="2434.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 2201.47 2434.57)" fill="#85929E"/>
   </g>
   <g id="1426">
   <rect id="2335_rectangle_442" x="2178.31" y="2447.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 2178.31 2447.92)" fill="#85929E"/>
   </g>
   <g id="1425">
   <rect id="2335_rectangle_443" x="2154.93" y="2461.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 2154.93 2461.39)" fill="#85929E"/>
   </g>
   <g id="1424">
   <rect id="2335_rectangle_444" x="2611.24" y="2075.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 2611.24 2075.13)" fill="#85929E"/>
   </g>
   <g id="1423">
   <rect id="2335_rectangle_445" x="2588.07" y="2089.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 2588.07 2089.03)" fill="#85929E"/>
   </g>
   <g id="1422">
   <rect id="2335_rectangle_446" x="2564.89" y="2102.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 2564.89 2102.92)" fill="#85929E"/>
   </g>
   <g id="1421">
   <rect id="2335_rectangle_447" x="2541.11" y="2116.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 2541.11 2116.01)" fill="#85929E"/>
   </g>
   <g id="1420">
   <rect id="2335_rectangle_448" x="2518.81" y="2129.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 2518.81 2129.41)" fill="#85929E"/>
   </g>
   <g id="1419">
   <rect id="2335_rectangle_449" x="2495.15" y="2142.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 2495.15 2142.43)" fill="#85929E"/>
   </g>
   <g id="1418">
   <rect id="2335_rectangle_450" x="2471.98" y="2156.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 2471.98 2156.33)" fill="#85929E"/>
   </g>
   <g id="1417">
   <rect id="2335_rectangle_451" x="2448.58" y="2169.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 2448.58 2169.81)" fill="#85929E"/>
   </g>
   <g id="1416">
   <rect id="2335_rectangle_452" x="2425.19" y="2183.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 2425.19 2183.29)" fill="#85929E"/>
   </g>
   <g id="1415">
   <rect id="2335_rectangle_453" x="2401.79" y="2196.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 2401.79 2196.76)" fill="#85929E"/>
   </g>
   <g id="1414">
   <rect id="2335_rectangle_454" x="2378.4" y="2210.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 2378.4 2210.24)" fill="#85929E"/>
   </g>
   <g id="1413">
   <rect id="2335_rectangle_455" x="2355" y="2223.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 2355 2223.72)" fill="#85929E"/>
   </g>
   <g id="1412">
   <rect id="2335_rectangle_456" x="2331.61" y="2237.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 2331.61 2237.2)" fill="#85929E"/>
   </g>
   <g id="1411">
   <rect id="2335_rectangle_457" x="2308.22" y="2250.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 2308.22 2250.67)" fill="#85929E"/>
   </g>
   <g id="1410">
   <rect id="2335_rectangle_458" x="2285.7" y="2263.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 2285.7 2263.65)" fill="#85929E"/>
   </g>
   <g id="1409">
   <rect id="2335_rectangle_459" x="2262.3" y="2277.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 2262.3 2277.12)" fill="#85929E"/>
   </g>
   <g id="1408">
   <rect id="2335_rectangle_460" x="2239.78" y="2290.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 2239.78 2290.1)" fill="#85929E"/>
   </g>
   <g id="1407">
   <rect id="2335_rectangle_461" x="2216.39" y="2303.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 2216.39 2303.57)" fill="#85929E"/>
   </g>
   <g id="1406">
   <rect id="2335_rectangle_462" x="2193" y="2317.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 2193 2317.05)" fill="#85929E"/>
   </g>
   <g id="1405">
   <rect id="2335_rectangle_463" x="2169.62" y="2330.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 2169.62 2330.52)" fill="#85929E"/>
   </g>
   <g id="1404">
   <rect id="2335_rectangle_464" x="2146.87" y="2343.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 2146.87 2343.63)" fill="#85929E"/>
   </g>
   <g id="1403">
   <rect id="2335_rectangle_465" x="2123.7" y="2356.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 2123.7 2356.98)" fill="#85929E"/>
   </g>
   <g id="1402">
   <rect id="2335_rectangle_466" x="2100.32" y="2370.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 2100.32 2370.45)" fill="#85929E"/>
   </g>
   <g id="1401">
   <rect id="2335_rectangle_467" x="2561.16" y="2042.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 2561.16 2042.2)" fill="#85929E"/>
   </g>
   <g id="1400">
   <rect id="2335_rectangle_468" x="2537.98" y="2056.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 2537.98 2056.09)" fill="#85929E"/>
   </g>
   <g id="1399">
   <rect id="2335_rectangle_469" x="2514.2" y="2069.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 2514.2 2069.18)" fill="#85929E"/>
   </g>
   <g id="1398">
   <rect id="2335_rectangle_470" x="2491.9" y="2082.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 2491.9 2082.59)" fill="#85929E"/>
   </g>
   <g id="1397">
   <rect id="2335_rectangle_471" x="2468.24" y="2095.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 2468.24 2095.6)" fill="#85929E"/>
   </g>
   <g id="1396">
   <rect id="2335_rectangle_472" x="2445.07" y="2109.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 2445.07 2109.5)" fill="#85929E"/>
   </g>
   <g id="1395">
   <rect id="2335_rectangle_473" x="2421.67" y="2122.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 2421.67 2122.98)" fill="#85929E"/>
   </g>
   <g id="1394">
   <rect id="2335_rectangle_474" x="2398.28" y="2136.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 2398.28 2136.46)" fill="#85929E"/>
   </g>
   <g id="1393">
   <rect id="2335_rectangle_475" x="2374.88" y="2149.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 2374.88 2149.94)" fill="#85929E"/>
   </g>
   <g id="1392">
   <rect id="2335_rectangle_476" x="2351.49" y="2163.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 2351.49 2163.42)" fill="#85929E"/>
   </g>
   <g id="1391">
   <rect id="2335_rectangle_477" x="2328.09" y="2176.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 2328.09 2176.9)" fill="#85929E"/>
   </g>
   <g id="1390">
   <rect id="2335_rectangle_478" x="2304.7" y="2190.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 2304.7 2190.37)" fill="#85929E"/>
   </g>
   <g id="1389">
   <rect id="2335_rectangle_479" x="2281.31" y="2203.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 2281.31 2203.85)" fill="#85929E"/>
   </g>
   <g id="1388">
   <rect id="2335_rectangle_480" x="2258.79" y="2216.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 2258.79 2216.82)" fill="#85929E"/>
   </g>
   <g id="1387">
   <rect id="2335_rectangle_481" x="2235.39" y="2230.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 2235.39 2230.3)" fill="#85929E"/>
   </g>
   <g id="1386">
   <rect id="2335_rectangle_482" x="2212.87" y="2243.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 2212.87 2243.27)" fill="#85929E"/>
   </g>
   <g id="1385">
   <rect id="2335_rectangle_483" x="2189.48" y="2256.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 2189.48 2256.75)" fill="#85929E"/>
   </g>
   <g id="1384">
   <rect id="2335_rectangle_484" x="2166.1" y="2270.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 2166.1 2270.22)" fill="#85929E"/>
   </g>
   <g id="1383">
   <rect id="2335_rectangle_485" x="2142.71" y="2283.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 2142.71 2283.7)" fill="#85929E"/>
   </g>
   <g id="1382">
   <rect id="2335_rectangle_486" x="2119.96" y="2296.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 2119.96 2296.81)" fill="#85929E"/>
   </g>
   <g id="1381">
   <rect id="2335_rectangle_487" x="2096.8" y="2310.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 2096.8 2310.15)" fill="#85929E"/>
   </g>
   <g id="1380">
   <rect id="2335_rectangle_488" x="2073.41" y="2323.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 2073.41 2323.63)" fill="#85929E"/>
   </g>
   <g id="1379">
   <rect id="2335_rectangle_489" x="2509.57" y="1948.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 2509.57 1948.45)" fill="#85929E"/>
   </g>
   <g id="1378">
   <rect id="2335_rectangle_490" x="2486.4" y="1962.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 2486.4 1962.35)" fill="#85929E"/>
   </g>
   <g id="1377">
   <rect id="2335_rectangle_491" x="2462.62" y="1975.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 2462.62 1975.43)" fill="#85929E"/>
   </g>
   <g id="1376">
   <rect id="2335_rectangle_492" x="2440.32" y="1988.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 2440.32 1988.84)" fill="#85929E"/>
   </g>
   <g id="1375">
   <rect id="2335_rectangle_493" x="2416.66" y="2001.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 2416.66 2001.86)" fill="#85929E"/>
   </g>
   <g id="1374">
   <rect id="2335_rectangle_494" x="2393.48" y="2015.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 2393.48 2015.75)" fill="#85929E"/>
   </g>
   <g id="1373">
   <rect id="2335_rectangle_495" x="2370.09" y="2029.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 2370.09 2029.23)" fill="#85929E"/>
   </g>
   <g id="1372">
   <rect id="2335_rectangle_496" x="2346.69" y="2042.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 2346.69 2042.71)" fill="#85929E"/>
   </g>
   <g id="1371">
   <rect id="2335_rectangle_497" x="2323.3" y="2056.19" width="25.0361" height="51.6308" transform="rotate(-30.0029 2323.3 2056.19)" fill="#85929E"/>
   </g>
   <g id="1370">
   <rect id="2335_rectangle_498" x="2299.9" y="2069.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 2299.9 2069.67)" fill="#85929E"/>
   </g>
   <g id="1369">
   <rect id="2335_rectangle_499" x="2276.51" y="2083.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 2276.51 2083.15)" fill="#85929E"/>
   </g>
   <g id="1368">
   <rect id="2335_rectangle_500" x="2253.12" y="2096.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 2253.12 2096.63)" fill="#85929E"/>
   </g>
   <g id="1367">
   <rect id="2335_rectangle_501" x="2229.72" y="2110.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 2229.72 2110.1)" fill="#85929E"/>
   </g>
   <g id="1366">
   <rect id="2335_rectangle_502" x="2207.2" y="2123.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 2207.2 2123.08)" fill="#85929E"/>
   </g>
   <g id="1365">
   <rect id="2335_rectangle_503" x="2183.81" y="2136.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 2183.81 2136.55)" fill="#85929E"/>
   </g>
   <g id="1364">
   <rect id="2335_rectangle_504" x="2161.29" y="2149.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 2161.29 2149.53)" fill="#85929E"/>
   </g>
   <g id="1363">
   <rect id="2335_rectangle_505" x="2137.9" y="2163" width="25.0361" height="51.6308" transform="rotate(-30.0029 2137.9 2163)" fill="#85929E"/>
   </g>
   <g id="1362">
   <rect id="2335_rectangle_506" x="2114.51" y="2176.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 2114.51 2176.48)" fill="#85929E"/>
   </g>
   <g id="1361">
   <rect id="2335_rectangle_507" x="2091.12" y="2189.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 2091.12 2189.95)" fill="#85929E"/>
   </g>
   <g id="1360">
   <rect id="2335_rectangle_508" x="2068.37" y="2203.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 2068.37 2203.06)" fill="#85929E"/>
   </g>
   <g id="1359">
   <rect id="2335_rectangle_509" x="2045.21" y="2216.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 2045.21 2216.4)" fill="#85929E"/>
   </g>
   <g id="1358">
   <rect id="2335_rectangle_510" x="2021.82" y="2229.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 2021.82 2229.88)" fill="#85929E"/>
   </g>
   <g id="1357">
   <rect id="2335_rectangle_511" x="2459.97" y="1916.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 2459.97 1916.39)" fill="#85929E"/>
   </g>
   <g id="1356">
   <rect id="2335_rectangle_512" x="2436.19" y="1929.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 2436.19 1929.48)" fill="#85929E"/>
   </g>
   <g id="1355">
   <rect id="2335_rectangle_513" x="2413.89" y="1942.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 2413.89 1942.89)" fill="#85929E"/>
   </g>
   <g id="1354">
   <rect id="2335_rectangle_514" x="2390.23" y="1955.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 2390.23 1955.91)" fill="#85929E"/>
   </g>
   <g id="1353">
   <rect id="2335_rectangle_515" x="2367.06" y="1969.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 2367.06 1969.8)" fill="#85929E"/>
   </g>
   <g id="1352">
   <rect id="2335_rectangle_516" x="2343.66" y="1983.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 2343.66 1983.28)" fill="#85929E"/>
   </g>
   <g id="1351">
   <rect id="2335_rectangle_517" x="2320.26" y="1996.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 2320.26 1996.76)" fill="#85929E"/>
   </g>
   <g id="1350">
   <rect id="2335_rectangle_518" x="2296.87" y="2010.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 2296.87 2010.24)" fill="#85929E"/>
   </g>
   <g id="1349">
   <rect id="2335_rectangle_519" x="2273.47" y="2023.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 2273.47 2023.72)" fill="#85929E"/>
   </g>
   <g id="1348">
   <rect id="2335_rectangle_520" x="2250.08" y="2037.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 2250.08 2037.2)" fill="#85929E"/>
   </g>
   <g id="1347">
   <rect id="2335_rectangle_521" x="2226.69" y="2050.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 2226.69 2050.67)" fill="#85929E"/>
   </g>
   <g id="1346">
   <rect id="2335_rectangle_522" x="2203.3" y="2064.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 2203.3 2064.15)" fill="#85929E"/>
   </g>
   <g id="1345">
   <rect id="2335_rectangle_523" x="2180.77" y="2077.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 2180.77 2077.12)" fill="#85929E"/>
   </g>
   <g id="1344">
   <rect id="2335_rectangle_524" x="2157.38" y="2090.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 2157.38 2090.6)" fill="#85929E"/>
   </g>
   <g id="1343">
   <rect id="2335_rectangle_525" x="2134.86" y="2103.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 2134.86 2103.57)" fill="#85929E"/>
   </g>
   <g id="1342">
   <rect id="2335_rectangle_526" x="2111.47" y="2117.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 2111.47 2117.05)" fill="#85929E"/>
   </g>
   <g id="1341">
   <rect id="2335_rectangle_527" x="2088.08" y="2130.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 2088.08 2130.52)" fill="#85929E"/>
   </g>
   <g id="1340">
   <rect id="2335_rectangle_528" x="2064.69" y="2144" width="25.0361" height="51.6308" transform="rotate(-30.0029 2064.69 2144)" fill="#85929E"/>
   </g>
   <g id="1339">
   <rect id="2335_rectangle_529" x="2041.94" y="2157.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 2041.94 2157.11)" fill="#85929E"/>
   </g>
   <g id="1338">
   <rect id="2335_rectangle_530" x="2018.78" y="2170.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 2018.78 2170.45)" fill="#85929E"/>
   </g>
   <g id="1337">
   <rect id="2335_rectangle_531" x="1995.4" y="2183.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 1995.4 2183.93)" fill="#85929E"/>
   </g>
   <g id="1336">
   <rect id="2335_rectangle_532" x="2405.36" y="1825.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 2405.36 1825.45)" fill="#85929E"/>
   </g>
   <g id="1335">
   <rect id="2335_rectangle_533" x="2381.58" y="1838.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 2381.58 1838.54)" fill="#85929E"/>
   </g>
   <g id="1334">
   <rect id="2335_rectangle_534" x="2359.28" y="1851.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 2359.28 1851.95)" fill="#85929E"/>
   </g>
   <g id="1333">
   <rect id="2335_rectangle_535" x="2335.62" y="1864.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 2335.62 1864.97)" fill="#85929E"/>
   </g>
   <g id="1332">
   <rect id="2335_rectangle_536" x="2312.45" y="1878.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 2312.45 1878.86)" fill="#85929E"/>
   </g>
   <g id="1331">
   <rect id="2335_rectangle_537" x="2289.05" y="1892.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 2289.05 1892.34)" fill="#85929E"/>
   </g>
   <g id="1330">
   <rect id="2335_rectangle_538" x="2265.66" y="1905.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 2265.66 1905.82)" fill="#85929E"/>
   </g>
   <g id="1329">
   <rect id="2335_rectangle_539" x="2242.26" y="1919.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 2242.26 1919.3)" fill="#85929E"/>
   </g>
   <g id="1328">
   <rect id="2335_rectangle_540" x="2218.87" y="1932.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 2218.87 1932.78)" fill="#85929E"/>
   </g>
   <g id="1327">
   <rect id="2335_rectangle_541" x="2195.47" y="1946.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 2195.47 1946.26)" fill="#85929E"/>
   </g>
   <g id="1326">
   <rect id="2335_rectangle_542" x="2172.08" y="1959.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 2172.08 1959.73)" fill="#85929E"/>
   </g>
   <g id="1325">
   <rect id="2335_rectangle_543" x="2148.69" y="1973.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 2148.69 1973.21)" fill="#85929E"/>
   </g>
   <g id="1324">
   <rect id="2335_rectangle_544" x="2126.17" y="1986.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 2126.17 1986.18)" fill="#85929E"/>
   </g>
   <g id="1323">
   <rect id="2335_rectangle_545" x="2102.77" y="1999.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 2102.77 1999.66)" fill="#85929E"/>
   </g>
   <g id="1322">
   <rect id="2335_rectangle_546" x="2080.26" y="2012.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 2080.26 2012.63)" fill="#85929E"/>
   </g>
   <g id="1321">
   <rect id="2335_rectangle_547" x="2056.86" y="2026.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 2056.86 2026.11)" fill="#85929E"/>
   </g>
   <g id="1320">
   <rect id="2335_rectangle_548" x="2033.48" y="2039.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 2033.48 2039.58)" fill="#85929E"/>
   </g>
   <g id="1319">
   <rect id="2335_rectangle_549" x="2010.09" y="2053.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 2010.09 2053.06)" fill="#85929E"/>
   </g>
   <g id="1318">
   <rect id="2335_rectangle_550" x="1987.34" y="2066.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1987.34 2066.17)" fill="#85929E"/>
   </g>
   <g id="1317">
   <rect id="2335_rectangle_551" x="1964.18" y="2079.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 1964.18 2079.51)" fill="#85929E"/>
   </g>
   <g id="1316">
   <rect id="2335_rectangle_552" x="1940.79" y="2092.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1940.79 2092.99)" fill="#85929E"/>
   </g>
   <g id="1315">
   <rect id="2335_rectangle_553" x="2354.19" y="1790.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 2354.19 1790.85)" fill="#85929E"/>
   </g>
   <g id="1314">
   <rect id="2335_rectangle_554" x="2331.89" y="1804.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 2331.89 1804.26)" fill="#85929E"/>
   </g>
   <g id="1313">
   <rect id="2335_rectangle_555" x="2308.23" y="1817.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 2308.23 1817.27)" fill="#85929E"/>
   </g>
   <g id="1312">
   <rect id="2335_rectangle_556" x="2285.05" y="1831.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 2285.05 1831.17)" fill="#85929E"/>
   </g>
   <g id="1311">
   <rect id="2335_rectangle_557" x="2261.66" y="1844.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 2261.66 1844.64)" fill="#85929E"/>
   </g>
   <g id="1310">
   <rect id="2335_rectangle_558" x="2238.26" y="1858.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 2238.26 1858.12)" fill="#85929E"/>
   </g>
   <g id="1309">
   <rect id="2335_rectangle_559" x="2214.87" y="1871.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 2214.87 1871.6)" fill="#85929E"/>
   </g>
   <g id="1308">
   <rect id="2335_rectangle_560" x="2191.47" y="1885.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 2191.47 1885.08)" fill="#85929E"/>
   </g>
   <g id="1307">
   <rect id="2335_rectangle_561" x="2168.08" y="1898.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 2168.08 1898.56)" fill="#85929E"/>
   </g>
   <g id="1306">
   <rect id="2335_rectangle_562" x="2144.69" y="1912.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 2144.69 1912.04)" fill="#85929E"/>
   </g>
   <g id="1305">
   <rect id="2335_rectangle_563" x="2121.29" y="1925.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 2121.29 1925.51)" fill="#85929E"/>
   </g>
   <g id="1304">
   <rect id="2335_rectangle_564" x="2098.77" y="1938.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 2098.77 1938.49)" fill="#85929E"/>
   </g>
   <g id="1303">
   <rect id="2335_rectangle_565" x="2075.38" y="1951.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 2075.38 1951.96)" fill="#85929E"/>
   </g>
   <g id="1302">
   <rect id="2335_rectangle_566" x="2052.86" y="1964.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 2052.86 1964.94)" fill="#85929E"/>
   </g>
   <g id="1301">
   <rect id="2335_rectangle_567" x="2029.47" y="1978.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 2029.47 1978.41)" fill="#85929E"/>
   </g>
   <g id="1300">
   <rect id="2335_rectangle_568" x="2006.08" y="1991.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 2006.08 1991.89)" fill="#85929E"/>
   </g>
   <g id="1299">
   <rect id="2335_rectangle_569" x="1982.69" y="2005.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1982.69 2005.36)" fill="#85929E"/>
   </g>
   <g id="1298">
   <rect id="2335_rectangle_570" x="1959.94" y="2018.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1959.94 2018.47)" fill="#85929E"/>
   </g>
   <g id="1297">
   <rect id="2335_rectangle_571" x="1936.78" y="2031.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1936.78 2031.82)" fill="#85929E"/>
   </g>
   <g id="1296">
   <rect id="2335_rectangle_572" x="1913.39" y="2045.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1913.39 2045.29)" fill="#85929E"/>
   </g>
   <g id="1295">
   <rect id="2335_rectangle_573" x="2301.81" y="1699.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 2301.81 1699.82)" fill="#85929E"/>
   </g>
   <g id="1294">
   <rect id="2335_rectangle_574" x="2279.51" y="1713.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 2279.51 1713.23)" fill="#85929E"/>
   </g>
   <g id="1293">
   <rect id="2335_rectangle_575" x="2255.85" y="1726.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 2255.85 1726.25)" fill="#85929E"/>
   </g>
   <g id="1292">
   <rect id="2335_rectangle_576" x="2232.67" y="1740.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 2232.67 1740.14)" fill="#85929E"/>
   </g>
   <g id="1291">
   <rect id="2335_rectangle_577" x="2209.28" y="1753.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 2209.28 1753.62)" fill="#85929E"/>
   </g>
   <g id="1290">
   <rect id="2335_rectangle_578" x="2185.88" y="1767.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 2185.88 1767.1)" fill="#85929E"/>
   </g>
   <g id="1289">
   <rect id="2335_rectangle_579" x="2162.49" y="1780.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 2162.49 1780.57)" fill="#85929E"/>
   </g>
   <g id="1288">
   <rect id="2335_rectangle_580" x="2139.09" y="1794.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 2139.09 1794.05)" fill="#85929E"/>
   </g>
   <g id="1287">
   <rect id="2335_rectangle_581" x="2115.7" y="1807.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 2115.7 1807.53)" fill="#85929E"/>
   </g>
   <g id="1286">
   <rect id="2335_rectangle_582" x="2092.31" y="1821" width="25.0361" height="51.6308" transform="rotate(-30.0029 2092.31 1821)" fill="#85929E"/>
   </g>
   <g id="1285">
   <rect id="2335_rectangle_583" x="2068.91" y="1834.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 2068.91 1834.47)" fill="#85929E"/>
   </g>
   <g id="1284">
   <rect id="2335_rectangle_584" x="2046.39" y="1847.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 2046.39 1847.45)" fill="#85929E"/>
   </g>
   <g id="1283">
   <rect id="2335_rectangle_585" x="2023" y="1860.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 2023 1860.92)" fill="#85929E"/>
   </g>
   <g id="1282">
   <rect id="2335_rectangle_586" x="2000.49" y="1873.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 2000.49 1873.9)" fill="#85929E"/>
   </g>
   <g id="1281">
   <rect id="2335_rectangle_587" x="1977.1" y="1887.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1977.1 1887.37)" fill="#85929E"/>
   </g>
   <g id="1280">
   <rect id="2335_rectangle_588" x="1953.71" y="1900.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 1953.71 1900.85)" fill="#85929E"/>
   </g>
   <g id="1279">
   <rect id="2335_rectangle_589" x="1930.32" y="1914.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1930.32 1914.33)" fill="#85929E"/>
   </g>
   <g id="1278">
   <rect id="2335_rectangle_590" x="1907.57" y="1927.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1907.57 1927.43)" fill="#85929E"/>
   </g>
   <g id="1277">
   <rect id="2335_rectangle_591" x="1884.41" y="1940.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1884.41 1940.78)" fill="#85929E"/>
   </g>
   <g id="1276">
   <rect id="2335_rectangle_592" x="1861.02" y="1954.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1861.02 1954.25)" fill="#85929E"/>
   </g>
   <g id="1275">
   <rect id="2335_rectangle_593" x="2252.59" y="1666.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 2252.59 1666.41)" fill="#85929E"/>
   </g>
   <g id="1274">
   <rect id="2335_rectangle_594" x="2228.93" y="1679.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 2228.93 1679.42)" fill="#85929E"/>
   </g>
   <g id="1273">
   <rect id="2335_rectangle_595" x="2205.76" y="1693.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 2205.76 1693.32)" fill="#85929E"/>
   </g>
   <g id="1272">
   <rect id="2335_rectangle_596" x="2182.36" y="1706.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 2182.36 1706.79)" fill="#85929E"/>
   </g>
   <g id="1271">
   <rect id="2335_rectangle_597" x="2158.97" y="1720.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 2158.97 1720.27)" fill="#85929E"/>
   </g>
   <g id="1270">
   <rect id="2335_rectangle_598" x="2135.57" y="1733.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 2135.57 1733.75)" fill="#85929E"/>
   </g>
   <g id="1269">
   <rect id="2335_rectangle_599" x="2112.18" y="1747.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 2112.18 1747.23)" fill="#85929E"/>
   </g>
   <g id="1268">
   <rect id="2335_rectangle_600" x="2088.78" y="1760.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 2088.78 1760.71)" fill="#85929E"/>
   </g>
   <g id="1267">
   <rect id="2335_rectangle_601" x="2065.39" y="1774.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 2065.39 1774.18)" fill="#85929E"/>
   </g>
   <g id="1266">
   <rect id="2335_rectangle_602" x="2042" y="1787.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 2042 1787.65)" fill="#85929E"/>
   </g>
   <g id="1265">
   <rect id="2335_rectangle_603" x="2019.48" y="1800.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 2019.48 1800.63)" fill="#85929E"/>
   </g>
   <g id="1264">
   <rect id="2335_rectangle_604" x="1996.09" y="1814.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 1996.09 1814.1)" fill="#85929E"/>
   </g>
   <g id="1263">
   <rect id="2335_rectangle_605" x="1973.57" y="1827.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1973.57 1827.08)" fill="#85929E"/>
   </g>
   <g id="1262">
   <rect id="2335_rectangle_606" x="1950.18" y="1840.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1950.18 1840.55)" fill="#85929E"/>
   </g>
   <g id="1261">
   <rect id="2335_rectangle_607" x="1926.79" y="1854.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 1926.79 1854.03)" fill="#85929E"/>
   </g>
   <g id="1260">
   <rect id="2335_rectangle_608" x="1903.41" y="1867.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1903.41 1867.5)" fill="#85929E"/>
   </g>
   <g id="1259">
   <rect id="2335_rectangle_609" x="1880.65" y="1880.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 1880.65 1880.61)" fill="#85929E"/>
   </g>
   <g id="1258">
   <rect id="2335_rectangle_610" x="1857.5" y="1893.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1857.5 1893.96)" fill="#85929E"/>
   </g>
   <g id="1257">
   <rect id="2335_rectangle_611" x="1834.11" y="1907.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1834.11 1907.43)" fill="#85929E"/>
   </g>
   <g id="1256">
   <rect id="2335_rectangle_612" x="2200.21" y="1575.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 2200.21 1575.38)" fill="#85929E"/>
   </g>
   <g id="1255">
   <rect id="2335_rectangle_613" x="2176.55" y="1588.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 2176.55 1588.4)" fill="#85929E"/>
   </g>
   <g id="1254">
   <rect id="2335_rectangle_614" x="2153.38" y="1602.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 2153.38 1602.29)" fill="#85929E"/>
   </g>
   <g id="1253">
   <rect id="2335_rectangle_615" x="2129.98" y="1615.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 2129.98 1615.77)" fill="#85929E"/>
   </g>
   <g id="1252">
   <rect id="2335_rectangle_616" x="2106.59" y="1629.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 2106.59 1629.25)" fill="#85929E"/>
   </g>
   <g id="1251">
   <rect id="2335_rectangle_617" x="2083.19" y="1642.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 2083.19 1642.72)" fill="#85929E"/>
   </g>
   <g id="1250">
   <rect id="2335_rectangle_618" x="2059.8" y="1656.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 2059.8 1656.2)" fill="#85929E"/>
   </g>
   <g id="1249">
   <rect id="2335_rectangle_619" x="2036.4" y="1669.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 2036.4 1669.68)" fill="#85929E"/>
   </g>
   <g id="1248">
   <rect id="2335_rectangle_620" x="2013.02" y="1683.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 2013.02 1683.15)" fill="#85929E"/>
   </g>
   <g id="1247">
   <rect id="2335_rectangle_621" x="1989.63" y="1696.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 1989.63 1696.63)" fill="#85929E"/>
   </g>
   <g id="1246">
   <rect id="2335_rectangle_622" x="1967.11" y="1709.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1967.11 1709.6)" fill="#85929E"/>
   </g>
   <g id="1245">
   <rect id="2335_rectangle_623" x="1943.72" y="1723.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1943.72 1723.08)" fill="#85929E"/>
   </g>
   <g id="1244">
   <rect id="2335_rectangle_624" x="1921.2" y="1736.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1921.2 1736.05)" fill="#85929E"/>
   </g>
   <g id="1243">
   <rect id="2335_rectangle_625" x="1897.81" y="1749.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1897.81 1749.52)" fill="#85929E"/>
   </g>
   <g id="1242">
   <rect id="2335_rectangle_626" x="1874.43" y="1763" width="25.0361" height="51.6308" transform="rotate(-30.0029 1874.43 1763)" fill="#85929E"/>
   </g>
   <g id="1241">
   <rect id="2335_rectangle_627" x="1851.04" y="1776.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1851.04 1776.47)" fill="#85929E"/>
   </g>
   <g id="1240">
   <rect id="2335_rectangle_628" x="1828.29" y="1789.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1828.29 1789.58)" fill="#85929E"/>
   </g>
   <g id="1239">
   <rect id="2335_rectangle_629" x="1805.13" y="1802.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1805.13 1802.92)" fill="#85929E"/>
   </g>
   <g id="1238">
   <rect id="2335_rectangle_630" x="1781.74" y="1816.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1781.74 1816.4)" fill="#85929E"/>
   </g>
   <g id="1237">
   <rect id="2335_rectangle_631" x="2173.3" y="1528.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 2173.3 1528.55)" fill="#85929E"/>
   </g>
   <g id="1236">
   <rect id="2335_rectangle_632" x="2149.64" y="1541.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 2149.64 1541.57)" fill="#85929E"/>
   </g>
   <g id="1235">
   <rect id="2335_rectangle_633" x="2126.47" y="1555.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 2126.47 1555.46)" fill="#85929E"/>
   </g>
   <g id="1234">
   <rect id="2335_rectangle_634" x="2103.07" y="1568.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 2103.07 1568.94)" fill="#85929E"/>
   </g>
   <g id="1233">
   <rect id="2335_rectangle_635" x="2079.68" y="1582.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 2079.68 1582.42)" fill="#85929E"/>
   </g>
   <g id="1232">
   <rect id="2335_rectangle_636" x="2056.28" y="1595.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 2056.28 1595.9)" fill="#85929E"/>
   </g>
   <g id="1231">
   <rect id="2335_rectangle_637" x="2032.89" y="1609.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 2032.89 1609.37)" fill="#85929E"/>
   </g>
   <g id="1230">
   <rect id="2335_rectangle_638" x="2009.49" y="1622.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 2009.49 1622.85)" fill="#85929E"/>
   </g>
   <g id="1229">
   <rect id="2335_rectangle_639" x="1986.11" y="1636.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 1986.11 1636.32)" fill="#85929E"/>
   </g>
   <g id="1228">
   <rect id="2335_rectangle_640" x="1962.72" y="1649.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 1962.72 1649.8)" fill="#85929E"/>
   </g>
   <g id="1227">
   <rect id="2335_rectangle_641" x="1940.2" y="1662.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1940.2 1662.77)" fill="#85929E"/>
   </g>
   <g id="1226">
   <rect id="2335_rectangle_642" x="1916.81" y="1676.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1916.81 1676.25)" fill="#85929E"/>
   </g>
   <g id="1225">
   <rect id="2335_rectangle_643" x="1894.29" y="1689.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1894.29 1689.22)" fill="#85929E"/>
   </g>
   <g id="1224">
   <rect id="2335_rectangle_644" x="1870.9" y="1702.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1870.9 1702.7)" fill="#85929E"/>
   </g>
   <g id="1223">
   <rect id="2335_rectangle_645" x="1847.52" y="1716.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1847.52 1716.17)" fill="#85929E"/>
   </g>
   <g id="1222">
   <rect id="2335_rectangle_646" x="1824.13" y="1729.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1824.13 1729.64)" fill="#85929E"/>
   </g>
   <g id="1221">
   <rect id="2335_rectangle_647" x="1801.38" y="1742.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1801.38 1742.75)" fill="#85929E"/>
   </g>
   <g id="1220">
   <rect id="2335_rectangle_648" x="1778.22" y="1756.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1778.22 1756.09)" fill="#85929E"/>
   </g>
   <g id="1219">
   <rect id="2335_rectangle_649" x="1754.83" y="1769.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1754.83 1769.57)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$127-306" d="M809.377 1338.61L199.083 1706.39L587.566 2387.48L1211.36 2044.22L809.377 1338.61Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$127-306">
   <g id="306">
   <rect id="2335_rectangle_650" x="1128.73" y="2007.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1128.73 2007.47)" fill="#85929E"/>
   </g>
   <g id="305">
   <rect id="2335_rectangle_651" x="1105.45" y="2020.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1105.45 2020.89)" fill="#85929E"/>
   </g>
   <g id="304">
   <rect id="2335_rectangle_652" x="1082.16" y="2034.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1082.16 2034.3)" fill="#85929E"/>
   </g>
   <g id="303">
   <rect id="2335_rectangle_653" x="1058.87" y="2047.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1058.87 2047.72)" fill="#85929E"/>
   </g>
   <g id="302">
   <rect id="2335_rectangle_654" x="1035.59" y="2061.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1035.59 2061.13)" fill="#85929E"/>
   </g>
   <g id="301">
   <rect id="2335_rectangle_655" x="1012.3" y="2074.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 1012.3 2074.54)" fill="#85929E"/>
   </g>
   <g id="300">
   <rect id="2335_rectangle_656" x="989.012" y="2087.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 989.012 2087.96)" fill="#85929E"/>
   </g>
   <g id="299">
   <rect id="2335_rectangle_657" x="965.726" y="2101.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 965.726 2101.37)" fill="#85929E"/>
   </g>
   <g id="298">
   <rect id="2335_rectangle_658" x="942.438" y="2114.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 942.438 2114.79)" fill="#85929E"/>
   </g>
   <g id="297">
   <rect id="2335_rectangle_659" x="919.152" y="2128.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 919.152 2128.2)" fill="#85929E"/>
   </g>
   <g id="296">
   <rect id="2335_rectangle_660" x="895.864" y="2141.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 895.864 2141.62)" fill="#85929E"/>
   </g>
   <g id="295">
   <rect id="2335_rectangle_661" x="872.578" y="2155.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 872.578 2155.03)" fill="#85929E"/>
   </g>
   <g id="294">
   <rect id="2335_rectangle_662" x="849.291" y="2168.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 849.291 2168.45)" fill="#85929E"/>
   </g>
   <g id="293">
   <rect id="2335_rectangle_663" x="826.004" y="2181.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 826.004 2181.86)" fill="#85929E"/>
   </g>
   <g id="292">
   <rect id="2335_rectangle_664" x="802.717" y="2195.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 802.717 2195.27)" fill="#85929E"/>
   </g>
   <g id="291">
   <rect id="2335_rectangle_665" x="779.431" y="2208.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 779.431 2208.69)" fill="#85929E"/>
   </g>
   <g id="290">
   <rect id="2335_rectangle_666" x="756.143" y="2222.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 756.143 2222.1)" fill="#85929E"/>
   </g>
   <g id="289">
   <rect id="2335_rectangle_667" x="732.856" y="2235.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 732.856 2235.52)" fill="#85929E"/>
   </g>
   <g id="288">
   <rect id="2335_rectangle_668" x="1102.31" y="1961.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1102.31 1961.52)" fill="#85929E"/>
   </g>
   <g id="287">
   <rect id="2335_rectangle_669" x="1079.02" y="1974.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1079.02 1974.94)" fill="#85929E"/>
   </g>
   <g id="286">
   <rect id="2335_rectangle_670" x="1055.73" y="1988.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1055.73 1988.35)" fill="#85929E"/>
   </g>
   <g id="285">
   <rect id="2335_rectangle_671" x="1032.45" y="2001.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1032.45 2001.76)" fill="#85929E"/>
   </g>
   <g id="284">
   <rect id="2335_rectangle_672" x="1009.16" y="2015.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1009.16 2015.18)" fill="#85929E"/>
   </g>
   <g id="283">
   <rect id="2335_rectangle_673" x="985.872" y="2028.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 985.872 2028.59)" fill="#85929E"/>
   </g>
   <g id="282">
   <rect id="2335_rectangle_674" x="962.585" y="2042.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 962.585 2042.01)" fill="#85929E"/>
   </g>
   <g id="281">
   <rect id="2335_rectangle_675" x="939.298" y="2055.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 939.298 2055.42)" fill="#85929E"/>
   </g>
   <g id="280">
   <rect id="2335_rectangle_676" x="916.011" y="2068.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 916.011 2068.84)" fill="#85929E"/>
   </g>
   <g id="279">
   <rect id="2335_rectangle_677" x="892.724" y="2082.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 892.724 2082.25)" fill="#85929E"/>
   </g>
   <g id="278">
   <rect id="2335_rectangle_678" x="869.437" y="2095.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 869.437 2095.66)" fill="#85929E"/>
   </g>
   <g id="277">
   <rect id="2335_rectangle_679" x="846.15" y="2109.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 846.15 2109.08)" fill="#85929E"/>
   </g>
   <g id="276">
   <rect id="2335_rectangle_680" x="822.863" y="2122.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 822.863 2122.49)" fill="#85929E"/>
   </g>
   <g id="275">
   <rect id="2335_rectangle_681" x="799.576" y="2135.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 799.576 2135.91)" fill="#85929E"/>
   </g>
   <g id="274">
   <rect id="2335_rectangle_682" x="776.29" y="2149.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 776.29 2149.32)" fill="#85929E"/>
   </g>
   <g id="273">
   <rect id="2335_rectangle_683" x="753.003" y="2162.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 753.003 2162.74)" fill="#85929E"/>
   </g>
   <g id="272">
   <rect id="2335_rectangle_684" x="729.716" y="2176.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 729.716 2176.15)" fill="#85929E"/>
   </g>
   <g id="271">
   <rect id="2335_rectangle_685" x="706.429" y="2189.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 706.429 2189.57)" fill="#85929E"/>
   </g>
   <g id="270">
   <rect id="2335_rectangle_686" x="1049.36" y="1867.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1049.36 1867.38)" fill="#85929E"/>
   </g>
   <g id="269">
   <rect id="2335_rectangle_687" x="1026.08" y="1880.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 1026.08 1880.8)" fill="#85929E"/>
   </g>
   <g id="268">
   <rect id="2335_rectangle_688" x="1002.79" y="1894.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1002.79 1894.21)" fill="#85929E"/>
   </g>
   <g id="267">
   <rect id="2335_rectangle_689" x="979.502" y="1907.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 979.502 1907.63)" fill="#85929E"/>
   </g>
   <g id="266">
   <rect id="2335_rectangle_690" x="956.215" y="1921.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 956.215 1921.04)" fill="#85929E"/>
   </g>
   <g id="265">
   <rect id="2335_rectangle_691" x="932.928" y="1934.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 932.928 1934.45)" fill="#85929E"/>
   </g>
   <g id="264">
   <rect id="2335_rectangle_692" x="909.641" y="1947.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 909.641 1947.87)" fill="#85929E"/>
   </g>
   <g id="263">
   <rect id="2335_rectangle_693" x="886.354" y="1961.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 886.354 1961.28)" fill="#85929E"/>
   </g>
   <g id="262">
   <rect id="2335_rectangle_694" x="863.067" y="1974.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 863.067 1974.7)" fill="#85929E"/>
   </g>
   <g id="261">
   <rect id="2335_rectangle_695" x="839.781" y="1988.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 839.781 1988.11)" fill="#85929E"/>
   </g>
   <g id="260">
   <rect id="2335_rectangle_696" x="816.494" y="2001.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 816.494 2001.53)" fill="#85929E"/>
   </g>
   <g id="259">
   <rect id="2335_rectangle_697" x="793.207" y="2014.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 793.207 2014.94)" fill="#85929E"/>
   </g>
   <g id="258">
   <rect id="2335_rectangle_698" x="769.92" y="2028.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 769.92 2028.35)" fill="#85929E"/>
   </g>
   <g id="257">
   <rect id="2335_rectangle_699" x="746.633" y="2041.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 746.633 2041.77)" fill="#85929E"/>
   </g>
   <g id="256">
   <rect id="2335_rectangle_700" x="723.346" y="2055.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 723.346 2055.18)" fill="#85929E"/>
   </g>
   <g id="255">
   <rect id="2335_rectangle_701" x="700.059" y="2068.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 700.059 2068.6)" fill="#85929E"/>
   </g>
   <g id="254">
   <rect id="2335_rectangle_702" x="676.772" y="2082.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 676.772 2082.01)" fill="#85929E"/>
   </g>
   <g id="253">
   <rect id="2335_rectangle_703" x="653.485" y="2095.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 653.485 2095.43)" fill="#85929E"/>
   </g>
   <g id="252">
   <rect id="2335_rectangle_704" x="1011.85" y="1801.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1011.85 1801.28)" fill="#85929E"/>
   </g>
   <g id="251">
   <rect id="2335_rectangle_705" x="988.56" y="1814.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 988.56 1814.69)" fill="#85929E"/>
   </g>
   <g id="250">
   <rect id="2335_rectangle_706" x="965.273" y="1828.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 965.273 1828.11)" fill="#85929E"/>
   </g>
   <g id="249">
   <rect id="2335_rectangle_707" x="941.985" y="1841.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 941.985 1841.52)" fill="#85929E"/>
   </g>
   <g id="248">
   <rect id="2335_rectangle_708" x="918.699" y="1854.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 918.699 1854.94)" fill="#85929E"/>
   </g>
   <g id="247">
   <rect id="2335_rectangle_709" x="895.412" y="1868.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 895.412 1868.35)" fill="#85929E"/>
   </g>
   <g id="246">
   <rect id="2335_rectangle_710" x="872.125" y="1881.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 872.125 1881.77)" fill="#85929E"/>
   </g>
   <g id="245">
   <rect id="2335_rectangle_711" x="848.838" y="1895.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 848.838 1895.18)" fill="#85929E"/>
   </g>
   <g id="244">
   <rect id="2335_rectangle_712" x="825.551" y="1908.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 825.551 1908.59)" fill="#85929E"/>
   </g>
   <g id="243">
   <rect id="2335_rectangle_713" x="802.264" y="1922.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 802.264 1922.01)" fill="#85929E"/>
   </g>
   <g id="242">
   <rect id="2335_rectangle_714" x="778.977" y="1935.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 778.977 1935.42)" fill="#85929E"/>
   </g>
   <g id="241">
   <rect id="2335_rectangle_715" x="755.691" y="1948.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 755.691 1948.84)" fill="#85929E"/>
   </g>
   <g id="240">
   <rect id="2335_rectangle_716" x="732.404" y="1962.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 732.404 1962.25)" fill="#85929E"/>
   </g>
   <g id="239">
   <rect id="2335_rectangle_717" x="709.117" y="1975.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 709.117 1975.66)" fill="#85929E"/>
   </g>
   <g id="238">
   <rect id="2335_rectangle_718" x="685.83" y="1989.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 685.83 1989.08)" fill="#85929E"/>
   </g>
   <g id="237">
   <rect id="2335_rectangle_719" x="662.543" y="2002.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 662.543 2002.49)" fill="#85929E"/>
   </g>
   <g id="236">
   <rect id="2335_rectangle_720" x="639.256" y="2015.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 639.256 2015.91)" fill="#85929E"/>
   </g>
   <g id="235">
   <rect id="2335_rectangle_721" x="615.969" y="2029.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 615.969 2029.32)" fill="#85929E"/>
   </g>
   <g id="234">
   <rect id="2335_rectangle_722" x="957.633" y="1708.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 957.633 1708.98)" fill="#85929E"/>
   </g>
   <g id="233">
   <rect id="2335_rectangle_723" x="934.346" y="1722.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 934.346 1722.4)" fill="#85929E"/>
   </g>
   <g id="232">
   <rect id="2335_rectangle_724" x="911.059" y="1735.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 911.059 1735.81)" fill="#85929E"/>
   </g>
   <g id="231">
   <rect id="2335_rectangle_725" x="887.772" y="1749.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 887.772 1749.23)" fill="#85929E"/>
   </g>
   <g id="230">
   <rect id="2335_rectangle_726" x="864.485" y="1762.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 864.485 1762.64)" fill="#85929E"/>
   </g>
   <g id="229">
   <rect id="2335_rectangle_727" x="841.199" y="1776.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 841.199 1776.05)" fill="#85929E"/>
   </g>
   <g id="228">
   <rect id="2335_rectangle_728" x="817.912" y="1789.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 817.912 1789.47)" fill="#85929E"/>
   </g>
   <g id="227">
   <rect id="2335_rectangle_729" x="794.625" y="1802.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 794.625 1802.88)" fill="#85929E"/>
   </g>
   <g id="226">
   <rect id="2335_rectangle_730" x="771.338" y="1816.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 771.338 1816.3)" fill="#85929E"/>
   </g>
   <g id="225">
   <rect id="2335_rectangle_731" x="748.051" y="1829.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 748.051 1829.71)" fill="#85929E"/>
   </g>
   <g id="224">
   <rect id="2335_rectangle_732" x="724.764" y="1843.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 724.764 1843.13)" fill="#85929E"/>
   </g>
   <g id="223">
   <rect id="2335_rectangle_733" x="701.477" y="1856.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 701.477 1856.54)" fill="#85929E"/>
   </g>
   <g id="222">
   <rect id="2335_rectangle_734" x="678.19" y="1869.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 678.19 1869.95)" fill="#85929E"/>
   </g>
   <g id="221">
   <rect id="2335_rectangle_735" x="654.904" y="1883.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 654.904 1883.37)" fill="#85929E"/>
   </g>
   <g id="220">
   <rect id="2335_rectangle_736" x="631.616" y="1896.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 631.616 1896.78)" fill="#85929E"/>
   </g>
   <g id="219">
   <rect id="2335_rectangle_737" x="608.33" y="1910.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 608.33 1910.2)" fill="#85929E"/>
   </g>
   <g id="218">
   <rect id="2335_rectangle_738" x="585.043" y="1923.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 585.043 1923.61)" fill="#85929E"/>
   </g>
   <g id="217">
   <rect id="2335_rectangle_739" x="561.756" y="1937.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 561.756 1937.03)" fill="#85929E"/>
   </g>
   <g id="216">
   <rect id="2335_rectangle_740" x="931.205" y="1663.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 931.205 1663.03)" fill="#85929E"/>
   </g>
   <g id="215">
   <rect id="2335_rectangle_741" x="907.918" y="1676.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 907.918 1676.44)" fill="#85929E"/>
   </g>
   <g id="214">
   <rect id="2335_rectangle_742" x="884.632" y="1689.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 884.632 1689.86)" fill="#85929E"/>
   </g>
   <g id="213">
   <rect id="2335_rectangle_743" x="861.345" y="1703.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 861.345 1703.27)" fill="#85929E"/>
   </g>
   <g id="212">
   <rect id="2335_rectangle_744" x="838.058" y="1716.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 838.058 1716.69)" fill="#85929E"/>
   </g>
   <g id="211">
   <rect id="2335_rectangle_745" x="814.771" y="1730.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 814.771 1730.1)" fill="#85929E"/>
   </g>
   <g id="210">
   <rect id="2335_rectangle_746" x="791.484" y="1743.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 791.484 1743.52)" fill="#85929E"/>
   </g>
   <g id="209">
   <rect id="2335_rectangle_747" x="768.197" y="1756.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 768.197 1756.93)" fill="#85929E"/>
   </g>
   <g id="208">
   <rect id="2335_rectangle_748" x="744.91" y="1770.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 744.91 1770.35)" fill="#85929E"/>
   </g>
   <g id="207">
   <rect id="2335_rectangle_749" x="721.623" y="1783.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 721.623 1783.76)" fill="#85929E"/>
   </g>
   <g id="206">
   <rect id="2335_rectangle_750" x="698.337" y="1797.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 698.337 1797.17)" fill="#85929E"/>
   </g>
   <g id="205">
   <rect id="2335_rectangle_751" x="675.05" y="1810.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 675.05 1810.59)" fill="#85929E"/>
   </g>
   <g id="204">
   <rect id="2335_rectangle_752" x="651.763" y="1824" width="25.0361" height="51.6308" transform="rotate(-30.0029 651.763 1824)" fill="#85929E"/>
   </g>
   <g id="203">
   <rect id="2335_rectangle_753" x="628.476" y="1837.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 628.476 1837.42)" fill="#85929E"/>
   </g>
   <g id="202">
   <rect id="2335_rectangle_754" x="605.189" y="1850.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 605.189 1850.83)" fill="#85929E"/>
   </g>
   <g id="201">
   <rect id="2335_rectangle_755" x="581.902" y="1864.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 581.902 1864.25)" fill="#85929E"/>
   </g>
   <g id="200">
   <rect id="2335_rectangle_756" x="558.615" y="1877.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 558.615 1877.66)" fill="#85929E"/>
   </g>
   <g id="199">
   <rect id="2335_rectangle_757" x="535.328" y="1891.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 535.328 1891.07)" fill="#85929E"/>
   </g>
   <g id="198">
   <rect id="2335_rectangle_758" x="879.226" y="1570.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 879.226 1570.64)" fill="#85929E"/>
   </g>
   <g id="197">
   <rect id="2335_rectangle_759" x="855.939" y="1584.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 855.939 1584.06)" fill="#85929E"/>
   </g>
   <g id="196">
   <rect id="2335_rectangle_760" x="832.653" y="1597.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 832.653 1597.47)" fill="#85929E"/>
   </g>
   <g id="195">
   <rect id="2335_rectangle_761" x="809.365" y="1610.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 809.365 1610.89)" fill="#85929E"/>
   </g>
   <g id="194">
   <rect id="2335_rectangle_762" x="786.079" y="1624.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 786.079 1624.3)" fill="#85929E"/>
   </g>
   <g id="193">
   <rect id="2335_rectangle_763" x="762.792" y="1637.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 762.792 1637.72)" fill="#85929E"/>
   </g>
   <g id="192">
   <rect id="2335_rectangle_764" x="739.505" y="1651.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 739.505 1651.13)" fill="#85929E"/>
   </g>
   <g id="191">
   <rect id="2335_rectangle_765" x="716.218" y="1664.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 716.218 1664.54)" fill="#85929E"/>
   </g>
   <g id="190">
   <rect id="2335_rectangle_766" x="692.931" y="1677.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 692.931 1677.96)" fill="#85929E"/>
   </g>
   <g id="189">
   <rect id="2335_rectangle_767" x="669.644" y="1691.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 669.644 1691.37)" fill="#85929E"/>
   </g>
   <g id="188">
   <rect id="2335_rectangle_768" x="646.357" y="1704.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 646.357 1704.79)" fill="#85929E"/>
   </g>
   <g id="187">
   <rect id="2335_rectangle_769" x="623.071" y="1718.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 623.071 1718.2)" fill="#85929E"/>
   </g>
   <g id="186">
   <rect id="2335_rectangle_770" x="599.784" y="1731.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 599.784 1731.62)" fill="#85929E"/>
   </g>
   <g id="185">
   <rect id="2335_rectangle_771" x="576.497" y="1745.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 576.497 1745.03)" fill="#85929E"/>
   </g>
   <g id="184">
   <rect id="2335_rectangle_772" x="553.21" y="1758.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 553.21 1758.45)" fill="#85929E"/>
   </g>
   <g id="183">
   <rect id="2335_rectangle_773" x="529.923" y="1771.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 529.923 1771.86)" fill="#85929E"/>
   </g>
   <g id="182">
   <rect id="2335_rectangle_774" x="506.636" y="1785.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 506.636 1785.27)" fill="#85929E"/>
   </g>
   <g id="181">
   <rect id="2335_rectangle_775" x="483.349" y="1798.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 483.349 1798.69)" fill="#85929E"/>
   </g>
   <g id="180">
   <rect id="2335_rectangle_776" x="852.799" y="1524.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 852.799 1524.69)" fill="#85929E"/>
   </g>
   <g id="179">
   <rect id="2335_rectangle_777" x="829.512" y="1538.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 829.512 1538.11)" fill="#85929E"/>
   </g>
   <g id="178">
   <rect id="2335_rectangle_778" x="806.225" y="1551.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 806.225 1551.52)" fill="#85929E"/>
   </g>
   <g id="177">
   <rect id="2335_rectangle_779" x="782.938" y="1564.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 782.938 1564.94)" fill="#85929E"/>
   </g>
   <g id="176">
   <rect id="2335_rectangle_780" x="759.651" y="1578.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 759.651 1578.35)" fill="#85929E"/>
   </g>
   <g id="175">
   <rect id="2335_rectangle_781" x="736.364" y="1591.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 736.364 1591.76)" fill="#85929E"/>
   </g>
   <g id="174">
   <rect id="2335_rectangle_782" x="713.077" y="1605.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 713.077 1605.18)" fill="#85929E"/>
   </g>
   <g id="173">
   <rect id="2335_rectangle_783" x="689.79" y="1618.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 689.79 1618.59)" fill="#85929E"/>
   </g>
   <g id="172">
   <rect id="2335_rectangle_784" x="666.503" y="1632.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 666.503 1632.01)" fill="#85929E"/>
   </g>
   <g id="171">
   <rect id="2335_rectangle_785" x="643.217" y="1645.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 643.217 1645.42)" fill="#85929E"/>
   </g>
   <g id="170">
   <rect id="2335_rectangle_786" x="619.93" y="1658.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 619.93 1658.84)" fill="#85929E"/>
   </g>
   <g id="169">
   <rect id="2335_rectangle_787" x="596.643" y="1672.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 596.643 1672.25)" fill="#85929E"/>
   </g>
   <g id="168">
   <rect id="2335_rectangle_788" x="573.356" y="1685.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 573.356 1685.66)" fill="#85929E"/>
   </g>
   <g id="167">
   <rect id="2335_rectangle_789" x="550.069" y="1699.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 550.069 1699.08)" fill="#85929E"/>
   </g>
   <g id="166">
   <rect id="2335_rectangle_790" x="526.782" y="1712.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 526.782 1712.49)" fill="#85929E"/>
   </g>
   <g id="165">
   <rect id="2335_rectangle_791" x="503.495" y="1725.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 503.495 1725.91)" fill="#85929E"/>
   </g>
   <g id="164">
   <rect id="2335_rectangle_792" x="480.208" y="1739.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 480.208 1739.32)" fill="#85929E"/>
   </g>
   <g id="163">
   <rect id="2335_rectangle_793" x="456.921" y="1752.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 456.921 1752.74)" fill="#85929E"/>
   </g>
   <g id="162">
   <rect id="2335_rectangle_794" x="799.461" y="1431.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 799.461 1431.91)" fill="#85929E"/>
   </g>
   <g id="161">
   <rect id="2335_rectangle_795" x="776.174" y="1445.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 776.174 1445.33)" fill="#85929E"/>
   </g>
   <g id="160">
   <rect id="2335_rectangle_796" x="752.888" y="1458.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 752.888 1458.74)" fill="#85929E"/>
   </g>
   <g id="159">
   <rect id="2335_rectangle_797" x="729.6" y="1472.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 729.6 1472.16)" fill="#85929E"/>
   </g>
   <g id="158">
   <rect id="2335_rectangle_798" x="706.314" y="1485.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 706.314 1485.57)" fill="#85929E"/>
   </g>
   <g id="157">
   <rect id="2335_rectangle_799" x="683.027" y="1498.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 683.027 1498.98)" fill="#85929E"/>
   </g>
   <g id="156">
   <rect id="2335_rectangle_800" x="659.74" y="1512.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 659.74 1512.4)" fill="#85929E"/>
   </g>
   <g id="155">
   <rect id="2335_rectangle_801" x="636.453" y="1525.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 636.453 1525.81)" fill="#85929E"/>
   </g>
   <g id="154">
   <rect id="2335_rectangle_802" x="613.166" y="1539.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 613.166 1539.23)" fill="#85929E"/>
   </g>
   <g id="153">
   <rect id="2335_rectangle_803" x="589.879" y="1552.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 589.879 1552.64)" fill="#85929E"/>
   </g>
   <g id="152">
   <rect id="2335_rectangle_804" x="566.592" y="1566.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 566.592 1566.06)" fill="#85929E"/>
   </g>
   <g id="151">
   <rect id="2335_rectangle_805" x="543.306" y="1579.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 543.306 1579.47)" fill="#85929E"/>
   </g>
   <g id="150">
   <rect id="2335_rectangle_806" x="520.019" y="1592.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 520.019 1592.88)" fill="#85929E"/>
   </g>
   <g id="149">
   <rect id="2335_rectangle_807" x="496.732" y="1606.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 496.732 1606.3)" fill="#85929E"/>
   </g>
   <g id="148">
   <rect id="2335_rectangle_808" x="473.445" y="1619.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 473.445 1619.71)" fill="#85929E"/>
   </g>
   <g id="147">
   <rect id="2335_rectangle_809" x="450.158" y="1633.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 450.158 1633.13)" fill="#85929E"/>
   </g>
   <g id="146">
   <rect id="2335_rectangle_810" x="426.871" y="1646.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 426.871 1646.54)" fill="#85929E"/>
   </g>
   <g id="145">
   <rect id="2335_rectangle_811" x="403.584" y="1659.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 403.584 1659.96)" fill="#85929E"/>
   </g>
   <g id="144">
   <rect id="2335_rectangle_812" x="773.034" y="1385.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 773.034 1385.96)" fill="#85929E"/>
   </g>
   <g id="143">
   <rect id="2335_rectangle_813" x="749.747" y="1399.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 749.747 1399.37)" fill="#85929E"/>
   </g>
   <g id="142">
   <rect id="2335_rectangle_814" x="726.46" y="1412.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 726.46 1412.79)" fill="#85929E"/>
   </g>
   <g id="141">
   <rect id="2335_rectangle_815" x="703.173" y="1426.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 703.173 1426.2)" fill="#85929E"/>
   </g>
   <g id="140">
   <rect id="2335_rectangle_816" x="679.886" y="1439.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 679.886 1439.62)" fill="#85929E"/>
   </g>
   <g id="139">
   <rect id="2335_rectangle_817" x="656.599" y="1453.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 656.599 1453.03)" fill="#85929E"/>
   </g>
   <g id="138">
   <rect id="2335_rectangle_818" x="633.312" y="1466.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 633.312 1466.45)" fill="#85929E"/>
   </g>
   <g id="137">
   <rect id="2335_rectangle_819" x="610.025" y="1479.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 610.025 1479.86)" fill="#85929E"/>
   </g>
   <g id="136">
   <rect id="2335_rectangle_820" x="586.739" y="1493.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 586.739 1493.28)" fill="#85929E"/>
   </g>
   <g id="135">
   <rect id="2335_rectangle_821" x="563.452" y="1506.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 563.452 1506.69)" fill="#85929E"/>
   </g>
   <g id="134">
   <rect id="2335_rectangle_822" x="540.165" y="1520.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 540.165 1520.1)" fill="#85929E"/>
   </g>
   <g id="133">
   <rect id="2335_rectangle_823" x="516.878" y="1533.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 516.878 1533.52)" fill="#85929E"/>
   </g>
   <g id="132">
   <rect id="2335_rectangle_824" x="493.591" y="1546.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 493.591 1546.93)" fill="#85929E"/>
   </g>
   <g id="131">
   <rect id="2335_rectangle_825" x="470.304" y="1560.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 470.304 1560.35)" fill="#85929E"/>
   </g>
   <g id="130">
   <rect id="2335_rectangle_826" x="447.017" y="1573.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 447.017 1573.76)" fill="#85929E"/>
   </g>
   <g id="129">
   <rect id="2335_rectangle_827" x="423.73" y="1587.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 423.73 1587.18)" fill="#85929E"/>
   </g>
   <g id="128">
   <rect id="2335_rectangle_828" x="400.443" y="1600.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 400.443 1600.59)" fill="#85929E"/>
   </g>
   <g id="127">
   <rect id="2335_rectangle_829" x="377.156" y="1614" width="25.0361" height="51.6308" transform="rotate(-30.0029 377.156 1614)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$505-704" d="M1298.11 1054.83L810.253 1338.12L1210.79 2041.11L1718.19 1753.91L1298.11 1054.83Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$505-704">
   <g id="704">
   <rect id="2335_rectangle_830" x="1633.87" y="1718.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1633.87 1718.09)" fill="#85929E"/>
   </g>
   <g id="703">
   <rect id="2335_rectangle_831" x="1610.44" y="1731.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1610.44 1731.49)" fill="#85929E"/>
   </g>
   <g id="702">
   <rect id="2335_rectangle_832" x="1587" y="1744.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1587 1744.89)" fill="#85929E"/>
   </g>
   <g id="701">
   <rect id="2335_rectangle_833" x="1564.43" y="1757.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1564.43 1757.79)" fill="#85929E"/>
   </g>
   <g id="700">
   <rect id="2335_rectangle_834" x="1540.99" y="1771.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1540.99 1771.18)" fill="#85929E"/>
   </g>
   <g id="699">
   <rect id="2335_rectangle_835" x="1518.43" y="1784.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1518.43 1784.08)" fill="#85929E"/>
   </g>
   <g id="698">
   <rect id="2335_rectangle_836" x="1494.99" y="1797.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1494.99 1797.48)" fill="#85929E"/>
   </g>
   <g id="697">
   <rect id="2335_rectangle_837" x="1471.55" y="1810.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 1471.55 1810.88)" fill="#85929E"/>
   </g>
   <g id="696">
   <rect id="2335_rectangle_838" x="1448.12" y="1824.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1448.12 1824.28)" fill="#85929E"/>
   </g>
   <g id="695">
   <rect id="2335_rectangle_839" x="1425.32" y="1837.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1425.32 1837.31)" fill="#85929E"/>
   </g>
   <g id="694">
   <rect id="2335_rectangle_840" x="1402.11" y="1850.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1402.11 1850.57)" fill="#85929E"/>
   </g>
   <g id="693">
   <rect id="2335_rectangle_841" x="1378.67" y="1863.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1378.67 1863.97)" fill="#85929E"/>
   </g>
   <g id="692">
   <rect id="2335_rectangle_842" x="1355.24" y="1877.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1355.24 1877.37)" fill="#85929E"/>
   </g>
   <g id="691">
   <rect id="2335_rectangle_843" x="1331.8" y="1890.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1331.8 1890.76)" fill="#85929E"/>
   </g>
   <g id="690">
   <rect id="2335_rectangle_844" x="1308.36" y="1904.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1308.36 1904.16)" fill="#85929E"/>
   </g>
   <g id="689">
   <rect id="2335_rectangle_845" x="1284.93" y="1917.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 1284.93 1917.56)" fill="#85929E"/>
   </g>
   <g id="688">
   <rect id="2335_rectangle_846" x="1261.49" y="1930.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1261.49 1930.95)" fill="#85929E"/>
   </g>
   <g id="687">
   <rect id="2335_rectangle_847" x="1238.92" y="1943.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 1238.92 1943.85)" fill="#85929E"/>
   </g>
   <g id="686">
   <rect id="2335_rectangle_848" x="1216.35" y="1956.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1216.35 1956.75)" fill="#85929E"/>
   </g>
   <g id="685">
   <rect id="2335_rectangle_849" x="1192.92" y="1970.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1192.92 1970.15)" fill="#85929E"/>
   </g>
   <g id="684">
   <rect id="2335_rectangle_850" x="1607.84" y="1670.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1607.84 1670.79)" fill="#85929E"/>
   </g>
   <g id="683">
   <rect id="2335_rectangle_851" x="1584.4" y="1684.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1584.4 1684.18)" fill="#85929E"/>
   </g>
   <g id="682">
   <rect id="2335_rectangle_852" x="1560.97" y="1697.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1560.97 1697.58)" fill="#85929E"/>
   </g>
   <g id="681">
   <rect id="2335_rectangle_853" x="1538.4" y="1710.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1538.4 1710.48)" fill="#85929E"/>
   </g>
   <g id="680">
   <rect id="2335_rectangle_854" x="1514.96" y="1723.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1514.96 1723.87)" fill="#85929E"/>
   </g>
   <g id="679">
   <rect id="2335_rectangle_855" x="1492.39" y="1736.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1492.39 1736.77)" fill="#85929E"/>
   </g>
   <g id="678">
   <rect id="2335_rectangle_856" x="1468.96" y="1750.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1468.96 1750.17)" fill="#85929E"/>
   </g>
   <g id="677">
   <rect id="2335_rectangle_857" x="1445.52" y="1763.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1445.52 1763.57)" fill="#85929E"/>
   </g>
   <g id="676">
   <rect id="2335_rectangle_858" x="1422.08" y="1776.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1422.08 1776.97)" fill="#85929E"/>
   </g>
   <g id="675">
   <rect id="2335_rectangle_859" x="1399.28" y="1790" width="25.0361" height="51.6308" transform="rotate(-30.0029 1399.28 1790)" fill="#85929E"/>
   </g>
   <g id="674">
   <rect id="2335_rectangle_860" x="1376.08" y="1803.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1376.08 1803.26)" fill="#85929E"/>
   </g>
   <g id="673">
   <rect id="2335_rectangle_861" x="1352.64" y="1816.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 1352.64 1816.66)" fill="#85929E"/>
   </g>
   <g id="672">
   <rect id="2335_rectangle_862" x="1329.21" y="1830.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1329.21 1830.06)" fill="#85929E"/>
   </g>
   <g id="671">
   <rect id="2335_rectangle_863" x="1305.77" y="1843.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1305.77 1843.45)" fill="#85929E"/>
   </g>
   <g id="670">
   <rect id="2335_rectangle_864" x="1282.33" y="1856.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 1282.33 1856.85)" fill="#85929E"/>
   </g>
   <g id="669">
   <rect id="2335_rectangle_865" x="1258.9" y="1870.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1258.9 1870.25)" fill="#85929E"/>
   </g>
   <g id="668">
   <rect id="2335_rectangle_866" x="1235.46" y="1883.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1235.46 1883.64)" fill="#85929E"/>
   </g>
   <g id="667">
   <rect id="2335_rectangle_867" x="1212.89" y="1896.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 1212.89 1896.54)" fill="#85929E"/>
   </g>
   <g id="666">
   <rect id="2335_rectangle_868" x="1190.32" y="1909.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1190.32 1909.45)" fill="#85929E"/>
   </g>
   <g id="665">
   <rect id="2335_rectangle_869" x="1166.89" y="1922.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1166.89 1922.84)" fill="#85929E"/>
   </g>
   <g id="664">
   <rect id="2335_rectangle_870" x="1556.27" y="1577.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1556.27 1577.08)" fill="#85929E"/>
   </g>
   <g id="663">
   <rect id="2335_rectangle_871" x="1532.84" y="1590.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1532.84 1590.47)" fill="#85929E"/>
   </g>
   <g id="662">
   <rect id="2335_rectangle_872" x="1509.4" y="1603.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1509.4 1603.87)" fill="#85929E"/>
   </g>
   <g id="661">
   <rect id="2335_rectangle_873" x="1486.83" y="1616.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1486.83 1616.77)" fill="#85929E"/>
   </g>
   <g id="660">
   <rect id="2335_rectangle_874" x="1463.39" y="1630.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1463.39 1630.17)" fill="#85929E"/>
   </g>
   <g id="659">
   <rect id="2335_rectangle_875" x="1440.83" y="1643.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1440.83 1643.06)" fill="#85929E"/>
   </g>
   <g id="658">
   <rect id="2335_rectangle_876" x="1417.39" y="1656.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 1417.39 1656.46)" fill="#85929E"/>
   </g>
   <g id="657">
   <rect id="2335_rectangle_877" x="1393.95" y="1669.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1393.95 1669.86)" fill="#85929E"/>
   </g>
   <g id="656">
   <rect id="2335_rectangle_878" x="1370.52" y="1683.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1370.52 1683.26)" fill="#85929E"/>
   </g>
   <g id="655">
   <rect id="2335_rectangle_879" x="1347.72" y="1696.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1347.72 1696.29)" fill="#85929E"/>
   </g>
   <g id="654">
   <rect id="2335_rectangle_880" x="1324.51" y="1709.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1324.51 1709.55)" fill="#85929E"/>
   </g>
   <g id="653">
   <rect id="2335_rectangle_881" x="1301.08" y="1722.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1301.08 1722.95)" fill="#85929E"/>
   </g>
   <g id="652">
   <rect id="2335_rectangle_882" x="1277.64" y="1736.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1277.64 1736.35)" fill="#85929E"/>
   </g>
   <g id="651">
   <rect id="2335_rectangle_883" x="1254.2" y="1749.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1254.2 1749.74)" fill="#85929E"/>
   </g>
   <g id="650">
   <rect id="2335_rectangle_884" x="1230.76" y="1763.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1230.76 1763.14)" fill="#85929E"/>
   </g>
   <g id="649">
   <rect id="2335_rectangle_885" x="1207.33" y="1776.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 1207.33 1776.54)" fill="#85929E"/>
   </g>
   <g id="648">
   <rect id="2335_rectangle_886" x="1183.89" y="1789.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1183.89 1789.94)" fill="#85929E"/>
   </g>
   <g id="647">
   <rect id="2335_rectangle_887" x="1161.32" y="1802.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1161.32 1802.84)" fill="#85929E"/>
   </g>
   <g id="646">
   <rect id="2335_rectangle_888" x="1138.76" y="1815.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1138.76 1815.74)" fill="#85929E"/>
   </g>
   <g id="645">
   <rect id="2335_rectangle_889" x="1115.32" y="1829.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1115.32 1829.13)" fill="#85929E"/>
   </g>
   <g id="644">
   <rect id="2335_rectangle_890" x="1517.38" y="1510.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 1517.38 1510.54)" fill="#85929E"/>
   </g>
   <g id="643">
   <rect id="2335_rectangle_891" x="1493.94" y="1523.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1493.94 1523.94)" fill="#85929E"/>
   </g>
   <g id="642">
   <rect id="2335_rectangle_892" x="1470.51" y="1537.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 1470.51 1537.34)" fill="#85929E"/>
   </g>
   <g id="641">
   <rect id="2335_rectangle_893" x="1447.94" y="1550.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 1447.94 1550.24)" fill="#85929E"/>
   </g>
   <g id="640">
   <rect id="2335_rectangle_894" x="1424.5" y="1563.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 1424.5 1563.63)" fill="#85929E"/>
   </g>
   <g id="639">
   <rect id="2335_rectangle_895" x="1401.93" y="1576.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1401.93 1576.53)" fill="#85929E"/>
   </g>
   <g id="638">
   <rect id="2335_rectangle_896" x="1378.5" y="1589.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 1378.5 1589.93)" fill="#85929E"/>
   </g>
   <g id="637">
   <rect id="2335_rectangle_897" x="1355.06" y="1603.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1355.06 1603.33)" fill="#85929E"/>
   </g>
   <g id="636">
   <rect id="2335_rectangle_898" x="1331.62" y="1616.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 1331.62 1616.73)" fill="#85929E"/>
   </g>
   <g id="635">
   <rect id="2335_rectangle_899" x="1308.82" y="1629.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1308.82 1629.76)" fill="#85929E"/>
   </g>
   <g id="634">
   <rect id="2335_rectangle_900" x="1285.62" y="1643.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 1285.62 1643.02)" fill="#85929E"/>
   </g>
   <g id="633">
   <rect id="2335_rectangle_901" x="1262.18" y="1656.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 1262.18 1656.42)" fill="#85929E"/>
   </g>
   <g id="632">
   <rect id="2335_rectangle_902" x="1238.75" y="1669.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1238.75 1669.82)" fill="#85929E"/>
   </g>
   <g id="631">
   <rect id="2335_rectangle_903" x="1215.31" y="1683.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1215.31 1683.21)" fill="#85929E"/>
   </g>
   <g id="630">
   <rect id="2335_rectangle_904" x="1191.87" y="1696.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 1191.87 1696.61)" fill="#85929E"/>
   </g>
   <g id="629">
   <rect id="2335_rectangle_905" x="1168.44" y="1710.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1168.44 1710.01)" fill="#85929E"/>
   </g>
   <g id="628">
   <rect id="2335_rectangle_906" x="1145" y="1723.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1145 1723.4)" fill="#85929E"/>
   </g>
   <g id="627">
   <rect id="2335_rectangle_907" x="1122.43" y="1736.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1122.43 1736.3)" fill="#85929E"/>
   </g>
   <g id="626">
   <rect id="2335_rectangle_908" x="1099.86" y="1749.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1099.86 1749.2)" fill="#85929E"/>
   </g>
   <g id="625">
   <rect id="2335_rectangle_909" x="1076.43" y="1762.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1076.43 1762.6)" fill="#85929E"/>
   </g>
   <g id="624">
   <rect id="2335_rectangle_910" x="1464.13" y="1420" width="25.0361" height="51.6308" transform="rotate(-30.0029 1464.13 1420)" fill="#85929E"/>
   </g>
   <g id="623">
   <rect id="2335_rectangle_911" x="1440.69" y="1433.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 1440.69 1433.39)" fill="#85929E"/>
   </g>
   <g id="622">
   <rect id="2335_rectangle_912" x="1417.26" y="1446.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1417.26 1446.79)" fill="#85929E"/>
   </g>
   <g id="621">
   <rect id="2335_rectangle_913" x="1394.69" y="1459.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1394.69 1459.69)" fill="#85929E"/>
   </g>
   <g id="620">
   <rect id="2335_rectangle_914" x="1371.25" y="1473.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1371.25 1473.09)" fill="#85929E"/>
   </g>
   <g id="619">
   <rect id="2335_rectangle_915" x="1348.68" y="1485.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1348.68 1485.99)" fill="#85929E"/>
   </g>
   <g id="618">
   <rect id="2335_rectangle_916" x="1325.25" y="1499.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 1325.25 1499.39)" fill="#85929E"/>
   </g>
   <g id="617">
   <rect id="2335_rectangle_917" x="1301.81" y="1512.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1301.81 1512.78)" fill="#85929E"/>
   </g>
   <g id="616">
   <rect id="2335_rectangle_918" x="1278.37" y="1526.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1278.37 1526.18)" fill="#85929E"/>
   </g>
   <g id="615">
   <rect id="2335_rectangle_919" x="1255.57" y="1539.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1255.57 1539.21)" fill="#85929E"/>
   </g>
   <g id="614">
   <rect id="2335_rectangle_920" x="1232.37" y="1552.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1232.37 1552.48)" fill="#85929E"/>
   </g>
   <g id="613">
   <rect id="2335_rectangle_921" x="1208.93" y="1565.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1208.93 1565.87)" fill="#85929E"/>
   </g>
   <g id="612">
   <rect id="2335_rectangle_922" x="1185.5" y="1579.27" width="25.0361" height="51.6308" transform="rotate(-30.0029 1185.5 1579.27)" fill="#85929E"/>
   </g>
   <g id="611">
   <rect id="2335_rectangle_923" x="1162.06" y="1592.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1162.06 1592.67)" fill="#85929E"/>
   </g>
   <g id="610">
   <rect id="2335_rectangle_924" x="1138.62" y="1606.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1138.62 1606.06)" fill="#85929E"/>
   </g>
   <g id="609">
   <rect id="2335_rectangle_925" x="1115.19" y="1619.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 1115.19 1619.46)" fill="#85929E"/>
   </g>
   <g id="608">
   <rect id="2335_rectangle_926" x="1091.75" y="1632.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1091.75 1632.86)" fill="#85929E"/>
   </g>
   <g id="607">
   <rect id="2335_rectangle_927" x="1069.18" y="1645.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1069.18 1645.76)" fill="#85929E"/>
   </g>
   <g id="606">
   <rect id="2335_rectangle_928" x="1046.61" y="1658.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 1046.61 1658.66)" fill="#85929E"/>
   </g>
   <g id="605">
   <rect id="2335_rectangle_929" x="1023.18" y="1672.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1023.18 1672.06)" fill="#85929E"/>
   </g>
   <g id="604">
   <rect id="2335_rectangle_930" x="1438.09" y="1372.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1438.09 1372.69)" fill="#85929E"/>
   </g>
   <g id="603">
   <rect id="2335_rectangle_931" x="1414.66" y="1386.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1414.66 1386.08)" fill="#85929E"/>
   </g>
   <g id="602">
   <rect id="2335_rectangle_932" x="1391.22" y="1399.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1391.22 1399.48)" fill="#85929E"/>
   </g>
   <g id="601">
   <rect id="2335_rectangle_933" x="1368.66" y="1412.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1368.66 1412.38)" fill="#85929E"/>
   </g>
   <g id="600">
   <rect id="2335_rectangle_934" x="1345.22" y="1425.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1345.22 1425.78)" fill="#85929E"/>
   </g>
   <g id="599">
   <rect id="2335_rectangle_935" x="1322.65" y="1438.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1322.65 1438.68)" fill="#85929E"/>
   </g>
   <g id="598">
   <rect id="2335_rectangle_936" x="1299.21" y="1452.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1299.21 1452.08)" fill="#85929E"/>
   </g>
   <g id="597">
   <rect id="2335_rectangle_937" x="1275.78" y="1465.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1275.78 1465.47)" fill="#85929E"/>
   </g>
   <g id="596">
   <rect id="2335_rectangle_938" x="1252.34" y="1478.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1252.34 1478.87)" fill="#85929E"/>
   </g>
   <g id="595">
   <rect id="2335_rectangle_939" x="1229.54" y="1491.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 1229.54 1491.9)" fill="#85929E"/>
   </g>
   <g id="594">
   <rect id="2335_rectangle_940" x="1206.34" y="1505.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1206.34 1505.17)" fill="#85929E"/>
   </g>
   <g id="593">
   <rect id="2335_rectangle_941" x="1182.9" y="1518.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 1182.9 1518.56)" fill="#85929E"/>
   </g>
   <g id="592">
   <rect id="2335_rectangle_942" x="1159.46" y="1531.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1159.46 1531.96)" fill="#85929E"/>
   </g>
   <g id="591">
   <rect id="2335_rectangle_943" x="1136.03" y="1545.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1136.03 1545.36)" fill="#85929E"/>
   </g>
   <g id="590">
   <rect id="2335_rectangle_944" x="1112.59" y="1558.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1112.59 1558.75)" fill="#85929E"/>
   </g>
   <g id="589">
   <rect id="2335_rectangle_945" x="1089.15" y="1572.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1089.15 1572.15)" fill="#85929E"/>
   </g>
   <g id="588">
   <rect id="2335_rectangle_946" x="1065.72" y="1585.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1065.72 1585.55)" fill="#85929E"/>
   </g>
   <g id="587">
   <rect id="2335_rectangle_947" x="1043.15" y="1598.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1043.15 1598.45)" fill="#85929E"/>
   </g>
   <g id="586">
   <rect id="2335_rectangle_948" x="1020.58" y="1611.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1020.58 1611.35)" fill="#85929E"/>
   </g>
   <g id="585">
   <rect id="2335_rectangle_949" x="997.143" y="1624.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 997.143 1624.75)" fill="#85929E"/>
   </g>
   <g id="584">
   <rect id="2335_rectangle_950" x="1384.76" y="1279.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1384.76 1279.91)" fill="#85929E"/>
   </g>
   <g id="583">
   <rect id="2335_rectangle_951" x="1361.32" y="1293.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1361.32 1293.3)" fill="#85929E"/>
   </g>
   <g id="582">
   <rect id="2335_rectangle_952" x="1337.89" y="1306.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1337.89 1306.7)" fill="#85929E"/>
   </g>
   <g id="581">
   <rect id="2335_rectangle_953" x="1315.32" y="1319.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1315.32 1319.6)" fill="#85929E"/>
   </g>
   <g id="580">
   <rect id="2335_rectangle_954" x="1291.88" y="1333" width="25.0361" height="51.6308" transform="rotate(-30.0029 1291.88 1333)" fill="#85929E"/>
   </g>
   <g id="579">
   <rect id="2335_rectangle_955" x="1269.31" y="1345.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 1269.31 1345.9)" fill="#85929E"/>
   </g>
   <g id="578">
   <rect id="2335_rectangle_956" x="1245.88" y="1359.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1245.88 1359.3)" fill="#85929E"/>
   </g>
   <g id="577">
   <rect id="2335_rectangle_957" x="1222.44" y="1372.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1222.44 1372.69)" fill="#85929E"/>
   </g>
   <g id="576">
   <rect id="2335_rectangle_958" x="1199" y="1386.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1199 1386.09)" fill="#85929E"/>
   </g>
   <g id="575">
   <rect id="2335_rectangle_959" x="1176.2" y="1399.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1176.2 1399.12)" fill="#85929E"/>
   </g>
   <g id="574">
   <rect id="2335_rectangle_960" x="1153" y="1412.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 1153 1412.39)" fill="#85929E"/>
   </g>
   <g id="573">
   <rect id="2335_rectangle_961" x="1129.56" y="1425.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1129.56 1425.78)" fill="#85929E"/>
   </g>
   <g id="572">
   <rect id="2335_rectangle_962" x="1106.13" y="1439.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1106.13 1439.18)" fill="#85929E"/>
   </g>
   <g id="571">
   <rect id="2335_rectangle_963" x="1082.69" y="1452.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1082.69 1452.58)" fill="#85929E"/>
   </g>
   <g id="570">
   <rect id="2335_rectangle_964" x="1059.25" y="1465.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1059.25 1465.97)" fill="#85929E"/>
   </g>
   <g id="569">
   <rect id="2335_rectangle_965" x="1035.82" y="1479.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1035.82 1479.37)" fill="#85929E"/>
   </g>
   <g id="568">
   <rect id="2335_rectangle_966" x="1012.38" y="1492.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1012.38 1492.77)" fill="#85929E"/>
   </g>
   <g id="567">
   <rect id="2335_rectangle_967" x="989.81" y="1505.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 989.81 1505.67)" fill="#85929E"/>
   </g>
   <g id="566">
   <rect id="2335_rectangle_968" x="967.242" y="1518.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 967.242 1518.57)" fill="#85929E"/>
   </g>
   <g id="565">
   <rect id="2335_rectangle_969" x="943.805" y="1531.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 943.805 1531.97)" fill="#85929E"/>
   </g>
   <g id="564">
   <rect id="2335_rectangle_970" x="1358.33" y="1233.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1358.33 1233.96)" fill="#85929E"/>
   </g>
   <g id="563">
   <rect id="2335_rectangle_971" x="1334.9" y="1247.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1334.9 1247.35)" fill="#85929E"/>
   </g>
   <g id="562">
   <rect id="2335_rectangle_972" x="1311.46" y="1260.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1311.46 1260.75)" fill="#85929E"/>
   </g>
   <g id="561">
   <rect id="2335_rectangle_973" x="1288.89" y="1273.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1288.89 1273.65)" fill="#85929E"/>
   </g>
   <g id="560">
   <rect id="2335_rectangle_974" x="1265.45" y="1287.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1265.45 1287.05)" fill="#85929E"/>
   </g>
   <g id="559">
   <rect id="2335_rectangle_975" x="1242.89" y="1299.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1242.89 1299.95)" fill="#85929E"/>
   </g>
   <g id="558">
   <rect id="2335_rectangle_976" x="1219.45" y="1313.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 1219.45 1313.34)" fill="#85929E"/>
   </g>
   <g id="557">
   <rect id="2335_rectangle_977" x="1196.01" y="1326.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1196.01 1326.74)" fill="#85929E"/>
   </g>
   <g id="556">
   <rect id="2335_rectangle_978" x="1172.58" y="1340.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1172.58 1340.14)" fill="#85929E"/>
   </g>
   <g id="555">
   <rect id="2335_rectangle_979" x="1149.78" y="1353.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1149.78 1353.17)" fill="#85929E"/>
   </g>
   <g id="554">
   <rect id="2335_rectangle_980" x="1126.57" y="1366.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 1126.57 1366.44)" fill="#85929E"/>
   </g>
   <g id="553">
   <rect id="2335_rectangle_981" x="1103.13" y="1379.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 1103.13 1379.83)" fill="#85929E"/>
   </g>
   <g id="552">
   <rect id="2335_rectangle_982" x="1079.7" y="1393.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 1079.7 1393.23)" fill="#85929E"/>
   </g>
   <g id="551">
   <rect id="2335_rectangle_983" x="1056.26" y="1406.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 1056.26 1406.63)" fill="#85929E"/>
   </g>
   <g id="550">
   <rect id="2335_rectangle_984" x="1032.82" y="1420.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 1032.82 1420.02)" fill="#85929E"/>
   </g>
   <g id="549">
   <rect id="2335_rectangle_985" x="1009.39" y="1433.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 1009.39 1433.42)" fill="#85929E"/>
   </g>
   <g id="548">
   <rect id="2335_rectangle_986" x="985.951" y="1446.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 985.951 1446.82)" fill="#85929E"/>
   </g>
   <g id="547">
   <rect id="2335_rectangle_987" x="963.383" y="1459.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 963.383 1459.72)" fill="#85929E"/>
   </g>
   <g id="546">
   <rect id="2335_rectangle_988" x="940.814" y="1472.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 940.814 1472.62)" fill="#85929E"/>
   </g>
   <g id="545">
   <rect id="2335_rectangle_989" x="917.378" y="1486.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 917.378 1486.01)" fill="#85929E"/>
   </g>
   <g id="544">
   <rect id="2335_rectangle_990" x="1304.68" y="1142.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1304.68 1142.53)" fill="#85929E"/>
   </g>
   <g id="543">
   <rect id="2335_rectangle_991" x="1281.25" y="1155.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1281.25 1155.92)" fill="#85929E"/>
   </g>
   <g id="542">
   <rect id="2335_rectangle_992" x="1257.82" y="1169.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 1257.82 1169.32)" fill="#85929E"/>
   </g>
   <g id="541">
   <rect id="2335_rectangle_993" x="1235.25" y="1182.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1235.25 1182.22)" fill="#85929E"/>
   </g>
   <g id="540">
   <rect id="2335_rectangle_994" x="1211.81" y="1195.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 1211.81 1195.62)" fill="#85929E"/>
   </g>
   <g id="539">
   <rect id="2335_rectangle_995" x="1189.24" y="1208.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1189.24 1208.52)" fill="#85929E"/>
   </g>
   <g id="538">
   <rect id="2335_rectangle_996" x="1165.8" y="1221.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1165.8 1221.91)" fill="#85929E"/>
   </g>
   <g id="537">
   <rect id="2335_rectangle_997" x="1142.37" y="1235.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1142.37 1235.31)" fill="#85929E"/>
   </g>
   <g id="536">
   <rect id="2335_rectangle_998" x="1118.93" y="1248.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 1118.93 1248.71)" fill="#85929E"/>
   </g>
   <g id="535">
   <rect id="2335_rectangle_999" x="1096.13" y="1261.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1096.13 1261.74)" fill="#85929E"/>
   </g>
   <g id="534">
   <rect id="2335_rectangle_1000" x="1072.93" y="1275.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1072.93 1275.01)" fill="#85929E"/>
   </g>
   <g id="533">
   <rect id="2335_rectangle_1001" x="1049.49" y="1288.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1049.49 1288.4)" fill="#85929E"/>
   </g>
   <g id="532">
   <rect id="2335_rectangle_1002" x="1026.05" y="1301.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 1026.05 1301.8)" fill="#85929E"/>
   </g>
   <g id="531">
   <rect id="2335_rectangle_1003" x="1002.62" y="1315.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1002.62 1315.2)" fill="#85929E"/>
   </g>
   <g id="530">
   <rect id="2335_rectangle_1004" x="979.18" y="1328.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 979.18 1328.59)" fill="#85929E"/>
   </g>
   <g id="529">
   <rect id="2335_rectangle_1005" x="955.744" y="1341.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 955.744 1341.99)" fill="#85929E"/>
   </g>
   <g id="528">
   <rect id="2335_rectangle_1006" x="932.307" y="1355.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 932.307 1355.39)" fill="#85929E"/>
   </g>
   <g id="527">
   <rect id="2335_rectangle_1007" x="909.739" y="1368.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 909.739 1368.29)" fill="#85929E"/>
   </g>
   <g id="526">
   <rect id="2335_rectangle_1008" x="887.17" y="1381.19" width="25.0361" height="51.6308" transform="rotate(-30.0029 887.17 1381.19)" fill="#85929E"/>
   </g>
   <g id="525">
   <rect id="2335_rectangle_1009" x="863.733" y="1394.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 863.733 1394.59)" fill="#85929E"/>
   </g>
   <g id="524">
   <rect id="2335_rectangle_1010" x="1277.77" y="1095.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1277.77 1095.7)" fill="#85929E"/>
   </g>
   <g id="523">
   <rect id="2335_rectangle_1011" x="1254.34" y="1109.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1254.34 1109.09)" fill="#85929E"/>
   </g>
   <g id="522">
   <rect id="2335_rectangle_1012" x="1230.91" y="1122.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1230.91 1122.49)" fill="#85929E"/>
   </g>
   <g id="521">
   <rect id="2335_rectangle_1013" x="1208.34" y="1135.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 1208.34 1135.39)" fill="#85929E"/>
   </g>
   <g id="520">
   <rect id="2335_rectangle_1014" x="1184.9" y="1148.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1184.9 1148.79)" fill="#85929E"/>
   </g>
   <g id="519">
   <rect id="2335_rectangle_1015" x="1162.33" y="1161.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1162.33 1161.69)" fill="#85929E"/>
   </g>
   <g id="518">
   <rect id="2335_rectangle_1016" x="1138.9" y="1175.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1138.9 1175.09)" fill="#85929E"/>
   </g>
   <g id="517">
   <rect id="2335_rectangle_1017" x="1115.46" y="1188.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1115.46 1188.48)" fill="#85929E"/>
   </g>
   <g id="516">
   <rect id="2335_rectangle_1018" x="1092.02" y="1201.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 1092.02 1201.88)" fill="#85929E"/>
   </g>
   <g id="515">
   <rect id="2335_rectangle_1019" x="1069.22" y="1214.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1069.22 1214.91)" fill="#85929E"/>
   </g>
   <g id="514">
   <rect id="2335_rectangle_1020" x="1046.02" y="1228.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1046.02 1228.18)" fill="#85929E"/>
   </g>
   <g id="513">
   <rect id="2335_rectangle_1021" x="1022.58" y="1241.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1022.58 1241.57)" fill="#85929E"/>
   </g>
   <g id="512">
   <rect id="2335_rectangle_1022" x="999.144" y="1254.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 999.144 1254.97)" fill="#85929E"/>
   </g>
   <g id="511">
   <rect id="2335_rectangle_1023" x="975.707" y="1268.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 975.707 1268.37)" fill="#85929E"/>
   </g>
   <g id="510">
   <rect id="2335_rectangle_1024" x="952.27" y="1281.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 952.27 1281.77)" fill="#85929E"/>
   </g>
   <g id="509">
   <rect id="2335_rectangle_1025" x="928.834" y="1295.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 928.834 1295.16)" fill="#85929E"/>
   </g>
   <g id="508">
   <rect id="2335_rectangle_1026" x="905.397" y="1308.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 905.397 1308.56)" fill="#85929E"/>
   </g>
   <g id="507">
   <rect id="2335_rectangle_1027" x="882.829" y="1321.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 882.829 1321.46)" fill="#85929E"/>
   </g>
   <g id="506">
   <rect id="2335_rectangle_1028" x="860.26" y="1334.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 860.26 1334.36)" fill="#85929E"/>
   </g>
   <g id="505">
   <rect id="2335_rectangle_1029" x="836.824" y="1347.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 836.824 1347.76)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$307-504" d="M1210.09 2046.07L589.8 2387.4L1071.28 3225.04L1683.25 2876.88L1210.09 2046.07Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$307-504">
   <g id="504">
   <rect id="2335_rectangle_1030" x="1582.08" y="2789.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1582.08 2789.84)" fill="#85929E"/>
   </g>
   <g id="503">
   <rect id="2335_rectangle_1031" x="1558.79" y="2803.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1558.79 2803.25)" fill="#85929E"/>
   </g>
   <g id="502">
   <rect id="2335_rectangle_1032" x="1535.5" y="2816.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1535.5 2816.67)" fill="#85929E"/>
   </g>
   <g id="501">
   <rect id="2335_rectangle_1033" x="1512.22" y="2830.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1512.22 2830.08)" fill="#85929E"/>
   </g>
   <g id="500">
   <rect id="2335_rectangle_1034" x="1488.93" y="2843.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1488.93 2843.5)" fill="#85929E"/>
   </g>
   <g id="499">
   <rect id="2335_rectangle_1035" x="1465.64" y="2856.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1465.64 2856.91)" fill="#85929E"/>
   </g>
   <g id="498">
   <rect id="2335_rectangle_1036" x="1442.36" y="2870.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 1442.36 2870.32)" fill="#85929E"/>
   </g>
   <g id="497">
   <rect id="2335_rectangle_1037" x="1419.07" y="2883.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1419.07 2883.74)" fill="#85929E"/>
   </g>
   <g id="496">
   <rect id="2335_rectangle_1038" x="1395.78" y="2897.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1395.78 2897.15)" fill="#85929E"/>
   </g>
   <g id="495">
   <rect id="2335_rectangle_1039" x="1372.5" y="2910.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1372.5 2910.57)" fill="#85929E"/>
   </g>
   <g id="494">
   <rect id="2335_rectangle_1040" x="1349.21" y="2923.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 1349.21 2923.98)" fill="#85929E"/>
   </g>
   <g id="493">
   <rect id="2335_rectangle_1041" x="1325.92" y="2937.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1325.92 2937.4)" fill="#85929E"/>
   </g>
   <g id="492">
   <rect id="2335_rectangle_1042" x="1302.64" y="2950.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 1302.64 2950.81)" fill="#85929E"/>
   </g>
   <g id="491">
   <rect id="2335_rectangle_1043" x="1279.35" y="2964.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1279.35 2964.22)" fill="#85929E"/>
   </g>
   <g id="490">
   <rect id="2335_rectangle_1044" x="1256.06" y="2977.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1256.06 2977.64)" fill="#85929E"/>
   </g>
   <g id="489">
   <rect id="2335_rectangle_1045" x="1232.77" y="2991.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1232.77 2991.05)" fill="#85929E"/>
   </g>
   <g id="488">
   <rect id="2335_rectangle_1046" x="1209.49" y="3004.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1209.49 3004.47)" fill="#85929E"/>
   </g>
   <g id="487">
   <rect id="2335_rectangle_1047" x="1186.2" y="3017.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 1186.2 3017.88)" fill="#85929E"/>
   </g>
   <g id="486">
   <rect id="2335_rectangle_1048" x="1529.62" y="2696.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1529.62 2696.58)" fill="#85929E"/>
   </g>
   <g id="485">
   <rect id="2335_rectangle_1049" x="1506.33" y="2709.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1506.33 2709.99)" fill="#85929E"/>
   </g>
   <g id="484">
   <rect id="2335_rectangle_1050" x="1483.04" y="2723.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1483.04 2723.4)" fill="#85929E"/>
   </g>
   <g id="483">
   <rect id="2335_rectangle_1051" x="1459.76" y="2736.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1459.76 2736.82)" fill="#85929E"/>
   </g>
   <g id="482">
   <rect id="2335_rectangle_1052" x="1436.47" y="2750.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 1436.47 2750.23)" fill="#85929E"/>
   </g>
   <g id="481">
   <rect id="2335_rectangle_1053" x="1413.18" y="2763.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1413.18 2763.65)" fill="#85929E"/>
   </g>
   <g id="480">
   <rect id="2335_rectangle_1054" x="1389.9" y="2777.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1389.9 2777.06)" fill="#85929E"/>
   </g>
   <g id="479">
   <rect id="2335_rectangle_1055" x="1366.61" y="2790.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1366.61 2790.48)" fill="#85929E"/>
   </g>
   <g id="478">
   <rect id="2335_rectangle_1056" x="1343.32" y="2803.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1343.32 2803.89)" fill="#85929E"/>
   </g>
   <g id="477">
   <rect id="2335_rectangle_1057" x="1320.03" y="2817.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1320.03 2817.3)" fill="#85929E"/>
   </g>
   <g id="476">
   <rect id="2335_rectangle_1058" x="1296.75" y="2830.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1296.75 2830.72)" fill="#85929E"/>
   </g>
   <g id="475">
   <rect id="2335_rectangle_1059" x="1273.46" y="2844.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1273.46 2844.13)" fill="#85929E"/>
   </g>
   <g id="474">
   <rect id="2335_rectangle_1060" x="1250.17" y="2857.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1250.17 2857.55)" fill="#85929E"/>
   </g>
   <g id="473">
   <rect id="2335_rectangle_1061" x="1226.89" y="2870.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1226.89 2870.96)" fill="#85929E"/>
   </g>
   <g id="472">
   <rect id="2335_rectangle_1062" x="1203.6" y="2884.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1203.6 2884.38)" fill="#85929E"/>
   </g>
   <g id="471">
   <rect id="2335_rectangle_1063" x="1180.31" y="2897.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1180.31 2897.79)" fill="#85929E"/>
   </g>
   <g id="470">
   <rect id="2335_rectangle_1064" x="1157.03" y="2911.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1157.03 2911.2)" fill="#85929E"/>
   </g>
   <g id="469">
   <rect id="2335_rectangle_1065" x="1133.74" y="2924.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 1133.74 2924.62)" fill="#85929E"/>
   </g>
   <g id="468">
   <rect id="2335_rectangle_1066" x="1503.19" y="2650.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 1503.19 2650.62)" fill="#85929E"/>
   </g>
   <g id="467">
   <rect id="2335_rectangle_1067" x="1479.9" y="2664.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1479.9 2664.04)" fill="#85929E"/>
   </g>
   <g id="466">
   <rect id="2335_rectangle_1068" x="1456.62" y="2677.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1456.62 2677.45)" fill="#85929E"/>
   </g>
   <g id="465">
   <rect id="2335_rectangle_1069" x="1433.33" y="2690.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1433.33 2690.87)" fill="#85929E"/>
   </g>
   <g id="464">
   <rect id="2335_rectangle_1070" x="1410.04" y="2704.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1410.04 2704.28)" fill="#85929E"/>
   </g>
   <g id="463">
   <rect id="2335_rectangle_1071" x="1386.75" y="2717.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1386.75 2717.7)" fill="#85929E"/>
   </g>
   <g id="462">
   <rect id="2335_rectangle_1072" x="1363.47" y="2731.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 1363.47 2731.11)" fill="#85929E"/>
   </g>
   <g id="461">
   <rect id="2335_rectangle_1073" x="1340.18" y="2744.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1340.18 2744.52)" fill="#85929E"/>
   </g>
   <g id="460">
   <rect id="2335_rectangle_1074" x="1316.89" y="2757.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1316.89 2757.94)" fill="#85929E"/>
   </g>
   <g id="459">
   <rect id="2335_rectangle_1075" x="1293.61" y="2771.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1293.61 2771.35)" fill="#85929E"/>
   </g>
   <g id="458">
   <rect id="2335_rectangle_1076" x="1270.32" y="2784.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1270.32 2784.77)" fill="#85929E"/>
   </g>
   <g id="457">
   <rect id="2335_rectangle_1077" x="1247.03" y="2798.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1247.03 2798.18)" fill="#85929E"/>
   </g>
   <g id="456">
   <rect id="2335_rectangle_1078" x="1223.75" y="2811.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1223.75 2811.6)" fill="#85929E"/>
   </g>
   <g id="455">
   <rect id="2335_rectangle_1079" x="1200.46" y="2825.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1200.46 2825.01)" fill="#85929E"/>
   </g>
   <g id="454">
   <rect id="2335_rectangle_1080" x="1177.17" y="2838.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 1177.17 2838.42)" fill="#85929E"/>
   </g>
   <g id="453">
   <rect id="2335_rectangle_1081" x="1153.89" y="2851.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1153.89 2851.84)" fill="#85929E"/>
   </g>
   <g id="452">
   <rect id="2335_rectangle_1082" x="1130.6" y="2865.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1130.6 2865.25)" fill="#85929E"/>
   </g>
   <g id="451">
   <rect id="2335_rectangle_1083" x="1107.31" y="2878.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1107.31 2878.67)" fill="#85929E"/>
   </g>
   <g id="450">
   <rect id="2335_rectangle_1084" x="1450.33" y="2558.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1450.33 2558.72)" fill="#85929E"/>
   </g>
   <g id="449">
   <rect id="2335_rectangle_1085" x="1427.05" y="2572.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1427.05 2572.13)" fill="#85929E"/>
   </g>
   <g id="448">
   <rect id="2335_rectangle_1086" x="1403.76" y="2585.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1403.76 2585.55)" fill="#85929E"/>
   </g>
   <g id="447">
   <rect id="2335_rectangle_1087" x="1380.47" y="2598.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1380.47 2598.96)" fill="#85929E"/>
   </g>
   <g id="446">
   <rect id="2335_rectangle_1088" x="1357.19" y="2612.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1357.19 2612.38)" fill="#85929E"/>
   </g>
   <g id="445">
   <rect id="2335_rectangle_1089" x="1333.9" y="2625.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1333.9 2625.79)" fill="#85929E"/>
   </g>
   <g id="444">
   <rect id="2335_rectangle_1090" x="1310.61" y="2639.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1310.61 2639.21)" fill="#85929E"/>
   </g>
   <g id="443">
   <rect id="2335_rectangle_1091" x="1287.33" y="2652.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 1287.33 2652.62)" fill="#85929E"/>
   </g>
   <g id="442">
   <rect id="2335_rectangle_1092" x="1264.04" y="2666.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1264.04 2666.04)" fill="#85929E"/>
   </g>
   <g id="441">
   <rect id="2335_rectangle_1093" x="1240.75" y="2679.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1240.75 2679.45)" fill="#85929E"/>
   </g>
   <g id="440">
   <rect id="2335_rectangle_1094" x="1217.47" y="2692.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1217.47 2692.86)" fill="#85929E"/>
   </g>
   <g id="439">
   <rect id="2335_rectangle_1095" x="1194.18" y="2706.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1194.18 2706.28)" fill="#85929E"/>
   </g>
   <g id="438">
   <rect id="2335_rectangle_1096" x="1170.89" y="2719.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1170.89 2719.69)" fill="#85929E"/>
   </g>
   <g id="437">
   <rect id="2335_rectangle_1097" x="1147.6" y="2733.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 1147.6 2733.11)" fill="#85929E"/>
   </g>
   <g id="436">
   <rect id="2335_rectangle_1098" x="1124.32" y="2746.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1124.32 2746.52)" fill="#85929E"/>
   </g>
   <g id="435">
   <rect id="2335_rectangle_1099" x="1101.03" y="2759.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1101.03 2759.94)" fill="#85929E"/>
   </g>
   <g id="434">
   <rect id="2335_rectangle_1100" x="1077.74" y="2773.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1077.74 2773.35)" fill="#85929E"/>
   </g>
   <g id="433">
   <rect id="2335_rectangle_1101" x="1054.46" y="2786.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1054.46 2786.76)" fill="#85929E"/>
   </g>
   <g id="432">
   <rect id="2335_rectangle_1102" x="1423.91" y="2512.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1423.91 2512.77)" fill="#85929E"/>
   </g>
   <g id="431">
   <rect id="2335_rectangle_1103" x="1400.62" y="2526.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1400.62 2526.18)" fill="#85929E"/>
   </g>
   <g id="430">
   <rect id="2335_rectangle_1104" x="1377.33" y="2539.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1377.33 2539.6)" fill="#85929E"/>
   </g>
   <g id="429">
   <rect id="2335_rectangle_1105" x="1354.05" y="2553.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1354.05 2553.01)" fill="#85929E"/>
   </g>
   <g id="428">
   <rect id="2335_rectangle_1106" x="1330.76" y="2566.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1330.76 2566.43)" fill="#85929E"/>
   </g>
   <g id="427">
   <rect id="2335_rectangle_1107" x="1307.47" y="2579.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1307.47 2579.84)" fill="#85929E"/>
   </g>
   <g id="426">
   <rect id="2335_rectangle_1108" x="1284.18" y="2593.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1284.18 2593.25)" fill="#85929E"/>
   </g>
   <g id="425">
   <rect id="2335_rectangle_1109" x="1260.9" y="2606.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1260.9 2606.67)" fill="#85929E"/>
   </g>
   <g id="424">
   <rect id="2335_rectangle_1110" x="1237.61" y="2620.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1237.61 2620.08)" fill="#85929E"/>
   </g>
   <g id="423">
   <rect id="2335_rectangle_1111" x="1214.32" y="2633.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1214.32 2633.5)" fill="#85929E"/>
   </g>
   <g id="422">
   <rect id="2335_rectangle_1112" x="1191.04" y="2646.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1191.04 2646.91)" fill="#85929E"/>
   </g>
   <g id="421">
   <rect id="2335_rectangle_1113" x="1167.75" y="2660.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1167.75 2660.33)" fill="#85929E"/>
   </g>
   <g id="420">
   <rect id="2335_rectangle_1114" x="1144.46" y="2673.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1144.46 2673.74)" fill="#85929E"/>
   </g>
   <g id="419">
   <rect id="2335_rectangle_1115" x="1121.18" y="2687.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1121.18 2687.15)" fill="#85929E"/>
   </g>
   <g id="418">
   <rect id="2335_rectangle_1116" x="1097.89" y="2700.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1097.89 2700.57)" fill="#85929E"/>
   </g>
   <g id="417">
   <rect id="2335_rectangle_1117" x="1074.6" y="2713.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 1074.6 2713.98)" fill="#85929E"/>
   </g>
   <g id="416">
   <rect id="2335_rectangle_1118" x="1051.32" y="2727.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1051.32 2727.4)" fill="#85929E"/>
   </g>
   <g id="415">
   <rect id="2335_rectangle_1119" x="1028.03" y="2740.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 1028.03 2740.81)" fill="#85929E"/>
   </g>
   <g id="414">
   <rect id="2335_rectangle_1120" x="1366.58" y="2421.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1366.58 2421.04)" fill="#85929E"/>
   </g>
   <g id="413">
   <rect id="2335_rectangle_1121" x="1343.3" y="2434.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1343.3 2434.45)" fill="#85929E"/>
   </g>
   <g id="412">
   <rect id="2335_rectangle_1122" x="1320.01" y="2447.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1320.01 2447.87)" fill="#85929E"/>
   </g>
   <g id="411">
   <rect id="2335_rectangle_1123" x="1296.72" y="2461.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1296.72 2461.28)" fill="#85929E"/>
   </g>
   <g id="410">
   <rect id="2335_rectangle_1124" x="1273.43" y="2474.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1273.43 2474.7)" fill="#85929E"/>
   </g>
   <g id="409">
   <rect id="2335_rectangle_1125" x="1250.15" y="2488.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 1250.15 2488.11)" fill="#85929E"/>
   </g>
   <g id="408">
   <rect id="2335_rectangle_1126" x="1226.86" y="2501.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1226.86 2501.53)" fill="#85929E"/>
   </g>
   <g id="407">
   <rect id="2335_rectangle_1127" x="1203.57" y="2514.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1203.57 2514.94)" fill="#85929E"/>
   </g>
   <g id="406">
   <rect id="2335_rectangle_1128" x="1180.29" y="2528.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1180.29 2528.36)" fill="#85929E"/>
   </g>
   <g id="405">
   <rect id="2335_rectangle_1129" x="1157" y="2541.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1157 2541.77)" fill="#85929E"/>
   </g>
   <g id="404">
   <rect id="2335_rectangle_1130" x="1133.71" y="2555.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1133.71 2555.18)" fill="#85929E"/>
   </g>
   <g id="403">
   <rect id="2335_rectangle_1131" x="1110.43" y="2568.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1110.43 2568.6)" fill="#85929E"/>
   </g>
   <g id="402">
   <rect id="2335_rectangle_1132" x="1087.14" y="2582.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1087.14 2582.01)" fill="#85929E"/>
   </g>
   <g id="401">
   <rect id="2335_rectangle_1133" x="1063.85" y="2595.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1063.85 2595.43)" fill="#85929E"/>
   </g>
   <g id="400">
   <rect id="2335_rectangle_1134" x="1040.57" y="2608.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1040.57 2608.84)" fill="#85929E"/>
   </g>
   <g id="399">
   <rect id="2335_rectangle_1135" x="1017.28" y="2622.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1017.28 2622.26)" fill="#85929E"/>
   </g>
   <g id="398">
   <rect id="2335_rectangle_1136" x="993.992" y="2635.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 993.992 2635.67)" fill="#85929E"/>
   </g>
   <g id="397">
   <rect id="2335_rectangle_1137" x="970.705" y="2649.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 970.705 2649.08)" fill="#85929E"/>
   </g>
   <g id="396">
   <rect id="2335_rectangle_1138" x="1340.15" y="2375.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1340.15 2375.09)" fill="#85929E"/>
   </g>
   <g id="395">
   <rect id="2335_rectangle_1139" x="1316.87" y="2388.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1316.87 2388.5)" fill="#85929E"/>
   </g>
   <g id="394">
   <rect id="2335_rectangle_1140" x="1293.58" y="2401.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1293.58 2401.92)" fill="#85929E"/>
   </g>
   <g id="393">
   <rect id="2335_rectangle_1141" x="1270.29" y="2415.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1270.29 2415.33)" fill="#85929E"/>
   </g>
   <g id="392">
   <rect id="2335_rectangle_1142" x="1247.01" y="2428.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1247.01 2428.75)" fill="#85929E"/>
   </g>
   <g id="391">
   <rect id="2335_rectangle_1143" x="1223.72" y="2442.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1223.72 2442.16)" fill="#85929E"/>
   </g>
   <g id="390">
   <rect id="2335_rectangle_1144" x="1200.43" y="2455.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1200.43 2455.57)" fill="#85929E"/>
   </g>
   <g id="389">
   <rect id="2335_rectangle_1145" x="1177.15" y="2468.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1177.15 2468.99)" fill="#85929E"/>
   </g>
   <g id="388">
   <rect id="2335_rectangle_1146" x="1153.86" y="2482.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1153.86 2482.4)" fill="#85929E"/>
   </g>
   <g id="387">
   <rect id="2335_rectangle_1147" x="1130.57" y="2495.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1130.57 2495.82)" fill="#85929E"/>
   </g>
   <g id="386">
   <rect id="2335_rectangle_1148" x="1107.29" y="2509.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 1107.29 2509.23)" fill="#85929E"/>
   </g>
   <g id="385">
   <rect id="2335_rectangle_1149" x="1084" y="2522.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1084 2522.65)" fill="#85929E"/>
   </g>
   <g id="384">
   <rect id="2335_rectangle_1150" x="1060.71" y="2536.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1060.71 2536.06)" fill="#85929E"/>
   </g>
   <g id="383">
   <rect id="2335_rectangle_1151" x="1037.43" y="2549.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1037.43 2549.47)" fill="#85929E"/>
   </g>
   <g id="382">
   <rect id="2335_rectangle_1152" x="1014.14" y="2562.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1014.14 2562.89)" fill="#85929E"/>
   </g>
   <g id="381">
   <rect id="2335_rectangle_1153" x="990.851" y="2576.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 990.851 2576.3)" fill="#85929E"/>
   </g>
   <g id="380">
   <rect id="2335_rectangle_1154" x="967.564" y="2589.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 967.564 2589.72)" fill="#85929E"/>
   </g>
   <g id="379">
   <rect id="2335_rectangle_1155" x="944.277" y="2603.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 944.277 2603.13)" fill="#85929E"/>
   </g>
   <g id="378">
   <rect id="2335_rectangle_1156" x="1288.66" y="2283.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1288.66 2283.58)" fill="#85929E"/>
   </g>
   <g id="377">
   <rect id="2335_rectangle_1157" x="1265.37" y="2296.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1265.37 2296.99)" fill="#85929E"/>
   </g>
   <g id="376">
   <rect id="2335_rectangle_1158" x="1242.08" y="2310.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 1242.08 2310.41)" fill="#85929E"/>
   </g>
   <g id="375">
   <rect id="2335_rectangle_1159" x="1218.8" y="2323.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1218.8 2323.82)" fill="#85929E"/>
   </g>
   <g id="374">
   <rect id="2335_rectangle_1160" x="1195.51" y="2337.24" width="25.0361" height="51.6308" transform="rotate(-30.0029 1195.51 2337.24)" fill="#85929E"/>
   </g>
   <g id="373">
   <rect id="2335_rectangle_1161" x="1172.22" y="2350.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1172.22 2350.65)" fill="#85929E"/>
   </g>
   <g id="372">
   <rect id="2335_rectangle_1162" x="1148.94" y="2364.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 1148.94 2364.07)" fill="#85929E"/>
   </g>
   <g id="371">
   <rect id="2335_rectangle_1163" x="1125.65" y="2377.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1125.65 2377.48)" fill="#85929E"/>
   </g>
   <g id="370">
   <rect id="2335_rectangle_1164" x="1102.36" y="2390.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1102.36 2390.89)" fill="#85929E"/>
   </g>
   <g id="369">
   <rect id="2335_rectangle_1165" x="1079.08" y="2404.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1079.08 2404.31)" fill="#85929E"/>
   </g>
   <g id="368">
   <rect id="2335_rectangle_1166" x="1055.79" y="2417.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1055.79 2417.72)" fill="#85929E"/>
   </g>
   <g id="367">
   <rect id="2335_rectangle_1167" x="1032.5" y="2431.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1032.5 2431.14)" fill="#85929E"/>
   </g>
   <g id="366">
   <rect id="2335_rectangle_1168" x="1009.21" y="2444.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1009.21 2444.55)" fill="#85929E"/>
   </g>
   <g id="365">
   <rect id="2335_rectangle_1169" x="985.928" y="2457.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 985.928 2457.96)" fill="#85929E"/>
   </g>
   <g id="364">
   <rect id="2335_rectangle_1170" x="962.641" y="2471.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 962.641 2471.38)" fill="#85929E"/>
   </g>
   <g id="363">
   <rect id="2335_rectangle_1171" x="939.354" y="2484.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 939.354 2484.79)" fill="#85929E"/>
   </g>
   <g id="362">
   <rect id="2335_rectangle_1172" x="916.067" y="2498.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 916.067 2498.21)" fill="#85929E"/>
   </g>
   <g id="361">
   <rect id="2335_rectangle_1173" x="892.78" y="2511.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 892.78 2511.62)" fill="#85929E"/>
   </g>
   <g id="360">
   <rect id="2335_rectangle_1174" x="1262.23" y="2237.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 1262.23 2237.63)" fill="#85929E"/>
   </g>
   <g id="359">
   <rect id="2335_rectangle_1175" x="1238.94" y="2251.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1238.94 2251.04)" fill="#85929E"/>
   </g>
   <g id="358">
   <rect id="2335_rectangle_1176" x="1215.66" y="2264.46" width="25.0361" height="51.6308" transform="rotate(-30.0029 1215.66 2264.46)" fill="#85929E"/>
   </g>
   <g id="357">
   <rect id="2335_rectangle_1177" x="1192.37" y="2277.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1192.37 2277.87)" fill="#85929E"/>
   </g>
   <g id="356">
   <rect id="2335_rectangle_1178" x="1169.08" y="2291.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1169.08 2291.28)" fill="#85929E"/>
   </g>
   <g id="355">
   <rect id="2335_rectangle_1179" x="1145.8" y="2304.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1145.8 2304.7)" fill="#85929E"/>
   </g>
   <g id="354">
   <rect id="2335_rectangle_1180" x="1122.51" y="2318.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 1122.51 2318.11)" fill="#85929E"/>
   </g>
   <g id="353">
   <rect id="2335_rectangle_1181" x="1099.22" y="2331.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1099.22 2331.53)" fill="#85929E"/>
   </g>
   <g id="352">
   <rect id="2335_rectangle_1182" x="1075.93" y="2344.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1075.93 2344.94)" fill="#85929E"/>
   </g>
   <g id="351">
   <rect id="2335_rectangle_1183" x="1052.65" y="2358.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1052.65 2358.36)" fill="#85929E"/>
   </g>
   <g id="350">
   <rect id="2335_rectangle_1184" x="1029.36" y="2371.77" width="25.0361" height="51.6308" transform="rotate(-30.0029 1029.36 2371.77)" fill="#85929E"/>
   </g>
   <g id="349">
   <rect id="2335_rectangle_1185" x="1006.07" y="2385.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1006.07 2385.18)" fill="#85929E"/>
   </g>
   <g id="348">
   <rect id="2335_rectangle_1186" x="982.787" y="2398.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 982.787 2398.6)" fill="#85929E"/>
   </g>
   <g id="347">
   <rect id="2335_rectangle_1187" x="959.5" y="2412.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 959.5 2412.01)" fill="#85929E"/>
   </g>
   <g id="346">
   <rect id="2335_rectangle_1188" x="936.214" y="2425.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 936.214 2425.43)" fill="#85929E"/>
   </g>
   <g id="345">
   <rect id="2335_rectangle_1189" x="912.927" y="2438.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 912.927 2438.84)" fill="#85929E"/>
   </g>
   <g id="344">
   <rect id="2335_rectangle_1190" x="889.64" y="2452.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 889.64 2452.26)" fill="#85929E"/>
   </g>
   <g id="343">
   <rect id="2335_rectangle_1191" x="866.353" y="2465.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 866.353 2465.67)" fill="#85929E"/>
   </g>
   <g id="342">
   <rect id="2335_rectangle_1192" x="1208.89" y="2144.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 1208.89 2144.85)" fill="#85929E"/>
   </g>
   <g id="341">
   <rect id="2335_rectangle_1193" x="1185.61" y="2158.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1185.61 2158.26)" fill="#85929E"/>
   </g>
   <g id="340">
   <rect id="2335_rectangle_1194" x="1162.32" y="2171.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1162.32 2171.68)" fill="#85929E"/>
   </g>
   <g id="339">
   <rect id="2335_rectangle_1195" x="1139.03" y="2185.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1139.03 2185.09)" fill="#85929E"/>
   </g>
   <g id="338">
   <rect id="2335_rectangle_1196" x="1115.74" y="2198.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1115.74 2198.5)" fill="#85929E"/>
   </g>
   <g id="337">
   <rect id="2335_rectangle_1197" x="1092.46" y="2211.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1092.46 2211.92)" fill="#85929E"/>
   </g>
   <g id="336">
   <rect id="2335_rectangle_1198" x="1069.17" y="2225.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1069.17 2225.33)" fill="#85929E"/>
   </g>
   <g id="335">
   <rect id="2335_rectangle_1199" x="1045.88" y="2238.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1045.88 2238.75)" fill="#85929E"/>
   </g>
   <g id="334">
   <rect id="2335_rectangle_1200" x="1022.6" y="2252.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1022.6 2252.16)" fill="#85929E"/>
   </g>
   <g id="333">
   <rect id="2335_rectangle_1201" x="999.311" y="2265.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 999.311 2265.58)" fill="#85929E"/>
   </g>
   <g id="332">
   <rect id="2335_rectangle_1202" x="976.024" y="2278.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 976.024 2278.99)" fill="#85929E"/>
   </g>
   <g id="331">
   <rect id="2335_rectangle_1203" x="952.737" y="2292.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 952.737 2292.4)" fill="#85929E"/>
   </g>
   <g id="330">
   <rect id="2335_rectangle_1204" x="929.45" y="2305.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 929.45 2305.82)" fill="#85929E"/>
   </g>
   <g id="329">
   <rect id="2335_rectangle_1205" x="906.163" y="2319.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 906.163 2319.23)" fill="#85929E"/>
   </g>
   <g id="328">
   <rect id="2335_rectangle_1206" x="882.876" y="2332.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 882.876 2332.65)" fill="#85929E"/>
   </g>
   <g id="327">
   <rect id="2335_rectangle_1207" x="859.589" y="2346.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 859.589 2346.06)" fill="#85929E"/>
   </g>
   <g id="326">
   <rect id="2335_rectangle_1208" x="836.302" y="2359.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 836.302 2359.48)" fill="#85929E"/>
   </g>
   <g id="325">
   <rect id="2335_rectangle_1209" x="813.015" y="2372.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 813.015 2372.89)" fill="#85929E"/>
   </g>
   <g id="324">
   <rect id="2335_rectangle_1210" x="1182.46" y="2098.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 1182.46 2098.9)" fill="#85929E"/>
   </g>
   <g id="323">
   <rect id="2335_rectangle_1211" x="1159.18" y="2112.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 1159.18 2112.31)" fill="#85929E"/>
   </g>
   <g id="322">
   <rect id="2335_rectangle_1212" x="1135.89" y="2125.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1135.89 2125.72)" fill="#85929E"/>
   </g>
   <g id="321">
   <rect id="2335_rectangle_1213" x="1112.6" y="2139.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1112.6 2139.14)" fill="#85929E"/>
   </g>
   <g id="320">
   <rect id="2335_rectangle_1214" x="1089.32" y="2152.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1089.32 2152.55)" fill="#85929E"/>
   </g>
   <g id="319">
   <rect id="2335_rectangle_1215" x="1066.03" y="2165.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1066.03 2165.97)" fill="#85929E"/>
   </g>
   <g id="318">
   <rect id="2335_rectangle_1216" x="1042.74" y="2179.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1042.74 2179.38)" fill="#85929E"/>
   </g>
   <g id="317">
   <rect id="2335_rectangle_1217" x="1019.46" y="2192.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 1019.46 2192.8)" fill="#85929E"/>
   </g>
   <g id="316">
   <rect id="2335_rectangle_1218" x="996.17" y="2206.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 996.17 2206.21)" fill="#85929E"/>
   </g>
   <g id="315">
   <rect id="2335_rectangle_1219" x="972.883" y="2219.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 972.883 2219.62)" fill="#85929E"/>
   </g>
   <g id="314">
   <rect id="2335_rectangle_1220" x="949.596" y="2233.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 949.596 2233.04)" fill="#85929E"/>
   </g>
   <g id="313">
   <rect id="2335_rectangle_1221" x="926.309" y="2246.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 926.309 2246.45)" fill="#85929E"/>
   </g>
   <g id="312">
   <rect id="2335_rectangle_1222" x="903.022" y="2259.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 903.022 2259.87)" fill="#85929E"/>
   </g>
   <g id="311">
   <rect id="2335_rectangle_1223" x="879.735" y="2273.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 879.735 2273.28)" fill="#85929E"/>
   </g>
   <g id="310">
   <rect id="2335_rectangle_1224" x="856.448" y="2286.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 856.448 2286.7)" fill="#85929E"/>
   </g>
   <g id="309">
   <rect id="2335_rectangle_1225" x="833.162" y="2300.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 833.162 2300.11)" fill="#85929E"/>
   </g>
   <g id="308">
   <rect id="2335_rectangle_1226" x="809.875" y="2313.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 809.875 2313.52)" fill="#85929E"/>
   </g>
   <g id="307">
   <rect id="2335_rectangle_1227" x="786.588" y="2326.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 786.588 2326.94)" fill="#85929E"/>
   </g>
   </g>
   <path id="BG$705-924" d="M1688.5 2873.99L1216.13 2040.46L1719.02 1763.73L2188.41 2566.94L1688.5 2873.99Z" fill="#FFF1E4" stroke="grey" stroke-width="5"/>
   <g id="$705-924">
   <g id="924">
   <rect id="2335_rectangle_1228" x="2088.48" y="2498.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 2088.48 2498.62)" fill="#85929E"/>
   </g>
   <g id="923">
   <rect id="2335_rectangle_1229" x="2065.05" y="2512.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 2065.05 2512.02)" fill="#85929E"/>
   </g>
   <g id="922">
   <rect id="2335_rectangle_1230" x="2041.61" y="2525.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 2041.61 2525.41)" fill="#85929E"/>
   </g>
   <g id="921">
   <rect id="2335_rectangle_1231" x="2019.05" y="2538.31" width="25.0361" height="51.6308" transform="rotate(-30.0029 2019.05 2538.31)" fill="#85929E"/>
   </g>
   <g id="920">
   <rect id="2335_rectangle_1232" x="1995.61" y="2551.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 1995.61 2551.71)" fill="#85929E"/>
   </g>
   <g id="919">
   <rect id="2335_rectangle_1233" x="1973.04" y="2564.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 1973.04 2564.61)" fill="#85929E"/>
   </g>
   <g id="918">
   <rect id="2335_rectangle_1234" x="1949.6" y="2578.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1949.6 2578.01)" fill="#85929E"/>
   </g>
   <g id="917">
   <rect id="2335_rectangle_1235" x="1926.17" y="2591.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1926.17 2591.4)" fill="#85929E"/>
   </g>
   <g id="916">
   <rect id="2335_rectangle_1236" x="1902.73" y="2604.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 1902.73 2604.8)" fill="#85929E"/>
   </g>
   <g id="915">
   <rect id="2335_rectangle_1237" x="1879.93" y="2617.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 1879.93 2617.83)" fill="#85929E"/>
   </g>
   <g id="914">
   <rect id="2335_rectangle_1238" x="1856.73" y="2631.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 1856.73 2631.1)" fill="#85929E"/>
   </g>
   <g id="913">
   <rect id="2335_rectangle_1239" x="1833.29" y="2644.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1833.29 2644.5)" fill="#85929E"/>
   </g>
   <g id="912">
   <rect id="2335_rectangle_1240" x="1809.85" y="2657.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1809.85 2657.89)" fill="#85929E"/>
   </g>
   <g id="911">
   <rect id="2335_rectangle_1241" x="1786.42" y="2671.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1786.42 2671.29)" fill="#85929E"/>
   </g>
   <g id="910">
   <rect id="2335_rectangle_1242" x="1762.98" y="2684.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1762.98 2684.69)" fill="#85929E"/>
   </g>
   <g id="909">
   <rect id="2335_rectangle_1243" x="1739.54" y="2698.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1739.54 2698.08)" fill="#85929E"/>
   </g>
   <g id="908">
   <rect id="2335_rectangle_1244" x="1716.11" y="2711.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1716.11 2711.48)" fill="#85929E"/>
   </g>
   <g id="907">
   <rect id="2335_rectangle_1245" x="1693.54" y="2724.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1693.54 2724.38)" fill="#85929E"/>
   </g>
   <g id="906">
   <rect id="2335_rectangle_1246" x="1670.97" y="2737.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1670.97 2737.28)" fill="#85929E"/>
   </g>
   <g id="905">
   <rect id="2335_rectangle_1247" x="1647.53" y="2750.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1647.53 2750.68)" fill="#85929E"/>
   </g>
   <g id="904">
   <rect id="2335_rectangle_1248" x="2034.75" y="2407.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 2034.75 2407.2)" fill="#85929E"/>
   </g>
   <g id="903">
   <rect id="2335_rectangle_1249" x="2011.32" y="2420.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 2011.32 2420.59)" fill="#85929E"/>
   </g>
   <g id="902">
   <rect id="2335_rectangle_1250" x="1987.88" y="2433.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1987.88 2433.99)" fill="#85929E"/>
   </g>
   <g id="901">
   <rect id="2335_rectangle_1251" x="1965.31" y="2446.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1965.31 2446.89)" fill="#85929E"/>
   </g>
   <g id="900">
   <rect id="2335_rectangle_1252" x="1941.88" y="2460.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1941.88 2460.29)" fill="#85929E"/>
   </g>
   <g id="899">
   <rect id="2335_rectangle_1253" x="1919.31" y="2473.19" width="25.0361" height="51.6308" transform="rotate(-30.0029 1919.31 2473.19)" fill="#85929E"/>
   </g>
   <g id="898">
   <rect id="2335_rectangle_1254" x="1895.87" y="2486.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1895.87 2486.58)" fill="#85929E"/>
   </g>
   <g id="897">
   <rect id="2335_rectangle_1255" x="1872.44" y="2499.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 1872.44 2499.98)" fill="#85929E"/>
   </g>
   <g id="896">
   <rect id="2335_rectangle_1256" x="1849" y="2513.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1849 2513.38)" fill="#85929E"/>
   </g>
   <g id="895">
   <rect id="2335_rectangle_1257" x="1826.2" y="2526.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 1826.2 2526.41)" fill="#85929E"/>
   </g>
   <g id="894">
   <rect id="2335_rectangle_1258" x="1802.99" y="2539.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1802.99 2539.68)" fill="#85929E"/>
   </g>
   <g id="893">
   <rect id="2335_rectangle_1259" x="1779.56" y="2553.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 1779.56 2553.07)" fill="#85929E"/>
   </g>
   <g id="892">
   <rect id="2335_rectangle_1260" x="1756.12" y="2566.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1756.12 2566.47)" fill="#85929E"/>
   </g>
   <g id="891">
   <rect id="2335_rectangle_1261" x="1732.68" y="2579.87" width="25.0361" height="51.6308" transform="rotate(-30.0029 1732.68 2579.87)" fill="#85929E"/>
   </g>
   <g id="890">
   <rect id="2335_rectangle_1262" x="1709.25" y="2593.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1709.25 2593.26)" fill="#85929E"/>
   </g>
   <g id="889">
   <rect id="2335_rectangle_1263" x="1685.81" y="2606.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 1685.81 2606.66)" fill="#85929E"/>
   </g>
   <g id="888">
   <rect id="2335_rectangle_1264" x="1662.37" y="2620.06" width="25.0361" height="51.6308" transform="rotate(-30.0029 1662.37 2620.06)" fill="#85929E"/>
   </g>
   <g id="887">
   <rect id="2335_rectangle_1265" x="1639.81" y="2632.96" width="25.0361" height="51.6308" transform="rotate(-30.0029 1639.81 2632.96)" fill="#85929E"/>
   </g>
   <g id="886">
   <rect id="2335_rectangle_1266" x="1617.24" y="2645.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1617.24 2645.86)" fill="#85929E"/>
   </g>
   <g id="885">
   <rect id="2335_rectangle_1267" x="1593.8" y="2659.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1593.8 2659.25)" fill="#85929E"/>
   </g>
   <g id="884">
   <rect id="2335_rectangle_1268" x="2008.72" y="2359.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 2008.72 2359.89)" fill="#85929E"/>
   </g>
   <g id="883">
   <rect id="2335_rectangle_1269" x="1985.29" y="2373.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1985.29 2373.28)" fill="#85929E"/>
   </g>
   <g id="882">
   <rect id="2335_rectangle_1270" x="1961.85" y="2386.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1961.85 2386.68)" fill="#85929E"/>
   </g>
   <g id="881">
   <rect id="2335_rectangle_1271" x="1939.28" y="2399.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1939.28 2399.58)" fill="#85929E"/>
   </g>
   <g id="880">
   <rect id="2335_rectangle_1272" x="1915.84" y="2412.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 1915.84 2412.98)" fill="#85929E"/>
   </g>
   <g id="879">
   <rect id="2335_rectangle_1273" x="1893.28" y="2425.88" width="25.0361" height="51.6308" transform="rotate(-30.0029 1893.28 2425.88)" fill="#85929E"/>
   </g>
   <g id="878">
   <rect id="2335_rectangle_1274" x="1869.84" y="2439.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1869.84 2439.28)" fill="#85929E"/>
   </g>
   <g id="877">
   <rect id="2335_rectangle_1275" x="1846.4" y="2452.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1846.4 2452.67)" fill="#85929E"/>
   </g>
   <g id="876">
   <rect id="2335_rectangle_1276" x="1822.97" y="2466.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 1822.97 2466.07)" fill="#85929E"/>
   </g>
   <g id="875">
   <rect id="2335_rectangle_1277" x="1800.17" y="2479.1" width="25.0361" height="51.6308" transform="rotate(-30.0029 1800.17 2479.1)" fill="#85929E"/>
   </g>
   <g id="874">
   <rect id="2335_rectangle_1278" x="1776.96" y="2492.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1776.96 2492.37)" fill="#85929E"/>
   </g>
   <g id="873">
   <rect id="2335_rectangle_1279" x="1753.52" y="2505.76" width="25.0361" height="51.6308" transform="rotate(-30.0029 1753.52 2505.76)" fill="#85929E"/>
   </g>
   <g id="872">
   <rect id="2335_rectangle_1280" x="1730.09" y="2519.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1730.09 2519.16)" fill="#85929E"/>
   </g>
   <g id="871">
   <rect id="2335_rectangle_1281" x="1706.65" y="2532.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 1706.65 2532.56)" fill="#85929E"/>
   </g>
   <g id="870">
   <rect id="2335_rectangle_1282" x="1683.21" y="2545.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1683.21 2545.95)" fill="#85929E"/>
   </g>
   <g id="869">
   <rect id="2335_rectangle_1283" x="1659.78" y="2559.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1659.78 2559.35)" fill="#85929E"/>
   </g>
   <g id="868">
   <rect id="2335_rectangle_1284" x="1636.34" y="2572.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1636.34 2572.75)" fill="#85929E"/>
   </g>
   <g id="867">
   <rect id="2335_rectangle_1285" x="1613.77" y="2585.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1613.77 2585.65)" fill="#85929E"/>
   </g>
   <g id="866">
   <rect id="2335_rectangle_1286" x="1591.21" y="2598.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1591.21 2598.55)" fill="#85929E"/>
   </g>
   <g id="865">
   <rect id="2335_rectangle_1287" x="1567.77" y="2611.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1567.77 2611.95)" fill="#85929E"/>
   </g>
   <g id="864">
   <rect id="2335_rectangle_1288" x="1954.99" y="2268.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1954.99 2268.47)" fill="#85929E"/>
   </g>
   <g id="863">
   <rect id="2335_rectangle_1289" x="1931.55" y="2281.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1931.55 2281.86)" fill="#85929E"/>
   </g>
   <g id="862">
   <rect id="2335_rectangle_1290" x="1908.12" y="2295.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1908.12 2295.26)" fill="#85929E"/>
   </g>
   <g id="861">
   <rect id="2335_rectangle_1291" x="1885.55" y="2308.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1885.55 2308.16)" fill="#85929E"/>
   </g>
   <g id="860">
   <rect id="2335_rectangle_1292" x="1862.11" y="2321.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 1862.11 2321.56)" fill="#85929E"/>
   </g>
   <g id="859">
   <rect id="2335_rectangle_1293" x="1839.54" y="2334.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1839.54 2334.45)" fill="#85929E"/>
   </g>
   <g id="858">
   <rect id="2335_rectangle_1294" x="1816.11" y="2347.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 1816.11 2347.85)" fill="#85929E"/>
   </g>
   <g id="857">
   <rect id="2335_rectangle_1295" x="1792.67" y="2361.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1792.67 2361.25)" fill="#85929E"/>
   </g>
   <g id="856">
   <rect id="2335_rectangle_1296" x="1769.23" y="2374.65" width="25.0361" height="51.6308" transform="rotate(-30.0029 1769.23 2374.65)" fill="#85929E"/>
   </g>
   <g id="855">
   <rect id="2335_rectangle_1297" x="1746.43" y="2387.68" width="25.0361" height="51.6308" transform="rotate(-30.0029 1746.43 2387.68)" fill="#85929E"/>
   </g>
   <g id="854">
   <rect id="2335_rectangle_1298" x="1723.23" y="2400.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1723.23 2400.94)" fill="#85929E"/>
   </g>
   <g id="853">
   <rect id="2335_rectangle_1299" x="1699.79" y="2414.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 1699.79 2414.34)" fill="#85929E"/>
   </g>
   <g id="852">
   <rect id="2335_rectangle_1300" x="1676.36" y="2427.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1676.36 2427.74)" fill="#85929E"/>
   </g>
   <g id="851">
   <rect id="2335_rectangle_1301" x="1652.92" y="2441.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1652.92 2441.14)" fill="#85929E"/>
   </g>
   <g id="850">
   <rect id="2335_rectangle_1302" x="1629.48" y="2454.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1629.48 2454.53)" fill="#85929E"/>
   </g>
   <g id="849">
   <rect id="2335_rectangle_1303" x="1606.05" y="2467.93" width="25.0361" height="51.6308" transform="rotate(-30.0029 1606.05 2467.93)" fill="#85929E"/>
   </g>
   <g id="848">
   <rect id="2335_rectangle_1304" x="1582.61" y="2481.33" width="25.0361" height="51.6308" transform="rotate(-30.0029 1582.61 2481.33)" fill="#85929E"/>
   </g>
   <g id="847">
   <rect id="2335_rectangle_1305" x="1560.04" y="2494.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 1560.04 2494.23)" fill="#85929E"/>
   </g>
   <g id="846">
   <rect id="2335_rectangle_1306" x="1537.47" y="2507.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1537.47 2507.13)" fill="#85929E"/>
   </g>
   <g id="845">
   <rect id="2335_rectangle_1307" x="1514.04" y="2520.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1514.04 2520.52)" fill="#85929E"/>
   </g>
   <g id="844">
   <rect id="2335_rectangle_1308" x="1928.95" y="2221.16" width="25.0361" height="51.6308" transform="rotate(-30.0029 1928.95 2221.16)" fill="#85929E"/>
   </g>
   <g id="843">
   <rect id="2335_rectangle_1309" x="1905.52" y="2234.55" width="25.0361" height="51.6308" transform="rotate(-30.0029 1905.52 2234.55)" fill="#85929E"/>
   </g>
   <g id="842">
   <rect id="2335_rectangle_1310" x="1882.08" y="2247.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1882.08 2247.95)" fill="#85929E"/>
   </g>
   <g id="841">
   <rect id="2335_rectangle_1311" x="1859.52" y="2260.85" width="25.0361" height="51.6308" transform="rotate(-30.0029 1859.52 2260.85)" fill="#85929E"/>
   </g>
   <g id="840">
   <rect id="2335_rectangle_1312" x="1836.08" y="2274.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1836.08 2274.25)" fill="#85929E"/>
   </g>
   <g id="839">
   <rect id="2335_rectangle_1313" x="1813.51" y="2287.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1813.51 2287.15)" fill="#85929E"/>
   </g>
   <g id="838">
   <rect id="2335_rectangle_1314" x="1790.07" y="2300.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 1790.07 2300.54)" fill="#85929E"/>
   </g>
   <g id="837">
   <rect id="2335_rectangle_1315" x="1766.64" y="2313.94" width="25.0361" height="51.6308" transform="rotate(-30.0029 1766.64 2313.94)" fill="#85929E"/>
   </g>
   <g id="836">
   <rect id="2335_rectangle_1316" x="1743.2" y="2327.34" width="25.0361" height="51.6308" transform="rotate(-30.0029 1743.2 2327.34)" fill="#85929E"/>
   </g>
   <g id="835">
   <rect id="2335_rectangle_1317" x="1720.4" y="2340.37" width="25.0361" height="51.6308" transform="rotate(-30.0029 1720.4 2340.37)" fill="#85929E"/>
   </g>
   <g id="834">
   <rect id="2335_rectangle_1318" x="1697.2" y="2353.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1697.2 2353.64)" fill="#85929E"/>
   </g>
   <g id="833">
   <rect id="2335_rectangle_1319" x="1673.76" y="2367.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 1673.76 2367.03)" fill="#85929E"/>
   </g>
   <g id="832">
   <rect id="2335_rectangle_1320" x="1650.32" y="2380.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1650.32 2380.43)" fill="#85929E"/>
   </g>
   <g id="831">
   <rect id="2335_rectangle_1321" x="1626.89" y="2393.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 1626.89 2393.83)" fill="#85929E"/>
   </g>
   <g id="830">
   <rect id="2335_rectangle_1322" x="1603.45" y="2407.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1603.45 2407.22)" fill="#85929E"/>
   </g>
   <g id="829">
   <rect id="2335_rectangle_1323" x="1580.01" y="2420.62" width="25.0361" height="51.6308" transform="rotate(-30.0029 1580.01 2420.62)" fill="#85929E"/>
   </g>
   <g id="828">
   <rect id="2335_rectangle_1324" x="1556.58" y="2434.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 1556.58 2434.02)" fill="#85929E"/>
   </g>
   <g id="827">
   <rect id="2335_rectangle_1325" x="1534.01" y="2446.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1534.01 2446.92)" fill="#85929E"/>
   </g>
   <g id="826">
   <rect id="2335_rectangle_1326" x="1511.44" y="2459.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1511.44 2459.82)" fill="#85929E"/>
   </g>
   <g id="825">
   <rect id="2335_rectangle_1327" x="1488" y="2473.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1488 2473.21)" fill="#85929E"/>
   </g>
   <g id="824">
   <rect id="2335_rectangle_1328" x="1875.22" y="2129.73" width="25.0361" height="51.6308" transform="rotate(-30.0029 1875.22 2129.73)" fill="#85929E"/>
   </g>
   <g id="823">
   <rect id="2335_rectangle_1329" x="1851.79" y="2143.13" width="25.0361" height="51.6308" transform="rotate(-30.0029 1851.79 2143.13)" fill="#85929E"/>
   </g>
   <g id="822">
   <rect id="2335_rectangle_1330" x="1828.35" y="2156.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1828.35 2156.52)" fill="#85929E"/>
   </g>
   <g id="821">
   <rect id="2335_rectangle_1331" x="1805.78" y="2169.43" width="25.0361" height="51.6308" transform="rotate(-30.0029 1805.78 2169.43)" fill="#85929E"/>
   </g>
   <g id="820">
   <rect id="2335_rectangle_1332" x="1782.35" y="2182.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1782.35 2182.82)" fill="#85929E"/>
   </g>
   <g id="819">
   <rect id="2335_rectangle_1333" x="1759.78" y="2195.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1759.78 2195.72)" fill="#85929E"/>
   </g>
   <g id="818">
   <rect id="2335_rectangle_1334" x="1736.34" y="2209.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1736.34 2209.12)" fill="#85929E"/>
   </g>
   <g id="817">
   <rect id="2335_rectangle_1335" x="1712.91" y="2222.52" width="25.0361" height="51.6308" transform="rotate(-30.0029 1712.91 2222.52)" fill="#85929E"/>
   </g>
   <g id="816">
   <rect id="2335_rectangle_1336" x="1689.47" y="2235.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1689.47 2235.91)" fill="#85929E"/>
   </g>
   <g id="815">
   <rect id="2335_rectangle_1337" x="1666.67" y="2248.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1666.67 2248.95)" fill="#85929E"/>
   </g>
   <g id="814">
   <rect id="2335_rectangle_1338" x="1643.46" y="2262.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1643.46 2262.21)" fill="#85929E"/>
   </g>
   <g id="813">
   <rect id="2335_rectangle_1339" x="1620.03" y="2275.61" width="25.0361" height="51.6308" transform="rotate(-30.0029 1620.03 2275.61)" fill="#85929E"/>
   </g>
   <g id="812">
   <rect id="2335_rectangle_1340" x="1596.59" y="2289.01" width="25.0361" height="51.6308" transform="rotate(-30.0029 1596.59 2289.01)" fill="#85929E"/>
   </g>
   <g id="811">
   <rect id="2335_rectangle_1341" x="1573.15" y="2302.4" width="25.0361" height="51.6308" transform="rotate(-30.0029 1573.15 2302.4)" fill="#85929E"/>
   </g>
   <g id="810">
   <rect id="2335_rectangle_1342" x="1549.72" y="2315.8" width="25.0361" height="51.6308" transform="rotate(-30.0029 1549.72 2315.8)" fill="#85929E"/>
   </g>
   <g id="809">
   <rect id="2335_rectangle_1343" x="1526.28" y="2329.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1526.28 2329.2)" fill="#85929E"/>
   </g>
   <g id="808">
   <rect id="2335_rectangle_1344" x="1502.84" y="2342.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 1502.84 2342.59)" fill="#85929E"/>
   </g>
   <g id="807">
   <rect id="2335_rectangle_1345" x="1480.28" y="2355.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1480.28 2355.49)" fill="#85929E"/>
   </g>
   <g id="806">
   <rect id="2335_rectangle_1346" x="1457.71" y="2368.39" width="25.0361" height="51.6308" transform="rotate(-30.0029 1457.71 2368.39)" fill="#85929E"/>
   </g>
   <g id="805">
   <rect id="2335_rectangle_1347" x="1434.27" y="2381.79" width="25.0361" height="51.6308" transform="rotate(-30.0029 1434.27 2381.79)" fill="#85929E"/>
   </g>
   <g id="804">
   <rect id="2335_rectangle_1348" x="1849.19" y="2082.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 1849.19 2082.42)" fill="#85929E"/>
   </g>
   <g id="803">
   <rect id="2335_rectangle_1349" x="1825.76" y="2095.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1825.76 2095.82)" fill="#85929E"/>
   </g>
   <g id="802">
   <rect id="2335_rectangle_1350" x="1802.32" y="2109.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1802.32 2109.22)" fill="#85929E"/>
   </g>
   <g id="801">
   <rect id="2335_rectangle_1351" x="1779.75" y="2122.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1779.75 2122.12)" fill="#85929E"/>
   </g>
   <g id="800">
   <rect id="2335_rectangle_1352" x="1756.31" y="2135.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 1756.31 2135.51)" fill="#85929E"/>
   </g>
   <g id="799">
   <rect id="2335_rectangle_1353" x="1733.75" y="2148.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 1733.75 2148.41)" fill="#85929E"/>
   </g>
   <g id="798">
   <rect id="2335_rectangle_1354" x="1710.31" y="2161.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 1710.31 2161.81)" fill="#85929E"/>
   </g>
   <g id="797">
   <rect id="2335_rectangle_1355" x="1686.87" y="2175.21" width="25.0361" height="51.6308" transform="rotate(-30.0029 1686.87 2175.21)" fill="#85929E"/>
   </g>
   <g id="796">
   <rect id="2335_rectangle_1356" x="1663.44" y="2188.6" width="25.0361" height="51.6308" transform="rotate(-30.0029 1663.44 2188.6)" fill="#85929E"/>
   </g>
   <g id="795">
   <rect id="2335_rectangle_1357" x="1640.64" y="2201.64" width="25.0361" height="51.6308" transform="rotate(-30.0029 1640.64 2201.64)" fill="#85929E"/>
   </g>
   <g id="794">
   <rect id="2335_rectangle_1358" x="1617.43" y="2214.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 1617.43 2214.9)" fill="#85929E"/>
   </g>
   <g id="793">
   <rect id="2335_rectangle_1359" x="1593.99" y="2228.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1593.99 2228.3)" fill="#85929E"/>
   </g>
   <g id="792">
   <rect id="2335_rectangle_1360" x="1570.56" y="2241.7" width="25.0361" height="51.6308" transform="rotate(-30.0029 1570.56 2241.7)" fill="#85929E"/>
   </g>
   <g id="791">
   <rect id="2335_rectangle_1361" x="1547.12" y="2255.09" width="25.0361" height="51.6308" transform="rotate(-30.0029 1547.12 2255.09)" fill="#85929E"/>
   </g>
   <g id="790">
   <rect id="2335_rectangle_1362" x="1523.68" y="2268.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1523.68 2268.49)" fill="#85929E"/>
   </g>
   <g id="789">
   <rect id="2335_rectangle_1363" x="1500.25" y="2281.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1500.25 2281.89)" fill="#85929E"/>
   </g>
   <g id="788">
   <rect id="2335_rectangle_1364" x="1476.81" y="2295.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1476.81 2295.28)" fill="#85929E"/>
   </g>
   <g id="787">
   <rect id="2335_rectangle_1365" x="1454.24" y="2308.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1454.24 2308.18)" fill="#85929E"/>
   </g>
   <g id="786">
   <rect id="2335_rectangle_1366" x="1431.68" y="2321.08" width="25.0361" height="51.6308" transform="rotate(-30.0029 1431.68 2321.08)" fill="#85929E"/>
   </g>
   <g id="785">
   <rect id="2335_rectangle_1367" x="1408.24" y="2334.48" width="25.0361" height="51.6308" transform="rotate(-30.0029 1408.24 2334.48)" fill="#85929E"/>
   </g>
   <g id="784">
   <rect id="2335_rectangle_1368" x="1795.06" y="1992.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1795.06 1992.36)" fill="#85929E"/>
   </g>
   <g id="783">
   <rect id="2335_rectangle_1369" x="1771.63" y="2005.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1771.63 2005.75)" fill="#85929E"/>
   </g>
   <g id="782">
   <rect id="2335_rectangle_1370" x="1748.19" y="2019.15" width="25.0361" height="51.6308" transform="rotate(-30.0029 1748.19 2019.15)" fill="#85929E"/>
   </g>
   <g id="781">
   <rect id="2335_rectangle_1371" x="1725.62" y="2032.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1725.62 2032.05)" fill="#85929E"/>
   </g>
   <g id="780">
   <rect id="2335_rectangle_1372" x="1702.19" y="2045.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1702.19 2045.45)" fill="#85929E"/>
   </g>
   <g id="779">
   <rect id="2335_rectangle_1373" x="1679.62" y="2058.35" width="25.0361" height="51.6308" transform="rotate(-30.0029 1679.62 2058.35)" fill="#85929E"/>
   </g>
   <g id="778">
   <rect id="2335_rectangle_1374" x="1656.18" y="2071.75" width="25.0361" height="51.6308" transform="rotate(-30.0029 1656.18 2071.75)" fill="#85929E"/>
   </g>
   <g id="777">
   <rect id="2335_rectangle_1375" x="1632.75" y="2085.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1632.75 2085.14)" fill="#85929E"/>
   </g>
   <g id="776">
   <rect id="2335_rectangle_1376" x="1609.31" y="2098.54" width="25.0361" height="51.6308" transform="rotate(-30.0029 1609.31 2098.54)" fill="#85929E"/>
   </g>
   <g id="775">
   <rect id="2335_rectangle_1377" x="1586.51" y="2111.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1586.51 2111.57)" fill="#85929E"/>
   </g>
   <g id="774">
   <rect id="2335_rectangle_1378" x="1563.31" y="2124.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1563.31 2124.84)" fill="#85929E"/>
   </g>
   <g id="773">
   <rect id="2335_rectangle_1379" x="1539.87" y="2138.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 1539.87 2138.23)" fill="#85929E"/>
   </g>
   <g id="772">
   <rect id="2335_rectangle_1380" x="1516.43" y="2151.63" width="25.0361" height="51.6308" transform="rotate(-30.0029 1516.43 2151.63)" fill="#85929E"/>
   </g>
   <g id="771">
   <rect id="2335_rectangle_1381" x="1493" y="2165.03" width="25.0361" height="51.6308" transform="rotate(-30.0029 1493 2165.03)" fill="#85929E"/>
   </g>
   <g id="770">
   <rect id="2335_rectangle_1382" x="1469.56" y="2178.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 1469.56 2178.42)" fill="#85929E"/>
   </g>
   <g id="769">
   <rect id="2335_rectangle_1383" x="1446.12" y="2191.82" width="25.0361" height="51.6308" transform="rotate(-30.0029 1446.12 2191.82)" fill="#85929E"/>
   </g>
   <g id="768">
   <rect id="2335_rectangle_1384" x="1422.69" y="2205.22" width="25.0361" height="51.6308" transform="rotate(-30.0029 1422.69 2205.22)" fill="#85929E"/>
   </g>
   <g id="767">
   <rect id="2335_rectangle_1385" x="1400.12" y="2218.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1400.12 2218.12)" fill="#85929E"/>
   </g>
   <g id="766">
   <rect id="2335_rectangle_1386" x="1377.55" y="2231.02" width="25.0361" height="51.6308" transform="rotate(-30.0029 1377.55 2231.02)" fill="#85929E"/>
   </g>
   <g id="765">
   <rect id="2335_rectangle_1387" x="1354.11" y="2244.42" width="25.0361" height="51.6308" transform="rotate(-30.0029 1354.11 2244.42)" fill="#85929E"/>
   </g>
   <g id="764">
   <rect id="2335_rectangle_1388" x="1769.03" y="1945.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1769.03 1945.05)" fill="#85929E"/>
   </g>
   <g id="763">
   <rect id="2335_rectangle_1389" x="1745.6" y="1958.45" width="25.0361" height="51.6308" transform="rotate(-30.0029 1745.6 1958.45)" fill="#85929E"/>
   </g>
   <g id="762">
   <rect id="2335_rectangle_1390" x="1722.16" y="1971.84" width="25.0361" height="51.6308" transform="rotate(-30.0029 1722.16 1971.84)" fill="#85929E"/>
   </g>
   <g id="761">
   <rect id="2335_rectangle_1391" x="1699.59" y="1984.74" width="25.0361" height="51.6308" transform="rotate(-30.0029 1699.59 1984.74)" fill="#85929E"/>
   </g>
   <g id="760">
   <rect id="2335_rectangle_1392" x="1676.16" y="1998.14" width="25.0361" height="51.6308" transform="rotate(-30.0029 1676.16 1998.14)" fill="#85929E"/>
   </g>
   <g id="759">
   <rect id="2335_rectangle_1393" x="1653.59" y="2011.04" width="25.0361" height="51.6308" transform="rotate(-30.0029 1653.59 2011.04)" fill="#85929E"/>
   </g>
   <g id="758">
   <rect id="2335_rectangle_1394" x="1630.15" y="2024.44" width="25.0361" height="51.6308" transform="rotate(-30.0029 1630.15 2024.44)" fill="#85929E"/>
   </g>
   <g id="757">
   <rect id="2335_rectangle_1395" x="1606.71" y="2037.83" width="25.0361" height="51.6308" transform="rotate(-30.0029 1606.71 2037.83)" fill="#85929E"/>
   </g>
   <g id="756">
   <rect id="2335_rectangle_1396" x="1583.28" y="2051.23" width="25.0361" height="51.6308" transform="rotate(-30.0029 1583.28 2051.23)" fill="#85929E"/>
   </g>
   <g id="755">
   <rect id="2335_rectangle_1397" x="1560.48" y="2064.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1560.48 2064.26)" fill="#85929E"/>
   </g>
   <g id="754">
   <rect id="2335_rectangle_1398" x="1537.27" y="2077.53" width="25.0361" height="51.6308" transform="rotate(-30.0029 1537.27 2077.53)" fill="#85929E"/>
   </g>
   <g id="753">
   <rect id="2335_rectangle_1399" x="1513.84" y="2090.92" width="25.0361" height="51.6308" transform="rotate(-30.0029 1513.84 2090.92)" fill="#85929E"/>
   </g>
   <g id="752">
   <rect id="2335_rectangle_1400" x="1490.4" y="2104.32" width="25.0361" height="51.6308" transform="rotate(-30.0029 1490.4 2104.32)" fill="#85929E"/>
   </g>
   <g id="751">
   <rect id="2335_rectangle_1401" x="1466.96" y="2117.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1466.96 2117.72)" fill="#85929E"/>
   </g>
   <g id="750">
   <rect id="2335_rectangle_1402" x="1443.53" y="2131.12" width="25.0361" height="51.6308" transform="rotate(-30.0029 1443.53 2131.12)" fill="#85929E"/>
   </g>
   <g id="749">
   <rect id="2335_rectangle_1403" x="1420.09" y="2144.51" width="25.0361" height="51.6308" transform="rotate(-30.0029 1420.09 2144.51)" fill="#85929E"/>
   </g>
   <g id="748">
   <rect id="2335_rectangle_1404" x="1396.65" y="2157.91" width="25.0361" height="51.6308" transform="rotate(-30.0029 1396.65 2157.91)" fill="#85929E"/>
   </g>
   <g id="747">
   <rect id="2335_rectangle_1405" x="1374.08" y="2170.81" width="25.0361" height="51.6308" transform="rotate(-30.0029 1374.08 2170.81)" fill="#85929E"/>
   </g>
   <g id="746">
   <rect id="2335_rectangle_1406" x="1351.52" y="2183.71" width="25.0361" height="51.6308" transform="rotate(-30.0029 1351.52 2183.71)" fill="#85929E"/>
   </g>
   <g id="745">
   <rect id="2335_rectangle_1407" x="1328.08" y="2197.11" width="25.0361" height="51.6308" transform="rotate(-30.0029 1328.08 2197.11)" fill="#85929E"/>
   </g>
   <g id="744">
   <rect id="2335_rectangle_1408" x="1715.78" y="1854.5" width="25.0361" height="51.6308" transform="rotate(-30.0029 1715.78 1854.5)" fill="#85929E"/>
   </g>
   <g id="743">
   <rect id="2335_rectangle_1409" x="1692.35" y="1867.9" width="25.0361" height="51.6308" transform="rotate(-30.0029 1692.35 1867.9)" fill="#85929E"/>
   </g>
   <g id="742">
   <rect id="2335_rectangle_1410" x="1668.91" y="1881.3" width="25.0361" height="51.6308" transform="rotate(-30.0029 1668.91 1881.3)" fill="#85929E"/>
   </g>
   <g id="741">
   <rect id="2335_rectangle_1411" x="1646.34" y="1894.2" width="25.0361" height="51.6308" transform="rotate(-30.0029 1646.34 1894.2)" fill="#85929E"/>
   </g>
   <g id="740">
   <rect id="2335_rectangle_1412" x="1622.9" y="1907.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 1622.9 1907.59)" fill="#85929E"/>
   </g>
   <g id="739">
   <rect id="2335_rectangle_1413" x="1600.34" y="1920.49" width="25.0361" height="51.6308" transform="rotate(-30.0029 1600.34 1920.49)" fill="#85929E"/>
   </g>
   <g id="738">
   <rect id="2335_rectangle_1414" x="1576.9" y="1933.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1576.9 1933.89)" fill="#85929E"/>
   </g>
   <g id="737">
   <rect id="2335_rectangle_1415" x="1553.46" y="1947.29" width="25.0361" height="51.6308" transform="rotate(-30.0029 1553.46 1947.29)" fill="#85929E"/>
   </g>
   <g id="736">
   <rect id="2335_rectangle_1416" x="1530.03" y="1960.69" width="25.0361" height="51.6308" transform="rotate(-30.0029 1530.03 1960.69)" fill="#85929E"/>
   </g>
   <g id="735">
   <rect id="2335_rectangle_1417" x="1507.23" y="1973.72" width="25.0361" height="51.6308" transform="rotate(-30.0029 1507.23 1973.72)" fill="#85929E"/>
   </g>
   <g id="734">
   <rect id="2335_rectangle_1418" x="1484.02" y="1986.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 1484.02 1986.98)" fill="#85929E"/>
   </g>
   <g id="733">
   <rect id="2335_rectangle_1419" x="1460.59" y="2000.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1460.59 2000.38)" fill="#85929E"/>
   </g>
   <g id="732">
   <rect id="2335_rectangle_1420" x="1437.15" y="2013.78" width="25.0361" height="51.6308" transform="rotate(-30.0029 1437.15 2013.78)" fill="#85929E"/>
   </g>
   <g id="731">
   <rect id="2335_rectangle_1421" x="1413.71" y="2027.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1413.71 2027.17)" fill="#85929E"/>
   </g>
   <g id="730">
   <rect id="2335_rectangle_1422" x="1390.28" y="2040.57" width="25.0361" height="51.6308" transform="rotate(-30.0029 1390.28 2040.57)" fill="#85929E"/>
   </g>
   <g id="729">
   <rect id="2335_rectangle_1423" x="1366.84" y="2053.97" width="25.0361" height="51.6308" transform="rotate(-30.0029 1366.84 2053.97)" fill="#85929E"/>
   </g>
   <g id="728">
   <rect id="2335_rectangle_1424" x="1343.4" y="2067.36" width="25.0361" height="51.6308" transform="rotate(-30.0029 1343.4 2067.36)" fill="#85929E"/>
   </g>
   <g id="727">
   <rect id="2335_rectangle_1425" x="1320.83" y="2080.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1320.83 2080.26)" fill="#85929E"/>
   </g>
   <g id="726">
   <rect id="2335_rectangle_1426" x="1298.27" y="2093.17" width="25.0361" height="51.6308" transform="rotate(-30.0029 1298.27 2093.17)" fill="#85929E"/>
   </g>
   <g id="725">
   <rect id="2335_rectangle_1427" x="1274.83" y="2106.56" width="25.0361" height="51.6308" transform="rotate(-30.0029 1274.83 2106.56)" fill="#85929E"/>
   </g>
   <g id="724">
   <rect id="2335_rectangle_1428" x="1689.75" y="1807.19" width="25.0361" height="51.6308" transform="rotate(-30.0029 1689.75 1807.19)" fill="#85929E"/>
   </g>
   <g id="723">
   <rect id="2335_rectangle_1429" x="1666.31" y="1820.59" width="25.0361" height="51.6308" transform="rotate(-30.0029 1666.31 1820.59)" fill="#85929E"/>
   </g>
   <g id="722">
   <rect id="2335_rectangle_1430" x="1642.88" y="1833.99" width="25.0361" height="51.6308" transform="rotate(-30.0029 1642.88 1833.99)" fill="#85929E"/>
   </g>
   <g id="721">
   <rect id="2335_rectangle_1431" x="1620.31" y="1846.89" width="25.0361" height="51.6308" transform="rotate(-30.0029 1620.31 1846.89)" fill="#85929E"/>
   </g>
   <g id="720">
   <rect id="2335_rectangle_1432" x="1596.87" y="1860.28" width="25.0361" height="51.6308" transform="rotate(-30.0029 1596.87 1860.28)" fill="#85929E"/>
   </g>
   <g id="719">
   <rect id="2335_rectangle_1433" x="1574.3" y="1873.18" width="25.0361" height="51.6308" transform="rotate(-30.0029 1574.3 1873.18)" fill="#85929E"/>
   </g>
   <g id="718">
   <rect id="2335_rectangle_1434" x="1550.87" y="1886.58" width="25.0361" height="51.6308" transform="rotate(-30.0029 1550.87 1886.58)" fill="#85929E"/>
   </g>
   <g id="717">
   <rect id="2335_rectangle_1435" x="1527.43" y="1899.98" width="25.0361" height="51.6308" transform="rotate(-30.0029 1527.43 1899.98)" fill="#85929E"/>
   </g>
   <g id="716">
   <rect id="2335_rectangle_1436" x="1503.99" y="1913.38" width="25.0361" height="51.6308" transform="rotate(-30.0029 1503.99 1913.38)" fill="#85929E"/>
   </g>
   <g id="715">
   <rect id="2335_rectangle_1437" x="1481.19" y="1926.41" width="25.0361" height="51.6308" transform="rotate(-30.0029 1481.19 1926.41)" fill="#85929E"/>
   </g>
   <g id="714">
   <rect id="2335_rectangle_1438" x="1457.99" y="1939.67" width="25.0361" height="51.6308" transform="rotate(-30.0029 1457.99 1939.67)" fill="#85929E"/>
   </g>
   <g id="713">
   <rect id="2335_rectangle_1439" x="1434.55" y="1953.07" width="25.0361" height="51.6308" transform="rotate(-30.0029 1434.55 1953.07)" fill="#85929E"/>
   </g>
   <g id="712">
   <rect id="2335_rectangle_1440" x="1411.12" y="1966.47" width="25.0361" height="51.6308" transform="rotate(-30.0029 1411.12 1966.47)" fill="#85929E"/>
   </g>
   <g id="711">
   <rect id="2335_rectangle_1441" x="1387.68" y="1979.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1387.68 1979.86)" fill="#85929E"/>
   </g>
   <g id="710">
   <rect id="2335_rectangle_1442" x="1364.24" y="1993.26" width="25.0361" height="51.6308" transform="rotate(-30.0029 1364.24 1993.26)" fill="#85929E"/>
   </g>
   <g id="709">
   <rect id="2335_rectangle_1443" x="1340.81" y="2006.66" width="25.0361" height="51.6308" transform="rotate(-30.0029 1340.81 2006.66)" fill="#85929E"/>
   </g>
   <g id="708">
   <rect id="2335_rectangle_1444" x="1317.37" y="2020.05" width="25.0361" height="51.6308" transform="rotate(-30.0029 1317.37 2020.05)" fill="#85929E"/>
   </g>
   <g id="707">
   <rect id="2335_rectangle_1445" x="1294.8" y="2032.95" width="25.0361" height="51.6308" transform="rotate(-30.0029 1294.8 2032.95)" fill="#85929E"/>
   </g>
   <g id="706">
   <rect id="2335_rectangle_1446" x="1272.23" y="2045.86" width="25.0361" height="51.6308" transform="rotate(-30.0029 1272.23 2045.86)" fill="#85929E"/>
   </g>
   <g id="705">
   <rect id="2335_rectangle_1447" x="1248.8" y="2059.25" width="25.0361" height="51.6308" transform="rotate(-30.0029 1248.8 2059.25)" fill="#85929E"/>
   </g>
   </g>
   </g>
   <g id="Extras_2">
   <path id="Vector 24" d="M564.414 826.226C550.973 825.861 553.671 816.729 556.701 812.208L945.693 586.741C961.797 581.989 959.78 594.018 956.758 600.627L564.414 826.226Z" fill="#FFF1E4" stroke="grey" stroke-width="3" stroke-dasharray="20 20"/>
   <path id="Vector 20" d="M1124.11 3102.54C1146.47 3147.31 1166.38 3154.81 1173.54 3152.96L1067.53 3211.29L57.373 1485.49L59.6888 1249.09L253.402 1576.23C262.836 1606.65 293.026 1601.22 306.942 1594.7L347.243 1572.53L371.831 1617.21C368.691 1617.03 356.235 1621.23 331.53 1639.39C306.824 1657.55 307.719 1674.94 311.254 1681.36C572.893 2136.43 1101.76 3057.77 1124.11 3102.54Z" fill="#82E0AA " stroke="grey" stroke-width="3" stroke-dasharray="20 20"/>
   <g id="Group 31">
   <path id="Vector 21" d="M532.779 827.655L65.8567 1097.15L62.0833 1069.55L1413.31 287.194C1469.24 271.024 1490.74 298.612 1494.49 314.427L1857.54 957.58L2370.14 1687.93L2748.02 2134.02C2785.76 2178.54 2759.41 2216.59 2741.51 2230.05C2239.41 2519.28 1234.06 3098.95 1229.41 3103.78C1224.77 3108.62 1224.17 3116.37 1224.44 3119.65L1199.48 3133.39C1192.25 3122.75 1169.99 3134.77 1159.76 3142.11L1143.33 3122.62L1162.95 3109.54C1176.96 3105.94 1177.14 3092.79 1175.48 3086.67L63.2429 1167.07L65.2033 1114.63L1202.82 3087.6C1202.82 3087.6 2659.06 2250.31 2713.69 2216.83C2757.39 2190.04 2740.75 2161.61 2726.97 2150.74L2349.12 1699.5L1834.32 970.356C1718.56 766.207 1483.88 351.769 1471.28 327.203C1458.67 302.636 1435.89 305.772 1426.08 310.411C1282.61 392.973 993.967 559.15 987.151 563.357C980.334 567.565 982.75 574.72 984.81 577.772L1236.31 1014.07C1246.48 1026.74 1236.27 1035.78 1229.9 1038.72C1103.23 1112.41 846.267 1261.69 831.706 1269.25C817.145 1276.8 808.566 1266.95 806.097 1261.08L691.993 1063.06L707.763 1054.38L822.305 1252.16L1220.98 1022.51L987.098 624.452C983.66 609.907 973.192 612.319 968.389 615.343L554.909 855.426L532.779 827.655Z" fill="#82E0AA " stroke="grey" stroke-width="3" stroke-dasharray="20 20"/>
   <g id="Vector 19">
   <path d="M58.082 901.845L1594.83 45.9387L2048.92 835.883L2551.45 1548.95L2834.62 1886.21L2835.81 2194.31L2802.08 2212.87C2814.7 2183.55 2796.94 2137.51 2786.48 2118.16L2388.05 1638.86L1884.65 926.277C1777.72 730.582 1554.62 326.936 1517.59 277.911C1480.57 228.886 1420.53 237.728 1395.14 248.277C1287.52 311.3 1065.55 441.057 1038.56 455.906C1011.58 470.755 1015 497.787 1020.08 509.447L1043.22 551.5L999.419 575.606L973.212 535.24C957.768 511.322 932.953 514.971 922.476 519.785C808.48 587.46 572.441 726.44 540.251 740.957C508.062 755.474 508.52 785.622 512.772 798.881L537.36 843.563L491.802 868.632C490.494 863.835 483.219 848.472 464.586 825.397C445.953 802.321 423.116 808.458 414.026 814.411L60.0345 1019.48L58.082 901.845Z" fill="#82E0AA "/>
   <path d="M2174.44 2509.74L2129.32 2534.56L2154.94 2588.38L2207.18 2556.78L2174.44 2509.74Z" fill="#82E0AA "/>
   <path d="M1669.01 2801.56C1669.96 2807.43 1690.19 2835.56 1700.19 2848.89L1649.82 2876.61C1652.92 2868.97 1633.34 2839.07 1623.17 2825.07C1638.06 2814.79 1668.06 2795.69 1669.01 2801.56Z" fill="#82E0AA "/>
   <path d="M58.082 901.845L1594.83 45.9387L2048.92 835.883L2551.45 1548.95L2834.62 1886.21L2835.81 2194.31L2802.08 2212.87C2814.7 2183.55 2796.94 2137.51 2786.48 2118.16L2388.05 1638.86L1884.65 926.277C1777.72 730.582 1554.62 326.936 1517.59 277.911C1480.57 228.886 1420.53 237.728 1395.14 248.277C1287.52 311.3 1065.55 441.057 1038.56 455.906C1011.58 470.755 1015 497.787 1020.08 509.447L1043.22 551.5L999.419 575.606L973.212 535.24C957.768 511.322 932.953 514.971 922.476 519.785C808.48 587.46 572.441 726.44 540.251 740.957C508.062 755.474 508.52 785.622 512.772 798.881L537.36 843.563L491.802 868.632C490.494 863.835 483.219 848.472 464.586 825.397C445.953 802.321 423.116 808.458 414.026 814.411L60.0345 1019.48L58.082 901.845Z" stroke="grey" stroke-width="3" stroke-dasharray="20 20"/>
   <path d="M2174.44 2509.74L2129.32 2534.56L2154.94 2588.38L2207.18 2556.78L2174.44 2509.74Z" stroke="grey" stroke-width="3" stroke-dasharray="20 20"/>
   <path d="M1669.01 2801.56C1669.96 2807.43 1690.19 2835.56 1700.19 2848.89L1649.82 2876.61C1652.92 2868.97 1633.34 2839.07 1623.17 2825.07C1638.06 2814.79 1668.06 2795.69 1669.01 2801.56Z" stroke="grey" stroke-width="3" stroke-dasharray="20 20"/>
   </g>
   </g>
   </g>
   </g>
   <defs>
   <clipPath id="clip0_0_1">
   <rect width="2898" height="3301" fill="white"/>
   </clipPath>
   </defs>
   </svg>
   
   <Moveable
   target={targetRef}
   {draggable}
   {throttleDrag}
   {edgeDraggable}
   {startDragRotate}
   {throttleDragRotate}
   on:drag={({ detail: e }) => {
      e.target.style.transform = e.transform;
   }}
/>
</div>
</div>
<style>
   .button-container{
   position: absolute;
   top: 30px;
   right: 50px;
   z-index:354;
}
.zoomButton {
  appearance: none;
  font-size:3rem;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  position: relative;
  height:36px;
  width:40px;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.zoomButton:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.zoomButton:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.zoomButton:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.zoomButton:focus {
  outline: 1px transparent;
}

.zoomButton:before {
  display: none;
}

.zoomButton:-webkit-details-marker {
  display: none;
}
      .area-name{
         padding:10px;
      border-radius:10px;
         z-index:1000;
      background:var(--primary-color);
      opacity : 0.8;
      position:absolute;
      top:10px;
      left:20px;
      color:var(--background-color);
      font-weight:bold;
      font-size:1.2rem;
   }
   .map-container {
      height: 100vh;
      width: 100vw;
      background:#FFF1E4;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
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
      max-width: 600px;
      width: 90%;
      border-radius: 8px;
   }

   .modal-close {
      cursor: pointer;
      text-align: right;
      color: #888;
   }

   .modal-body {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
   }

   .modal-info {
      margin-bottom: 8px;
   }
</style>
