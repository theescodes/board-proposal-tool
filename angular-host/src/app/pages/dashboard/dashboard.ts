import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatusBadgeComponent, DatePipe],
  template: `
    <div>
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-1">Overview of all board proposals</p>
      </div>

      <!-- Stats cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-gray-500">Total Proposals</p>
          <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats().total }}</p>
        </div>
        <div class="rounded-xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
          <p class="text-sm text-yellow-700">Submitted</p>
          <p class="text-3xl font-bold text-yellow-800 mt-1">{{ stats().submitted }}</p>
        </div>
        <div class="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <p class="text-sm text-blue-700">Under Review</p>
          <p class="text-3xl font-bold text-blue-800 mt-1">{{ stats().underReview }}</p>
        </div>
        <div class="rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <p class="text-sm text-green-700">Approved</p>
          <p class="text-3xl font-bold text-green-800 mt-1">{{ stats().approved }}</p>
        </div>
      </div>

      <!-- Recent proposals -->
      <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Recent Proposals</h2>
          <a routerLink="/proposals" class="text-sm text-primary hover:text-primary-dark no-underline">View all</a>
        </div>
        <div class="divide-y divide-gray-100">
          @for (proposal of proposals(); track proposal.id) {
            <a [routerLink]="['/proposals', proposal.id]"
               class="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors no-underline">
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ proposal.title }}</p>
                <p class="text-xs text-gray-500 mt-0.5">{{ proposal.submitter }} &middot; {{ proposal.department }}</p>
              </div>
              <div class="flex items-center gap-3 ml-4">
                <app-status-badge [status]="proposal.status" />
                <span class="text-xs text-gray-400 whitespace-nowrap">{{ proposal.createdAt | date:'mediumDate' }}</span>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private proposalService = inject(ProposalService);
  stats = this.proposalService.stats;
  proposals = this.proposalService.allProposals;
}
