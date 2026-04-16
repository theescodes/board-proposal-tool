<svelte:options customElement={{ tag: 'bp-rich-text-editor', shadow: 'none' }} />

<script lang="ts">
  let { value = '', placeholder = 'Start typing...', label = '' } = $props();
  let wrapper: HTMLDivElement;
  let editor: HTMLDivElement;

  function execCommand(command: string, val: string | undefined = undefined) {
    document.execCommand(command, false, val);
    editor?.focus();
    emitChange();
  }

  function emitChange() {
    wrapper?.dispatchEvent(new CustomEvent('content-change', {
      detail: { value: editor?.innerHTML || '' },
      bubbles: true,
      composed: true
    }));
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain') || '';
    document.execCommand('insertText', false, text);
  }
</script>

<div bind:this={wrapper} class="mb-4">
  {#if label}
    <label class="block text-sm font-medium text-gray-700 mb-1">{label}</label>
  {/if}

  <div class="border border-gray-300 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-colors">
    <!-- Toolbar -->
    <div class="flex items-center gap-1 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
      <button type="button" onclick={() => execCommand('bold')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm font-bold cursor-pointer" title="Bold">
        B
      </button>
      <button type="button" onclick={() => execCommand('italic')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm italic cursor-pointer" title="Italic">
        I
      </button>
      <button type="button" onclick={() => execCommand('underline')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm underline cursor-pointer" title="Underline">
        U
      </button>
      <div class="w-px h-5 bg-gray-300 mx-1"></div>
      <button type="button" onclick={() => execCommand('insertUnorderedList')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm cursor-pointer" title="Bullet List">
        &bull; List
      </button>
      <button type="button" onclick={() => execCommand('insertOrderedList')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm cursor-pointer" title="Numbered List">
        1. List
      </button>
      <div class="w-px h-5 bg-gray-300 mx-1"></div>
      <button type="button" onclick={() => execCommand('formatBlock', 'h3')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm font-semibold cursor-pointer" title="Heading">
        H
      </button>
      <button type="button" onclick={() => execCommand('formatBlock', 'p')}
        class="p-1.5 rounded hover:bg-gray-200 transition-colors text-sm cursor-pointer" title="Paragraph">
        P
      </button>
    </div>

    <!-- Editor area -->
    <div
      bind:this={editor}
      contenteditable="true"
      class="min-h-[150px] px-3 py-2 text-sm focus:outline-none prose prose-sm max-w-none"
      data-placeholder={placeholder}
      oninput={emitChange}
      onpaste={handlePaste}
    >
      {@html value}
    </div>
  </div>
</div>
