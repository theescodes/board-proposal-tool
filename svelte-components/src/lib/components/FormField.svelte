<svelte:options customElement={{ tag: 'bp-form-field', shadow: 'none' }} />

<script lang="ts">
  let {
    label = '',
    fieldType = 'text',
    fieldName = '',
    value = '',
    placeholder = '',
    required = false,
    options = '[]',
    error = ''
  } = $props();

  let wrapper: HTMLDivElement;

  function dispatch(name: string, detail: any) {
    wrapper?.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    dispatch('field-change', { name: fieldName, value: target.value });
  }

  let parsedOptions: { value: string; label: string }[] = $derived(
    (() => {
      try { return JSON.parse(options); }
      catch { return []; }
    })()
  );
</script>

<div bind:this={wrapper} class="mb-4">
  {#if label}
    <label class="block text-sm font-medium text-gray-700 mb-1" for={fieldName}>
      {label}
      {#if required}<span class="text-danger">*</span>{/if}
    </label>
  {/if}

  {#if fieldType === 'textarea'}
    <textarea
      id={fieldName}
      name={fieldName}
      {placeholder}
      {required}
      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors min-h-[100px] resize-y"
      class:border-danger={!!error}
      oninput={handleInput}
    >{value}</textarea>
  {:else if fieldType === 'select'}
    <select
      id={fieldName}
      name={fieldName}
      {required}
      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors bg-white"
      class:border-danger={!!error}
      onchange={handleInput}
    >
      <option value="" disabled selected>{placeholder || 'Select...'}</option>
      {#each parsedOptions as opt}
        <option value={opt.value} selected={opt.value === value}>{opt.label}</option>
      {/each}
    </select>
  {:else}
    <input
      type={fieldType}
      id={fieldName}
      name={fieldName}
      {value}
      {placeholder}
      {required}
      class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
      class:border-danger={!!error}
      oninput={handleInput}
    />
  {/if}

  {#if error}
    <p class="mt-1 text-xs text-danger">{error}</p>
  {/if}
</div>
