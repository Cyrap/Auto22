<script lang="ts">
    import { onMount } from "svelte";
    export var car: {
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
    // console.log(clone(car));
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

    // Bvrtgeliin formig hargddag bolgoh
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
    import { createEventDispatcher } from "svelte";

    export let isDivVisible = false;
    const dispatch = createEventDispatcher();

    function hideDiv() {
        isDivVisible = false;
    }

    export function showDiv() {
        isDivVisible = true;
    }
</script>

<section
    class="register"
    style="position:absolute"
    class:register={isDivVisible}
    class:hidden={!isDivVisible}
>
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

                <button id="remove-register-form" on:click={hideDiv}>
                    <div id="toogle">
                        <div />
                    </div>
                </button>
            </div>
            <button class="submitButton" on:click={addCar}>Add</button>
        </form>
    </div>
</section>

<style>
    .hidden {
        display: none;
    }
    .register {
        background: #333 url(../img/Slider-5.jpg) no-repeat center center/cover;
        width: 100vw;
        z-index: 9999;
    }
    h2 {
        color: var(--background-color);
        position: absolute;
        margin-top: 20px;
    }
    .register-container {
        z-index: 999;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: rgb(0, 0, 0);
        height: 130vh;
    }

    .form-group {
        margin-bottom: 1rem;
        display: grid;
        background: rgba(226, 228, 230, 0.913);
        padding: 10px;
        border-radius: 10px;
        grid-template-columns: repeat(2, 1fr);
        width: 70vw;
        position: relative;
        top: 50px;
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
        margin-bottom: 3.3rem;
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
        left: 105%;
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
    .submitButton {
        width: 100px;
        padding: 10px 20px;
        border-radius: 60px;
        position: relative;
        top: 10%;
        left: 90%;
        background: var(--hover-color);
        color: var(--primary-color);
        cursor: pointer;
        font-weight: bold;
        font-size: 1.3rem;
    }
    .submitButton:hover {
        margin: -3px -3px;
        padding: 13px 23px;
    }
    @media screen and (min-width: 1700px) {
        .form-label {
            margin-bottom: 4rem;
            font-weight: bold;
        }
    }
</style>
