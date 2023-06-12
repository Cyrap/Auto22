<script>
   var cars = [
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
            <img
               src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
               alt=""
            />
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
      background-color: var(--disabled);
      height: 20vh;
      width: 70vw;
      border-bottom: 4px solid;
      height: 15rem;
      display: grid;
      grid-template-columns: 1fr 2.5fr;
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
</style>
