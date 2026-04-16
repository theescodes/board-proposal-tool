<svelte:options customElement={{ tag: 'bp-proposal-preview', shadow: 'none' }} />

<script lang="ts">
  let { proposalData = '{}' } = $props();

  let data: Record<string, any> = $derived(
    (() => {
      try { return JSON.parse(proposalData); }
      catch { return {}; }
    })()
  );

  const priorityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  let isEmpty = $derived(!data.title && !data.summary && !data.department);
</script>

<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
  <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
    <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Preview</h3>
  </div>

  <div class="p-4">
    {#if isEmpty}
      <p class="text-sm text-gray-400 italic text-center py-8">
        Start filling in the form to see a live preview...
      </p>
    {:else}
      <div class="space-y-4">
        <!-- Title -->
        {#if data.title}
          <h2 class="text-xl font-bold text-gray-900">{data.title}</h2>
        {/if}

        <!-- Meta row -->
        <div class="flex flex-wrap gap-2">
          {#if data.department}
            <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {data.department}
            </span>
          {/if}
          {#if data.priority}
            <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {priorityColors[data.priority] || ''}">
              {data.priority}
            </span>
          {/if}
          {#if data.category}
            <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
              {data.category}
            </span>
          {/if}
        </div>

        <!-- Summary -->
        {#if data.summary}
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Summary</h4>
            <p class="text-sm text-gray-700">{data.summary}</p>
          </div>
        {/if}

        <!-- Detailed Description -->
        {#if data.detailedDescription}
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Description</h4>
            <div class="text-sm text-gray-700 prose prose-sm max-w-none">
              {@html data.detailedDescription}
            </div>
          </div>
        {/if}

        <!-- Financial Impact -->
        {#if data.financialImpact}
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Financial Impact</h4>
            <p class="text-sm text-gray-700">{data.financialImpact}</p>
          </div>
        {/if}

        <!-- Risk Assessment -->
        {#if data.riskAssessment}
          <div>
            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-1">Risk Assessment</h4>
            <p class="text-sm text-gray-700">{data.riskAssessment}</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
