import { ApiGroup } from './api-group.interface';
import { ApiUser } from './api-user.interface';

export interface ApiGroupInvitation {
  id: number;
  issuedBy: ApiUser;
  issuedTo: ApiUser;
  group: ApiGroup;
  message?: string;
}

export interface ApiGroupAccessRequest {
  id: number;
  issuedBy: ApiUser;
  group: ApiGroup;
  message?: string;
}

export interface ApiNotificationsResponse {
  invitations: ApiGroupInvitation[];
  accessRequests: ApiGroupAccessRequest[];
}
