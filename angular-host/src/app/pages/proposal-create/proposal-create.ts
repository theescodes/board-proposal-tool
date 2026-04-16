import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, afterNextRender, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';
import type { ProposalFormData } from '../../models/proposal.model';

@Component({
  selector: 'app-proposal-create',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Create New Proposal</h1>
          <p class="text-sm text-gray-500 mt-1">Fill in the details below for board review</p>
        </div>
        <a routerLink="/proposals" class="text-sm text-gray-600 hover:text-gray-900 no-underline">
          &larr; Back to Proposals
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <bp-proposal-form mode="create" initial-data="{}"></bp-proposal-form>
        </div>
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>
            <bp-proposal-preview [attr.proposal-data]="previewData()"></bp-proposal-preview>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProposalCreateComponent {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private proposalService = inject(ProposalService);

  previewData = signal('{}');

  constructor() {
    afterNextRender(() => {
      this.setupEventListeners();
    });
  }

  private setupEventListeners() {
    const form = document.querySelector('bp-proposal-form');
    if (!form) return;

    form.addEventListener('proposal-submit', ((e: CustomEvent) => {
      this.ngZone.run(() => {
        const proposal = this.proposalService.submitProposal(e.detail as ProposalFormData);
        this.router.navigate(['/proposals', proposal.id]);
      });
    }) as EventListener);

    form.addEventListener('proposal-save-draft', ((e: CustomEvent) => {
      this.ngZone.run(() => {
        const proposal = this.proposalService.saveDraft(e.detail as ProposalFormData);
        this.router.navigate(['/proposals', proposal.id]);
      });
    }) as EventListener);

    form.addEventListener('proposal-field-change', ((e: CustomEvent) => {
      this.ngZone.run(() => {
        this.previewData.set(JSON.stringify(e.detail));
      });
    }) as EventListener);
  }
}
