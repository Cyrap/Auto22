<div class="container">
   <div class="logo">
      <div class="overlay" />
      <img src="./src/img/auto22background.jpg" alt="" />
   </div>
   <div class="parent">
      <div class="img-container">
         <img src="./src/img/autoLogo.png" alt="" />
      </div>
      <div class="about">
         <div>
            <h4>Авто худалдааны цогцолбор /22 авто худалдаа/</h4>
            <p>"Олон улсын худалдаа логистикийн төв" ХК</p>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi eum aperiam sunt beatae cum, fugit doloremque accusantium? Ipsa, numquam repellat
               fugiat, ratione nobis quibusdam aut eaque libero consequatur, impedit totam.
            </p>
         </div>
      </div>
   </div>
</div>

<style>
   .container {
      width: 100vw;
      height: 80vh;
      margin: 12vh 0;
      display: flex;
      align-items: center;
      position: relative;
   }

   .parent {
      width: 100vw;
      height: 70vh;
      display: flex;
      flex-direction: row;
   }

   .img-container {
      height: inherit;
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      object-position: center;
   }

   .logo {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      overflow: hidden;
      z-index: -1;
      filter: blur(1px);
   }

   .logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
   }

   .about {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      font-size: 1.2rem;
   }
   h4 {
      font-size: 2.5rem;
      color: rgb(52, 47, 47);
   }
   .about > div {
      width: 60%;
      padding: 50px;
      border-radius: 10px;
      background: rgba(221, 203, 203, 0.744);
   }
   p {
      color: rgb(68, 59, 59);
   }
   .overlay {
      position: absolute;
      background: #07848083;
      width: inherit;
      height: inherit;
   }
</style>
