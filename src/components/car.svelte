<script lang="ts">
   import { onMount } from "svelte";

   let slideIndex = 1;
   const slides = [
      {
         src: "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
         text: "Caption Text",
      },
      {
         src: "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
         text: "Caption Two",
      },
      {
         src: "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
         text: "Caption Three",
      },
   ];

   function plusSlides(n: number) {
      showSlides(slideIndex + n);
   }

   function currentSlide(n: number) {
      showSlides(n);
   }

   function showSlides(n: number) {
      if (n > slides.length) {
         slideIndex = 1;
      } else if (n < 1) {
         slideIndex = slides.length;
      } else {
         slideIndex = n;
      }
   }

   onMount(() => {
      const interval = setInterval(() => {
         plusSlides(1);
      }, 2000);

      return () => clearInterval(interval);
   });
</script>

<div>
   <div class="main-container">
      <div class="slideshow-container">
         <div class="slideshow-container">
            {#each slides as slide, i (slideIndex)}
               <div class="mySlides fade" class:selected={i + 1 === slideIndex}>
                  <div class="numbertext">{i + 1} / {slides.length}</div>
                  <img src={slide.src} alt="Image1s" />
                  <div class="text">{slide.text}</div>
               </div>
            {/each}

            <a class="prev" on:click={() => plusSlides(-1)}>❮</a>
            <a class="next" on:click={() => plusSlides(1)}>❯</a>
         </div>

         <br />

         <div style="text-align:center">
            {#each slides as _, i}
               <span
                  class="dot"
                  class:selected={i + 1 === slideIndex}
                  on:click={() => currentSlide(i + 1)}
               />
            {/each}
         </div>
      </div>
      <div class="second">
         <h3>Toyota</h3>
         <div class="rate-container">
            <span class="rate-icon">&#9733;</span>
            <span class="rate-icon">&#9733;</span>
            <span class="rate-icon">&#9733;</span>
            <span class="rate-icon active">&#9733;</span>
            <span class="rate-icon">&#9733;</span>
         </div>
         <form action="">
            <div id="form-container">
               <form action="">
                  <div class="list">object</div>
                  <div class="list">object</div>
                  <div class="list">object</div>
               </form>
            </div>
         </form>
      </div>
      <div class="third"><button>Order</button></div>
   </div>
</div>

<style>
   * {
      margin: 0;
      padding: 0;
   }

   .main-container {
      display: flex;
   }

   .mySlides {
      display: none;
   }

   .second {
      width: 30%;
      padding: 30px;
   }

   h3 {
      font-size: 2rem;
      margin-left: 50px;
   }

   .third {
      width: 25%;
      display: flex;
      align-items: end;
   }

   .rate-container {
      margin-left: 20px;
   }

   img {
      height: 600px;
      width: 700px;
      object-fit: cover;
      margin: 50px;
   }

   /* Slideshow container */
   .slideshow-container {
      position: relative;
      height: 100vh;
      width: 50%;
      background-color: #717171;
   }

   /* Next & previous buttons */
   .prev,
   .next {
      cursor: pointer;
      width: auto;
      padding: 16px;
      margin-top: -22px;
      color: white;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
   }

   .next {
      left: 47%;
      border-radius: 3px 0 0 3px;
   }

   .prev {
      left: 3%;
   }

   .prev:hover,
   .next:hover {
      background-color: rgba(0, 0, 0, 0.8);
   }

   .text {
      color: #f2f2f2;
      font-size: 15px;
      padding: 8px 12px;
      position: absolute;
      bottom: 8px;
      width: 100%;
      text-align: center;
   }

   .numbertext {
      color: #f2f2f2;
      font-size: 12px;
      padding: 8px 12px;
      position: absolute;
      top: 0;
   }

   .dot {
      cursor: pointer;
      height: 15px;
      width: 15px;
      margin: 0 2px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      left: -16%;
      transition: background-color 0.6s ease;
   }

   .active,
   .dot:hover {
      background-color: #717171;
   }

   /* rate style */
   .rate-container {
      display: inline-block;
      cursor: pointer;
      padding: 30px;
   }

   .rate-icon {
      color: #ddd;
      font-size: 24px;
   }

   .rate-icon:hover,
   .rate-icon.active {
      color: #ffcc00;
   }

   /* Fading animation */
   .fade {
      animation-name: fade;
      animation-duration: 1.5s;
   }

   #form-container {
      width: 50vw;
      display: grid;
      grid-template-rows: auto;
      padding: 40px;
   }

   .list {
      height: 2.5rem;
      margin: 10px;
      width: 500px;
      border-bottom: 5px rgba(140, 104, 104, 0.215) solid;
   }

   button {
      padding: 10px;
      position: relative;
      top: -100px;
      left: 50%;
   }

   @keyframes fade {
      from {
         opacity: 0.4;
      }

      to {
         opacity: 1;
      }
   }

   @media only screen and (max-width: 300px) {
      .prev,
      .next,
      .text {
         font-size: 11px;
      }
   }
</style>
