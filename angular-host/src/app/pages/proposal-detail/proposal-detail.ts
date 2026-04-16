import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import type { BoardProposal } from '../../models/proposal.model';

@Component({
  selector: 'app-proposal-detail',
  imports: [RouterLink, StatusBadgeComponent, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (proposal()) {
      <div>
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h1 class="text-2xl font-bold text-gray-900">{{ proposal()!.title }}</h1>
              <app-status-badge [status]="proposal()!.status" />
            </div>
            <p class="text-sm text-gray-500">
              Submitted by {{ proposal()!.submitter }} &middot; {{ proposal()!.department }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <a [routerLink]="['/proposals', proposal()!.id, 'edit']"
               class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 no-underline hover:bg-gray-50 transition-colors">
              Edit
            </a>
            <a routerLink="/proposals" class="text-sm text-gray-600 hover:text-gray-900 no-underline">
              &larr; Back
            </a>
          </div>
        </div>

        <!-- Status actions -->
        @if (proposal()!.status !== 'approved' && proposal()!.status !== 'rejected') {
          <div class="flex gap-2 mb-6">
            @if (proposal()!.status === 'submitted') {
              <button (click)="updateStatus('under-review')"
                      class="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer">
                Mark as Under Review
              </button>
            }
            @if (proposal()!.status === 'under-review') {
              <button (click)="updateStatus('approved')"
                      class="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 transition-colors cursor-pointer">
                Approve
              </button>
              <button (click)="updateStatus('rejected')"
                      class="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 transition-colors cursor-pointer">
                Reject
              </button>
            }
            @if (proposal()!.status === 'draft') {
              <button (click)="updateStatus('submitted')"
                      class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors cursor-pointer">
                Submit for Review
              </button>
            }
          </div>
        }

        <!-- Preview using Svelte component -->
        <div class="max-w-3xl">
          <bp-proposal-preview [attr.proposal-data]="previewJson()"></bp-proposal-preview>
        </div>

        <!-- Meta info -->
        <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm max-w-3xl">
          <h3 class="text-sm font-semibold text-gray-500 uppercase mb-3">Details</h3>
          <dl class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-gray-500">Created</dt>
              <dd class="text-gray-900 mt-0.5">{{ proposal()!.createdAt | date:'medium' }}</dd>
            </div>
            <div>
              <dt class="text-gray-500">Last Updated</dt>
              <dd class="text-gray-900 mt-0.5">{{ proposal()!.updatedAt | date:'medium' }}</dd>
            </div>
            @if (proposal()!.submittedAt) {
              <div>
                <dt class="text-gray-500">Submitted</dt>
                <dd class="text-gray-900 mt-0.5">{{ proposal()!.submittedAt | date:'medium' }}</dd>
              </div>
            }
            <div>
              <dt class="text-gray-500">Priority</dt>
              <dd class="text-gray-900 mt-0.5 capitalize">{{ proposal()!.priority }}</dd>
            </div>
          </dl>
        </div>
      </div>
    } @else {
      <div class="text-center py-20">
        <p class="text-gray-500">Proposal not found.</p>
        <a routerLink="/proposals" class="text-primary hover:text-primary-dark no-underline text-sm mt-2 inline-block">
          Back to Proposals
        </a>
      </div>
    }
  `
})
export class ProposalDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private proposalService = inject(ProposalService);

  proposal = signal<BoardProposal | undefined>(undefined);
  previewJson = signal('{}');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.loadProposal(id);
  }

  private loadProposal(id: string) {
    const p = this.proposalService.getProposal(id);
    this.proposal.set(p);
    if (p) {
      this.previewJson.set(JSON.stringify({
        title: p.title,
        department: p.department,
        priority: p.priority,
        category: p.category,
        summary: p.summary,
        detailedDescription: p.detailedDescription,
        financialImpact: p.financialImpact,
        riskAssessment: p.riskAssessment
      }));
    }
  }

  updateStatus(status: BoardProposal['status']) {
    const p = this.proposal();
    if (p) {
      this.proposalService.updateStatus(p.id, status);
      this.loadProposal(p.id);
    }
  }
}
