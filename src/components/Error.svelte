<div class="cielo" />
<div class="mesa" />
<div class="cuerda-cuadro" />
<div class="cuerda-cuadro-interno" />
<div class="cuerpo-clavo" />
<div class="clavo" />
<div class="sombra-clavo" />
<div class="cuadro">ERROR!<br /> contact me:<br /> 99378809 <br />taivnaaiwnl@spacehub.mn</div>

<style>
   .cielo {
      width: 100%;
      height: 70vh;
      background-color: #24b595;
   }
   .mesa {
      display: flex;
      justify-content: space-evenly;
      position: relative;
      width: 100%;
      height: 30vh;
      background-color: var(--primary-color);
   }
   .clavo {
      position: absolute;
      top: 20px;
      width: 15px;
      height: 20px;
      left: 52%;
      background-color: #86a3b8;
      border-radius: 50%;
      border: 2px solid black;
      transform: translateX(-50px) rotate(-15deg);
   }
   .sombra-clavo {
      position: absolute;
      top: 20px;
      width: 15px;
      height: 20px;
      left: 52%;
      background-color: #86a3b8;
      border-radius: 50%;
      transform: translateX(-50px) rotate(-15deg);
   }
   .cuerpo-clavo {
      position: absolute;
      top: 30px;
      width: 10px;
      height: 20px;
      left: 52%;
      background-color: #86a3b8;
      border-right: 4px solid black;
      border-bottom-left-radius: 50% 100%;
      border-bottom-right-radius: 50% 100%;
      transform: translateX(-60px) rotate(45deg);
   }
   .cuerda-cuadro {
      position: absolute;
      top: 38px;
      left: 52%;
      width: 0px;
      height: 0px;
      border-bottom: 80px solid #665a48;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      transform: translateX(-150px) rotate(-15deg);
      animation: valanceocuerda 5s infinite;
   }
   @keyframes valanceocuerda {
      0% {
         transform: translateX(-150px) rotate(-15deg);
      }
      50% {
         transform: translateX(-170px) rotate(15deg);
      }
      100% {
         transform: translateX(-150px) rotate(-15deg);
      }
   }

   .cuerda-cuadro-interno {
      position: absolute;
      top: 42px;
      left: 52%;
      width: 0px;
      height: 0px;
      border-bottom: 80px solid #24b595;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      transform: translateX(-149px) rotate(-15deg);
      animation: valanceocuerda 5s infinite;
   }
   .cuadro {
      position: absolute;
      top: 145px;
      left: 50%;
      width: 320px;
      height: 200px;
      background-color: #ecf2ff;
      border: 18px solid #aa8b56;
      border-radius: 20px;
      outline: 4px solid #665a48;
      color: red;
      vertical-align: middle;
      font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: valanceo 5s infinite;
   }
   @keyframes valanceo {
      0% {
         transform: rotate(-15deg) translateX(calc(50% - 330px)) translateY(-80px);
      }
      50% {
         transform: rotate(15deg) translateX(calc(50% - 460px)) translateY(35px);
      }
      100% {
         transform: rotate(-15deg) translateX(calc(50% - 330px)) translateY(-80px);
      }
   }
</style>
