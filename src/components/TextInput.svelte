<script lang="ts">
   export let value: string = "";
</script>

<div>
   <label class="form-label"><slot name="title" /></label>
   <input class="form-input" type="text" bind:value required />
</div>

<style>
   .form-label {
      margin-bottom: 3rem;
      font-weight: bold;
   }
</style>
