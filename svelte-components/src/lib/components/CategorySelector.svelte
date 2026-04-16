<svelte:options customElement={{ tag: 'bp-category-selector', shadow: 'none' }} />

<script lang="ts">
  let { value = '', categories = '[]' } = $props();
  let wrapper: HTMLDivElement;

  let parsedCategories: { value: string; label: string; icon: string }[] = $derived(
    (() => {
      try { return JSON.parse(categories); }
      catch { return []; }
    })()
  );

  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    wrapper?.dispatchEvent(new CustomEvent('category-change', {
      detail: { value: target.value },
      bubbles: true,
      composed: true
    }));
  }
</script>

<div bind:this={wrapper} class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-1" for="category">Category</label>
  <select
    id="category"
    name="category"
    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors bg-white"
    onchange={handleChange}
  >
    <option value="" disabled selected>Select a category...</option>
    {#each parsedCategories as cat}
      <option value={cat.value} selected={cat.value === value}>
        {cat.icon} {cat.label}
      </option>
    {/each}
  </select>
</div>
