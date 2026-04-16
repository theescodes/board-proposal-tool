import { Component, inject } from '@angular/core';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="w-56 min-h-[calc(100vh-57px)] bg-white border-r border-gray-200 p-4">
      <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Overview</h3>
      <ul class="space-y-1">
        <li class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
          <span>All Proposals</span>
          <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{{ stats().total }}</span>
        </li>
        <li class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
          <span>Drafts</span>
          <span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{{ stats().draft }}</span>
        </li>
        <li class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-yellow-700 hover:bg-yellow-50">
          <span>Submitted</span>
          <span class="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">{{ stats().submitted }}</span>
        </li>
        <li class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-blue-700 hover:bg-blue-50">
          <span>Under Review</span>
          <span class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{{ stats().underReview }}</span>
        </li>
        <li class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-green-700 hover:bg-green-50">
          <span>Approved</span>
          <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">{{ stats().approved }}</span>
        </li>
        <li class="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-red-700 hover:bg-red-50">
          <span>Rejected</span>
          <span class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{{ stats().rejected }}</span>
        </li>
      </ul>
    </aside>
  `
})
export class SidebarComponent {
  private proposalService = inject(ProposalService);
  stats = this.proposalService.stats;
}
