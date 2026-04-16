<svelte:options customElement={{ tag: 'bp-file-uploader', shadow: 'none' }} />

<script lang="ts">
  let { maxFiles = '5', acceptedTypes = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx', files = '[]' } = $props();
  let wrapper: HTMLDivElement;
  let fileInput: HTMLInputElement;
  let isDragging = $state(false);

  let parsedFiles: { id: string; name: string; size: number; type: string }[] = $derived(
    (() => {
      try { return JSON.parse(files); }
      catch { return []; }
    })()
  );

  function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    const droppedFiles = Array.from(e.dataTransfer?.files || []);
    emitFiles(droppedFiles);
  }

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const selected = Array.from(target.files || []);
    emitFiles(selected);
    target.value = '';
  }

  function emitFiles(newFiles: File[]) {
    const max = parseInt(maxFiles);
    const remaining = max - parsedFiles.length;
    const filesToAdd = newFiles.slice(0, remaining);

    if (filesToAdd.length > 0) {
      wrapper?.dispatchEvent(new CustomEvent('files-added', {
        detail: { files: filesToAdd },
        bubbles: true,
        composed: true
      }));
    }
  }

  function removeFile(fileId: string) {
    wrapper?.dispatchEvent(new CustomEvent('file-removed', {
      detail: { fileId },
      bubbles: true,
      composed: true
    }));
  }
</script>

<div bind:this={wrapper} class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">Attachments</label>

  <!-- Drop zone -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
      {isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}"
    ondragover={(e) => { e.preventDefault(); isDragging = true; }}
    ondragleave={() => isDragging = false}
    ondrop={handleDrop}
    onclick={() => fileInput?.click()}
  >
    <input
      bind:this={fileInput}
      type="file"
      multiple
      accept={acceptedTypes}
      class="hidden"
      onchange={handleFileSelect}
    />
    <div class="text-gray-500">
      <p class="text-sm font-medium">Drop files here or click to browse</p>
      <p class="text-xs mt-1 text-gray-400">
        Max {maxFiles} files &middot; Accepted: {acceptedTypes}
      </p>
    </div>
  </div>

  <!-- File list -->
  {#if parsedFiles.length > 0}
    <ul class="mt-3 space-y-2">
      {#each parsedFiles as file}
        <li class="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-gray-400">📎</span>
            <span class="truncate">{file.name}</span>
            <span class="text-xs text-gray-400 whitespace-nowrap">{formatSize(file.size)}</span>
          </div>
          <button
            type="button"
            class="text-gray-400 hover:text-danger transition-colors ml-2 cursor-pointer"
            onclick={() => removeFile(file.id)}
          >
            ✕
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
