<svelte:options customElement={{ tag: 'bp-priority-selector', shadow: 'none' }} />

<script lang="ts">
  let { value = 'medium' } = $props();
  let wrapper: HTMLDivElement;

  const priorities = [
    { key: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-300', activeColor: 'bg-green-500 text-white border-green-600' },
    { key: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', activeColor: 'bg-yellow-500 text-white border-yellow-600' },
    { key: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-300', activeColor: 'bg-orange-500 text-white border-orange-600' },
    { key: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800 border-red-300', activeColor: 'bg-red-500 text-white border-red-600' }
  ];

  function select(key: string) {
    wrapper?.dispatchEvent(new CustomEvent('priority-change', {
      detail: { value: key },
      bubbles: true,
      composed: true
    }));
  }
</script>

<div bind:this={wrapper} class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
  <div class="grid grid-cols-4 gap-2">
    {#each priorities as p}
      <button
        type="button"
        class="px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 cursor-pointer {value === p.key ? p.activeColor : p.color} hover:scale-105"
        onclick={() => select(p.key)}
      >
        {p.label}
      </button>
    {/each}
  </div>
</div>
