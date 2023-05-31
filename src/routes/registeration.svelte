<script>
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

<div class="register-container">
  <h2>Машын бүртгэлийн хэсэг</h2>
  <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
          <label class="form-label" for="first-name"
              >Монгол улсад орж ирсэн он.</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.age}
              required
          />

          <label class="form-label" for="first-name">Үйлдвэрлэсэн сар</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.ageMonth}
              required
          />

          <label class="form-label" for="first-name">Өнгө</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.color}
              required
          />

          <label class="form-label" for="first-name">Үйлдвэрлэсэн газар</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.company}
              required
          />

          <label class="form-label" for="first-name"
              >Улсын дугаартай эсэх</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.condition}
              required
          />

          <label class="form-label" for="first-name">Хөдөлгүүрийн төрөл</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.engine}
              required
          />

          <label class="form-label" for="first-name"
              >Хөдөлгүүрийн багтаамж</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.engineCapacity}
              required
          />

          <label class="form-label" for="first-name">Холооп</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.hrop}
              required
          />

          <label class="form-label" for="first-name">Хөтлөгч</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.hutlugch}
              required
          />

          <label class="form-label" for="first-name">Жолооны хүрд</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.hvrd}
              required
          />

          <label class="form-label" for="first-name">Зогсоолын дугаар.</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.id}
              required
          />

          <label class="form-label" for="first-name"
              >Лизингээр авч болох эсэх</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.leasing}
              required
          />

          <label class="form-label" for="first-name">Үйлдвэрлэсэн он.</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.made}
              required
          />

          <label class="form-label" for="first-name"
              >Авто машины мароийг оруулна уу.</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.mark}
              required
          />

          <label class="form-label" for="first-name">Улсын дугаар</label>
          <input class="form-input" type="text" bind:value={car.number} />

          <label class="form-label" for="first-name"
              >Холбоо барих дугаар</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.phone}
              required
          />

          <label class="form-label" for="first-name"
              >Хэдэн морьны хүчин чадалтай эсэх</label
          >
          <input
              class="form-input"
              type="text"
              bind:value={car.power}
              required
          />

          <label class="form-label" for="first-name">Туулсан зам</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.roadTraveled}
              required
          />

          <label class="form-label" for="first-name">Ангилал</label>
          <input
              class="form-input"
              type="text"
              bind:value={car.type}
              required
          />

          <button class="form-button" type="submit">Register</button>
    <button id="remove">Remove Register Form</button>
      </div>
  </form>
</div>