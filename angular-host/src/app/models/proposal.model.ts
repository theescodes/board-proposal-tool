export interface BoardProposal {
  id: string;
  title: string;
  submitter: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  summary: string;
  detailedDescription: string;
  financialImpact: string;
  riskAssessment: string;
  attachments: Attachment[];
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface ProposalFormData {
  title: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  summary: string;
  detailedDescription: string;
  financialImpact: string;
  riskAssessment: string;
}
