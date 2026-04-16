import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
          [class]="colorClass()">
      {{ status() }}
    </span>
  `
})
export class StatusBadgeComponent {
  status = input.required<string>();

  colorClass = () => {
    const colors: Record<string, string> = {
      'draft': 'bg-gray-100 text-gray-700',
      'submitted': 'bg-yellow-100 text-yellow-800',
      'under-review': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[this.status()] || 'bg-gray-100 text-gray-700';
  };
}
