<script>
   var cars = [
      {
         mark: "sonata",
         src: "./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg",
      },
      {
         mark: "sonata",
      },
      {
         mark: "sonata",
      },
      {
         mark: "sonata",
      },
      {
         mark: "sonata",
      },
      {
         mark: "nissan",
      },
   ];
</script>

<div class="container">
   {#each cars as car}
      <div class="feed">
         <div class="car">
            <img src={car.src} alt="car-image" />
            <div class="information">
               <div class="first">
                  <h4>{car.mark}</h4>
                  <ul>
                     <li />
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                     <p>Main informations here...</p>
                  </ul>
               </div>
               <div class="main">
                  <div class="price"><a href="/car">price</a></div>
                  <div class="contact">Утас</div>
               </div>
            </div>
         </div>
      </div>
   {/each}
</div>

<style>
   .container {
      display: flex;
      flex-direction: column;
      height: inherit;
      align-items: center;
   }
   .car {
      background-color: var(--background-color);
      height: 20vh;
      width: 70vw;
      border-bottom: 4px solid;
      height: 15rem;
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
         rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
         rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
   }
   .information {
      display: grid;
      grid-template-columns: 3fr 1fr;
   }
   .first {
      padding-left: 2rem;
   }
   h4 {
      font-size: 2rem;
      margin-left: 20px;
   }
   ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
   }
   img {
      height: 30vh;
      width: 30vw;
      object-fit: cover;
      object-position: center;
   }
   .main > div {
      position: relative;
      padding: 10px 30px;
      border-radius: 10px;
      font-size: 1.4rem;
      text-align: center;
      margin: 10px;
      width: 50px;
   }
   .contact {
      background: var(--primary-color);
   }
   .price {
      background: var(--secondary-color);
   }
   a {
      color: var(--background-color);
   }
</style>
