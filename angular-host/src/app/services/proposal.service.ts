import { Injectable, signal, computed } from '@angular/core';
import type { BoardProposal, ProposalFormData } from '../models/proposal.model';

@Injectable({ providedIn: 'root' })
export class ProposalService {
  private proposals = signal<BoardProposal[]>([
    {
      id: '1',
      title: 'Q3 Marketing Budget Increase',
      submitter: 'Jane Smith',
      department: 'marketing',
      priority: 'high',
      category: 'budget',
      summary: 'Requesting a 25% increase in Q3 marketing budget to support the new product launch campaign.',
      detailedDescription: '<p>With the upcoming product launch in September, we need additional budget for digital advertising, influencer partnerships, and event sponsorships.</p>',
      financialImpact: 'Estimated cost: $150,000. Expected ROI: 3.2x based on similar campaigns.',
      riskAssessment: 'Risk of underperformance if market conditions shift. Mitigation: phased spending approach with weekly performance reviews.',
      attachments: [],
      status: 'submitted',
      createdAt: '2026-04-10T09:00:00Z',
      updatedAt: '2026-04-10T09:00:00Z',
      submittedAt: '2026-04-10T09:00:00Z'
    },
    {
      id: '2',
      title: 'Engineering Team Expansion',
      submitter: 'John Doe',
      department: 'engineering',
      priority: 'critical',
      category: 'hiring',
      summary: 'Proposal to hire 5 senior engineers to address growing technical debt and accelerate feature delivery.',
      detailedDescription: '<p>Our current team is stretched thin across multiple projects. Adding 5 senior engineers will allow us to dedicate resources to infrastructure improvements while maintaining feature velocity.</p>',
      financialImpact: 'Annual cost: $750,000 (salary + benefits). Expected productivity gain: 40% faster delivery.',
      riskAssessment: 'Hiring timeline risk — competitive market may extend recruitment to 3-4 months.',
      attachments: [],
      status: 'under-review',
      createdAt: '2026-04-08T14:30:00Z',
      updatedAt: '2026-04-12T10:00:00Z',
      submittedAt: '2026-04-08T14:30:00Z'
    },
    {
      id: '3',
      title: 'Remote Work Policy Update',
      submitter: 'Sarah Johnson',
      department: 'hr',
      priority: 'medium',
      category: 'policy',
      summary: 'Update remote work policy to allow 4 days remote per week instead of the current 3 days.',
      detailedDescription: '<p>Employee satisfaction surveys show strong preference for increased flexibility. Competitors are offering fully remote options.</p>',
      financialImpact: 'Potential office space savings of $50,000/year. May reduce turnover costs by ~$200,000/year.',
      riskAssessment: 'Possible impact on in-person collaboration. Mitigation: mandatory team days and improved video conferencing setup.',
      attachments: [],
      status: 'draft',
      createdAt: '2026-04-15T11:00:00Z',
      updatedAt: '2026-04-15T11:00:00Z'
    }
  ]);

  readonly allProposals = this.proposals.asReadonly();

  readonly stats = computed(() => {
    const all = this.proposals();
    return {
      total: all.length,
      draft: all.filter(p => p.status === 'draft').length,
      submitted: all.filter(p => p.status === 'submitted').length,
      underReview: all.filter(p => p.status === 'under-review').length,
      approved: all.filter(p => p.status === 'approved').length,
      rejected: all.filter(p => p.status === 'rejected').length
    };
  });

  getProposal(id: string): BoardProposal | undefined {
    return this.proposals().find(p => p.id === id);
  }

  submitProposal(data: ProposalFormData): BoardProposal {
    const proposal: BoardProposal = {
      id: crypto.randomUUID(),
      ...data,
      submitter: 'Current User',
      attachments: [],
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString()
    };
    this.proposals.update(list => [...list, proposal]);
    return proposal;
  }

  saveDraft(data: ProposalFormData): BoardProposal {
    const proposal: BoardProposal = {
      id: crypto.randomUUID(),
      ...data,
      submitter: 'Current User',
      attachments: [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.proposals.update(list => [...list, proposal]);
    return proposal;
  }

  updateProposal(id: string, data: ProposalFormData): BoardProposal | undefined {
    let updated: BoardProposal | undefined;
    this.proposals.update(list => list.map(p => {
      if (p.id === id) {
        updated = { ...p, ...data, updatedAt: new Date().toISOString() };
        return updated;
      }
      return p;
    }));
    return updated;
  }

  updateStatus(id: string, status: BoardProposal['status']): void {
    this.proposals.update(list => list.map(p =>
      p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
    ));
  }
}
