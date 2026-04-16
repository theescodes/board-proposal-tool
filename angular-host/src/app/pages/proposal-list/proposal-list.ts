import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProposalService } from '../../services/proposal.service';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import type { BoardProposal } from '../../models/proposal.model';

@Component({
  selector: 'app-proposal-list',
  imports: [RouterLink, StatusBadgeComponent],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Proposals</h1>
          <p class="text-sm text-gray-500 mt-1">{{ filteredProposals().length }} proposals</p>
        </div>
        <a routerLink="/proposals/new"
           class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:bg-primary-dark transition-colors">
          + New Proposal
        </a>
      </div>

      <!-- Filters -->
      <div class="flex gap-2 mb-4">
        @for (f of filters; track f.value) {
          <button
            (click)="activeFilter.set(f.value)"
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
            [class]="activeFilter() === f.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'">
            {{ f.label }}
          </button>
        }
      </div>

      <!-- Table -->
      <div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Department</th>
              <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
              <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Submitter</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            @for (proposal of filteredProposals(); track proposal.id) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <a [routerLink]="['/proposals', proposal.id]"
                     class="text-sm font-medium text-gray-900 hover:text-primary no-underline">
                    {{ proposal.title }}
                  </a>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 capitalize">{{ proposal.department }}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                        [class]="priorityColor(proposal.priority)">
                    {{ proposal.priority }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <app-status-badge [status]="proposal.status" />
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ proposal.submitter }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ProposalListComponent {
  private proposalService = inject(ProposalService);
  activeFilter = signal('all');

  filters = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Submitted', value: 'submitted' },
    { label: 'Under Review', value: 'under-review' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' }
  ];

  filteredProposals = computed(() => {
    const all = this.proposalService.allProposals();
    const filter = this.activeFilter();
    return filter === 'all' ? all : all.filter(p => p.status === filter);
  });

  priorityColor(priority: string): string {
    const colors: Record<string, string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[priority] || '';
  }
}
