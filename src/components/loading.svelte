<div class="logo">
   <img src="./src/img/autoLogo.png" alt="" />
</div>
<div class="center">
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
   <div class="wave" />
</div>

<style>
   .logo {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 12;
      width: 100vw;
      height: 70vh;
   }
   .logo img {
      height: 200px;
      animation: logo 2s linear infinite;
   }
   .center {
      height: 100vh;
      display: flex;
      justify-content: center;
      background: linear-gradient(var(--disabled), var(--background-color));
      position: relative;
      z-index: 11;
   }
   .wave {
      width: 5px;
      height: 10px;
      background: linear-gradient(45deg, var(--primary-color), var(--disabled));
      margin: 10px;
      animation: wave 1s linear infinite;
      border-radius: 20px;
      position: relative;
      top: 90vh;
   }
   .wave:nth-child(2) {
      animation-delay: 0.1s;
   }
   .wave:nth-child(3) {
      animation-delay: 0.2s;
   }
   .wave:nth-child(4) {
      animation-delay: 0.3s;
   }
   .wave:nth-child(5) {
      animation-delay: 0.4s;
   }
   .wave:nth-child(6) {
      animation-delay: 0.5s;
   }
   .wave:nth-child(7) {
      animation-delay: 0.6s;
   }
   .wave:nth-child(8) {
      animation-delay: 0.7s;
   }
   .wave:nth-child(9) {
      animation-delay: 0.8s;
   }
   .wave:nth-child(10) {
      animation-delay: 0.9s;
   }

   @keyframes wave {
      0% {
         transform: scale(0);
      }
      50% {
         transform: scale(1);
      }
      100% {
         transform: scale(0);
      }
   }
   @keyframes logo {
      0% {
         transform: scale(0.9);
      }
      50% {
         transform: scale(1.1);
      }
      100% {
         transform: scale(0.9);
      }
   }
</style>
