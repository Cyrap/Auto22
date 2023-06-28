<script>
   export let showOnPx = 1000;
   let hidden = true;
   function goTop() {
      document.body.scrollIntoView({
         behavior: "smooth",
      });
   }

   function scrollContainer() {
      return document.documentElement || document.body;
   }

   function handleOnScroll() {
      if (!scrollContainer()) {
         return;
      }

      if (scrollContainer().scrollTop > showOnPx) {
         hidden = false;
      } else {
         hidden = true;
      }
   }
</script>

<svelte:window on:scroll={handleOnScroll} />

<div class="back-to-top" on:click={goTop} class:hidden>↑</div>

<style>
   .back-to-top {
      transition: opacity 0.5s, visibility 0.5s, transform 0.5s;
      opacity: 1;
      transition: opacity 0.5s, visibility 0.5s;
      position: fixed;
      z-index: 99;
      right: 20px;
      user-select: none;
      bottom: 20px;
      color: white;
      opacity: 0.8;
      background-color: var(--primary-color);
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3rem;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 50%;
   }

   .back-to-top.hidden {
      opacity: 0;
      visibility: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
   }
</style>
