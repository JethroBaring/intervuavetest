export type InputType = 'BUILT_IN' | 'EXTERNAL';
export type DeviceType = 'LAPTOP' | 'DESKTOP' | 'MOBILE' | 'TABLET';
export type InterviewStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'PROCESSING'
  | 'EVALUATED'
  | 'EXPIRED';

export class CreateInterviewsDto {
  candidateId: string;
  roleId: string;
  interviewLink: string;
  expiresAt: string; // ISO string format (Date)
  videoUrl: string;
  cameraType: InputType;
  micType: InputType;
  deviceType: DeviceType;
  noiseLevel?: number;
  status?: InterviewStatus;
}
