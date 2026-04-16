<svelte:options customElement={{ tag: 'bp-proposal-form', shadow: 'none' }} />

<script lang="ts">
  let { mode = 'create', initialData = '{}' } = $props();
  let wrapper: HTMLDivElement;

  let formData = $state({
    title: '',
    department: '',
    priority: 'medium' as string,
    category: '',
    summary: '',
    detailedDescription: '',
    financialImpact: '',
    riskAssessment: ''
  });

  // Parse initial data on mount
  $effect(() => {
    try {
      const parsed = JSON.parse(initialData);
      if (parsed && typeof parsed === 'object') {
        formData = { ...formData, ...parsed };
      }
    } catch { /* ignore parse errors */ }
  });

  const departmentOptions = JSON.stringify([
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'legal', label: 'Legal' },
    { value: 'product', label: 'Product' },
    { value: 'sales', label: 'Sales' }
  ]);

  const categoryOptions = JSON.stringify([
    { value: 'budget', label: 'Budget Request', icon: '💰' },
    { value: 'strategy', label: 'Strategic Initiative', icon: '🎯' },
    { value: 'policy', label: 'Policy Change', icon: '📋' },
    { value: 'hiring', label: 'Hiring Request', icon: '👥' },
    { value: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'research', label: 'Research & Development', icon: '🔬' },
    { value: 'other', label: 'Other', icon: '📌' }
  ]);

  function dispatch(name: string, detail: any) {
    wrapper?.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  function emitFieldChange() {
    dispatch('proposal-field-change', { ...formData });
  }

  function handleFieldChange(e: CustomEvent) {
    const { name, value } = e.detail;
    (formData as any)[name] = value;
    emitFieldChange();
  }

  function handlePriorityChange(e: CustomEvent) {
    formData.priority = e.detail.value;
    emitFieldChange();
  }

  function handleCategoryChange(e: CustomEvent) {
    formData.category = e.detail.value;
    emitFieldChange();
  }

  function handleDescriptionChange(e: CustomEvent) {
    formData.detailedDescription = e.detail.value;
    emitFieldChange();
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    dispatch('proposal-submit', { ...formData });
  }

  function handleSaveDraft() {
    dispatch('proposal-save-draft', { ...formData });
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div bind:this={wrapper}>
  <form
    class="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    onsubmit={handleSubmit}
  >
    <div class="border-b border-gray-200 pb-4">
      <h2 class="text-lg font-semibold text-gray-900">
        {mode === 'edit' ? 'Edit Proposal' : 'New Board Proposal'}
      </h2>
      <p class="text-sm text-gray-500 mt-1">Fill in the details below to submit your proposal for board review.</p>
    </div>

    <!-- Title -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onfield-change={handleFieldChange}>
      <bp-form-field
        label="Proposal Title"
        fieldType="text"
        fieldName="title"
        value={formData.title}
        placeholder="Enter a clear, concise title for your proposal"
        required={true}
      ></bp-form-field>
    </div>

    <!-- Department & Priority row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div onfield-change={handleFieldChange}>
        <bp-form-field
          label="Department"
          fieldType="select"
          fieldName="department"
          value={formData.department}
          placeholder="Select department"
          required={true}
          options={departmentOptions}
        ></bp-form-field>
      </div>

      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div onpriority-change={handlePriorityChange}>
        <bp-priority-selector value={formData.priority}></bp-priority-selector>
      </div>
    </div>

    <!-- Category -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div oncategory-change={handleCategoryChange}>
      <bp-category-selector
        value={formData.category}
        categories={categoryOptions}
      ></bp-category-selector>
    </div>

    <!-- Summary -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onfield-change={handleFieldChange}>
      <bp-form-field
        label="Executive Summary"
        fieldType="textarea"
        fieldName="summary"
        value={formData.summary}
        placeholder="Provide a brief summary of your proposal (2-3 sentences)"
        required={true}
      ></bp-form-field>
    </div>

    <!-- Detailed Description -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div oncontent-change={handleDescriptionChange}>
      <bp-rich-text-editor
        label="Detailed Description"
        value={formData.detailedDescription}
        placeholder="Provide a comprehensive description of your proposal, including goals, methodology, and expected outcomes..."
      ></bp-rich-text-editor>
    </div>

    <!-- Financial Impact -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onfield-change={handleFieldChange}>
      <bp-form-field
        label="Financial Impact"
        fieldType="textarea"
        fieldName="financialImpact"
        value={formData.financialImpact}
        placeholder="Describe the financial implications, including estimated costs, expected ROI, and budget requirements"
      ></bp-form-field>
    </div>

    <!-- Risk Assessment -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onfield-change={handleFieldChange}>
      <bp-form-field
        label="Risk Assessment"
        fieldType="textarea"
        fieldName="riskAssessment"
        value={formData.riskAssessment}
        placeholder="Identify potential risks and proposed mitigation strategies"
      ></bp-form-field>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        onclick={handleSaveDraft}
      >
        Save as Draft
      </button>
      <button
        type="submit"
        class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
      >
        Submit Proposal
      </button>
    </div>
  </form>
</div>
