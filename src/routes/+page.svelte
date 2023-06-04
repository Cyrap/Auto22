<script lang="ts">
    // Машиний үндсэн мэдээлэл хадгалах object
    var car: {
        mark: string; //toyota
        age: number; // orj irsen on
        color: string; //ongo
        id: number; // zogsooliin dugaar
        roadTraveled: number; // gvilt
        power: number; // HPs
        leasing: boolean; //lizingtei eseh
        hutlugch: string; // hotlogchiin utga
        engine: string; // mototiin torol hybrid eswel torol
        type: string; // torol a b c
        company: string; // vildwerlesen gazar
        made: number; // vildwerlesen on
        hvrd: string; // zow buruu
        engineCapacity: number; // hodolgvvriin bagtaamj
        hrop: string; // hrop
        phone: number; // holbiogdoh duugaar
        ageMonth: number; //vildwerlesen sar
        condition: boolean; //dugaartai dugaargvi eseh
        number: number; // dugaar
        carCategoryId: number;
    } = {
        mark: "", //toyota
        age: 0, // orj irsen on
        color: "", //ongo
        id: 0, // zogsooliin dugaar
        roadTraveled: 0, // gvilt
        power: 0, // HPs
        leasing: false, //lizingtei eseh
        hutlugch: "", // hotlogchiin utga
        engine: "", // mototiin torol hybrid eswel torol
        type: "", // torol a b c
        company: "", // vildwerlesen gazar
        made: 0, // vildwerlesen on
        hvrd: "", // zow buruu
        engineCapacity: 0, // hodolgvvriin bagtaamj
        hrop: "", // hrop
        phone: 0, // holbiogdoh duugaar
        ageMonth: 0, //vildwerlesen sar
        condition: false, //dugaartai dugaargvi eseh
        number: 0, // dugaar
        carCategoryId: 1,
    };

    //test!
    let cars2: {
        color: string;
        age: number;
        model: string; //toyota
    }[] = [];

    function addCar() {
        const newCar2 = {
            color: "Red",
            age: 3,
            model: "Sedan",
            // Add other properties as needed
        };
        cars2 = [...cars2, newCar2];
    }

    // Машинийг ангилахад хэрэглэх массив
    var carCategories = [
        {
            id: 1,
            name: "toyota",
        },
        {
            id: 2,
            name: "nissan",
        },
        {
            id: 3,
            name: "Ford",
        },
        {
            id: 3,
            name: "Chevrolet",
        },
    ];
    // hereglegchees orj irsen mashinii medeellvdig niited n hadgalah function
    let cars: {
        mark: string; //toyota
        age: number; // orj irsen on
        color: string; //ongo
        id: number; // zogsooliin dugaar
        roadTraveled: number; // gvilt
        power: number; // HPs
        leasing: boolean; //lizingtei eseh
        hutlugch: string; // hotlogchiin utga
        engine: string; // mototiin torol hybrid eswel torol
        type: string; // torol a b c
        company: string; // vildwerlesen gazar
        made: number; // vildwerlesen on
        hvrd: string; // zow buruu
        engineCapacity: number; // hodolgvvriin bagtaamj
        hrop: string; // hrop
        phone: number; // holbiogdoh duugaar
        ageMonth: number; //vildwerlesen sar
        condition: boolean; //dugaartai dugaargvi eseh
        number: number; // dugaar
        carCategoryId: number;
    }[] = [];
    function clone<T>(source: T): T {
        if (source === null || typeof source !== "object") {
            return source;
        }

        if (Array.isArray(source)) {
            return source.map((item) => clone(item)) as unknown as T;
        }

        const clonedObj = Object.create(Object.getPrototypeOf(source));

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                clonedObj[key] = clone(source[key]);
            }
        }
        return clonedObj;
    }
    var clone1 = {
        age: 21,
        name: "testClone",
    };
    function saveCar() {
        cars.push(clone(car));
        clearCar();
    }
    console.log(clone(car));
    function clearCar() {
        car = {
            mark: "", //toyota
            age: 0, // orj irsen on
            color: "", //ongo
            id: 0, // zogsooliin dugaar
            roadTraveled: 0, // gvilt
            power: 0, // HPs
            leasing: false, //lizingtei eseh
            hutlugch: "", // hotlogchiin utga
            engine: "", // mototiin torol hybrid eswel torol
            type: "", // torol a b c
            company: "", // vildwerlesen gazar
            made: 0, // vildwerlesen on
            hvrd: "", // zow buruu
            engineCapacity: 0, // hodolgvvriin bagtaamj
            hrop: "", // hrop
            phone: 0, // holbiogdoh duugaar
            ageMonth: 0, //vildwerlesen sar
            condition: false, //dugaartai dugaargvi eseh
            number: 0, // dugaar
            carCategoryId: 1,
        };
    }

    import { onMount } from "svelte";
    import { set_data_maybe_contenteditable } from "svelte/internal";

    let list: HTMLUListElement;
    onMount(() => {
        if (list) {
            for (let item of carCategories) {
                let text = document.createTextNode(item.name);
                let listItem = document.createElement("li");
                listItem.appendChild(text);
                list.appendChild(listItem);
            }
        }
    });

    // Bvrtgeliin formig hargddag bolgoh
    let isDivVisible = true;
    function hideDiv() {
        isDivVisible = false;
    }
    function showDiv() {
        isDivVisible = true;
    }
</script>

{#if isDivVisible}
    <section class="register" style="position:absolute">
        <div class="register-container">
            <h2>Машын бүртгэлийн хэсэг</h2>
            <form on:submit|preventDefault={addCar}>
                <div class="form-group">
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>
                    <div>
                        <label class="form-label" for="first-name"
                            >Монгол улсад орж ирсэн он.</label
                        >
                        <input
                            class="form-input"
                            type="text"
                            bind:value={car.age}
                            required
                        />
                    </div>

                    <button id="remove-register-form">
                        <div id="toogle">
                            <div />
                            <button on:click={hideDiv}>Remove Div</button>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    </section>
{/if}

<nav>
    <div id="nav-container">
        <div id="logo">
            <img id="logo-pic" src="../src/img/logo.png" alt="Logo" />
            <h1>Auto22.mn</h1>
        </div>
        <div id="nav-form">
            <ul>
                <li><a href="#">Түрээслэх</a></li>
                <li><a href="#">Захиалах</a></li>
                <li><a href="#">Үйлчилгээний нөхцөл</a></li>
                <li><a href="#">Нэвтрэх</a></li>
                <li>
                    <button on:click={showDiv}
                        ><a id="register" href="#">Бүртгүүлэх</a></button
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>
<section>
    <div id="section-contaier">
        <div />
        <div class="dashboard">
            <ul id="data-list" bind:this={list} />
        </div>
        <div>
            <div class="list-info">
                <!-- <ul id="car-list"></ul> -->
                <table id="carTable">
                    <thead>
                        <tr>
                            <th>Автомашины марк</th>
                            <th>Үйлдвэрлэсэн он</th>
                            <th>Өнгө</th>
                            <th>Холбогдох утас</th>
                            <th>Туулсан зам{car.age}</th>
                            <th>Хүч</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each cars2 as cars}
                            <tr>
                                <td>{car.mark}</td>
                                <td>{car.age}</td>
                                <td>{car.color}</td>
                                <td>{car.phone}</td>
                                <td>{car.roadTraveled}</td>
                                <td>{car.power}</td>
                                <!-- Add other table cells for each car object property -->
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
<footer>
    <div id="footer-container">
        <p>Спэйсхаб ХХК ©2023 БҮХ ЭРХ ХУУЛИАР ХАМГААЛАГДСАН</p>
        <ul>
            <li><a href="#">Нууцлалын бодлого</a></li>
            <li><a href="#">Үйлчилгээний нөхцөл</a></li>
        </ul>
    </div>
</footer>

<!-- <script>
    var car = {
        mark: "", //toyota
        age: "", // orj irsen on
        color: "", //ongo
        id: "", // zogsooliin dugaar
        roadTraveled: "", // gvilt
        power: "", // HPs
        leasing: "", //lizingtei eseh
        hutlugch: "", // hotlogchiin utga
        engine: "", // mototiin torol hybrid eswel torol
        type: "", // torol a b c
        company: "", // vildwerlesen gazar
        made: "", // vildwerlesen on
        hvrd: "", // zow buruu
        engineCapacity: "", // hodolgvvriin bagtaamj
        hrop: "", // hrop
        phone: "", // holbiogdoh duugaar
        ageMonth: "", //vildwerlesen sar
        condition: "", //dugaartai dugaargvi eseh
        number: "", // dugaar
    };
  
    function handleSubmit() {
        // Perform form submission or validation here
        console.log("Form submitted!");
        console.log("Mark:", car.mark);
        console.log("Age :", car.age);
        console.log("Color:", car.color);
        console.log("engine capacity:", car.engineCapacity);
    }
  </script>
  
   -->
<style>
    :root {
        --primary-color: #07847f;
        --secondary-color: #fd6b36;
        --text-color: #00172e;
        --background-color: #f5f6fa;
        --error: #ff4040;
        --disabled: #adafbb;
        --hover-color: #ddd;
    }
    body {
        background: var(--background-color);
        font-family: "Roboto", sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
    }
    a {
        color: var(--text-color);
        text-decoration: none;
    }
    h1 {
        color: var(--background-color);
    }
    #nav-container {
        z-index: 99;
        background: linear-gradient(
            90deg,
            var(--primary-color),
            rgb(4, 161, 140)
        );
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #nav-container #nav-form {
        padding-right: 10%;
    }
    #nav-container #nav-form ul {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #nav-container #nav-form ul li {
        padding: 15px 1px;
        width: 150px;
        list-style: none;
        text-align: center;
        cursor: pointer;
    }
    #nav-container #nav-form ul li a {
        color: var(--background-color);
        font-weight: bold;
    }
    #nav-container #logo {
        display: flex;
        align-items: center;
        padding-left: 10%;
        color: var(--text-color);
        cursor: pointer;
    }
    #nav-container #logo #logo-pic {
        height: 100px;
    }
    #nav-container #nav-form ul li:hover {
        background-color: var(--disabled);
        transition: 1s;
        border-radius: 3px;
    }

    /* section style */
    #section-contaier {
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100vw;
        background: var(--disabled);
    }
    .dashboard {
        border-right: #00172e solid;
        background-color: var(--background-color);
        width: 20vw;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    #section-contaier #data-list {
        list-style: none;
        background: var(--background-color);
        display: flex;
        flex-direction: column;
    }

    #section-contaier #data-list {
        padding: 0.5rem;
        margin: 1rem;
        border-bottom: 1px var(--disabled) solid;
        display: flex;
        flex-direction: row;
    }

    #section-contaier #data-list :hover {
        background: var(--hover-color);
        cursor: pointer;
    }

    .list {
        background-color: var(--background-color);
        height: 10vh;
        width: 50vw;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .list ul {
        background: var(--secondary-color);
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .list ul li {
        list-style: none;
        border: 1px solid;
        width: 100px;
        text-align: center;
        padding: 20px;
    }

    .list-info {
        background: var(--background-color);
        width: 50vw;
    }

    /* footer style */
    #footer-container {
        background: var(--text-color);
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    #footer-container p {
        color: var(--background-color);
    }

    #footer-container ul li a {
        color: var(--background-color);
    }

    #footer-container ul li {
        padding: 0 30px;
        cursor: pointer;
        list-style: none;
    }

    #footer-container ul {
        display: flex;
        height: 200px;
        align-items: center;
        justify-content: end;
        padding-right: 30px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        border: 1px solid var(--hover-color);
        padding: 8px;
    }

    th {
        background-color: var(--background-color);
    }

    tr:nth-child(even) {
        background-color: var(--background-color);
    }

    tr:hover {
        background-color: var(--hover-color);
    }

    .register {
        width: 100vw !important;
    }

    .register-container {
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: #333 url(../img/Slider-5.jpg) no-repeat center center/cover;
        color: rgb(0, 0, 0);
        position: absolute;
        width: 100vw !important;
        height: 100vh;
    }

    .form-group {
        margin-bottom: 1rem;
        display: grid;
        background: rgba(226, 228, 230, 0.913);
        padding: 10px;
        border-radius: 10px;
        grid-template-columns: repeat(2, 1fr);
        width: 70vw;
        color: rgb(0, 0, 0);
    }

    .form-group > div {
        display: flex;
        flex-direction: column;
    }

    .form-group > div input {
        background: rgba(214, 214, 214, 0.675);
        width: 70%;
        padding: 0.5rem;
        border-radius: 15px;
        height: 1rem;
        margin-top: -8%;
    }

    .form-label {
        margin-bottom: 3rem;
        font-weight: bold;
    }

    #remove-register-form {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        width: 3rem;
        font-size: 1rem;
        position: absolute;
        top: 5vh;
        left: 87%;
        background: red;
        border-radius: 50%;
        cursor: pointer;
    }

    #remove-register-form > div {
        position: absolute;
        width: 32px;
        height: 32px;
        opacity: 0.7;
    }

    #remove-register-form > div::after,
    #remove-register-form > div::before {
        position: absolute;
        left: 15px;
        content: " ";
        height: 33px;
        width: 2px;
        background-color: #ffffff;
    }

    #remove-register-form > div:after {
        transform: rotate(-45deg);
    }

    #remove-register-form > div::before {
        transform: rotate(45deg);
    }

    #remove-register-form > div:hover {
        opacity: 1;
    }
</style>
