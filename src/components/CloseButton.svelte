<div>
   <a class="exit">
      <button id="remove-register-form">
         <div id="toogle">
            <div />
         </div>
      </button></a
   >
</div>

<style>
   .exit {
      position: absolute;
      top: 2vh;
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
      background: var(--disabled);
      border-radius: 50%;
      border: none;
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
      background-color: var(--primary-color);
   }

   #remove-register-form > div:after {
      transform: rotate(-45deg);
   }

   #remove-register-form > div::before {
      transform: rotate(45deg);
   }

   #remove-register-form > div:hover {
      opacity: 1;
      transform: rotate(150deg);
      transition: 0.5s ease-in-out;
   }
</style>
