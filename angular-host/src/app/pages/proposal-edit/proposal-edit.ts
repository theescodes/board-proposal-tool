import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, afterNextRender, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';
import type { ProposalFormData } from '../../models/proposal.model';

@Component({
  selector: 'app-proposal-edit',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Edit Proposal</h1>
          <p class="text-sm text-gray-500 mt-1">Update the details of your proposal</p>
        </div>
        <a [routerLink]="['/proposals', proposalId]" class="text-sm text-gray-600 hover:text-gray-900 no-underline">
          &larr; Back to Proposal
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <bp-proposal-form mode="edit" [attr.initial-data]="initialData()"></bp-proposal-form>
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
export class ProposalEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private proposalService = inject(ProposalService);

  proposalId = '';
  initialData = signal('{}');
  previewData = signal('{}');

  constructor() {
    afterNextRender(() => {
      this.setupEventListeners();
    });
  }

  ngOnInit() {
    this.proposalId = this.route.snapshot.paramMap.get('id') || '';
    const proposal = this.proposalService.getProposal(this.proposalId);
    if (proposal) {
      const data = {
        title: proposal.title,
        department: proposal.department,
        priority: proposal.priority,
        category: proposal.category,
        summary: proposal.summary,
        detailedDescription: proposal.detailedDescription,
        financialImpact: proposal.financialImpact,
        riskAssessment: proposal.riskAssessment
      };
      this.initialData.set(JSON.stringify(data));
      this.previewData.set(JSON.stringify(data));
    }
  }

  private setupEventListeners() {
    const form = document.querySelector('bp-proposal-form');
    if (!form) return;

    form.addEventListener('proposal-submit', ((e: CustomEvent) => {
      this.ngZone.run(() => {
        this.proposalService.updateProposal(this.proposalId, e.detail as ProposalFormData);
        this.proposalService.updateStatus(this.proposalId, 'submitted');
        this.router.navigate(['/proposals', this.proposalId]);
      });
    }) as EventListener);

    form.addEventListener('proposal-save-draft', ((e: CustomEvent) => {
      this.ngZone.run(() => {
        this.proposalService.updateProposal(this.proposalId, e.detail as ProposalFormData);
        this.router.navigate(['/proposals', this.proposalId]);
      });
    }) as EventListener);

    form.addEventListener('proposal-field-change', ((e: CustomEvent) => {
      this.ngZone.run(() => {
        this.previewData.set(JSON.stringify(e.detail));
      });
    }) as EventListener);
  }
}
