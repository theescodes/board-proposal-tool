import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white border-b border-gray-200 px-6 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <a routerLink="/dashboard" class="text-xl font-bold text-gray-900 no-underline">
            Board Proposals
          </a>
          <nav class="flex items-center gap-4">
            <a routerLink="/dashboard" routerLinkActive="text-primary font-medium"
               class="text-sm text-gray-600 hover:text-gray-900 no-underline transition-colors">
              Dashboard
            </a>
            <a routerLink="/proposals" routerLinkActive="text-primary font-medium"
               [routerLinkActiveOptions]="{ exact: true }"
               class="text-sm text-gray-600 hover:text-gray-900 no-underline transition-colors">
              Proposals
            </a>
          </nav>
        </div>
        <div class="flex items-center gap-3">
          <a routerLink="/proposals/new"
             class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white no-underline hover:bg-primary-dark transition-colors">
            + New Proposal
          </a>
          <div class="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-sm font-medium text-white">
            CU
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}
