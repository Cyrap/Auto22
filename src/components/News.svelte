<script lang="ts">
   import type { CarDto } from "car-api";
   export let posts: CarDto[] = [];
   var cars = [
      {
         mark: "sonata",
         src: "./src/img/hyundai-motor-group-a3vDd8hzuYs-unsplash.jpg",
      },
   ];
</script>

<div class="container">
   {#each cars as car}
      <div class="feed">
         <div class="car">
            {#each posts as post}
               <div class="image-wrapper">
                  <img src={car.src} alt="car" />
               </div>
               <div class="information">
                  <div class="first">
                     <h4>{car.mark}</h4>
                     <ul>
                        {#each Object.entries(post) as [key, value]}
                           <li>
                              <strong>{key}:</strong>
                              {value}
                           </li>
                        {/each}
                     </ul>
                  </div>
                  <div class="main">
                     <div class="price"><a href="/car">Price</a></div>
                     <div class="contact">Contact</div>
                  </div>
               </div>
            {/each}
         </div>
      </div>
   {/each}
</div>

<style>
   :root {
      --secondary-color: #6c757d; /* Secondary color (gray) */
      --accent-color: #ffc107; /* Accent color (yellow) */
      --text-color: #333333; /* Text color (dark gray) */
      --background-color: #ffffff; /* Background color (white) */
   }

   .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
   }

   .car {
      background-color: var(--background-color);
      width: 70vw;
      height: auto;
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
         rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
         rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
   }

   .image-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
   }

   img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
   }

   .information {
      display: grid;
      grid-template-columns: 3fr 1fr;
      padding: 1rem;
   }

   .first {
      padding-right: 1rem;
   }

   h4 {
      font-size: 2rem;
      margin-bottom: 1rem;
   }

   ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
   }

   li {
      list-style: none;
      margin-left: 1.5rem;
      display: flex;
      justify-content: space-between;
   }

   .main > div {
      padding: 0.5rem;
      border-radius: 10px;
      font-size: 1.4rem;
      text-align: center;
      margin: 0.5rem;
   }

   .contact {
      background: var(--primary-color);
      color: white;
   }

   .price {
      background: var(--secondary-color);
      color: white;
   }

   a {
      color: var(--background-color);
      text-decoration: none;
   }
</style>
