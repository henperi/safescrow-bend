import { ProfileAttributes } from '../db/models/profile/profile.interface';

export interface TokenData {
  id: number;
  uniqueId: string;
  email: string;
  phone: string;
  Profile: ProfileAttributes;
  accountType: string;
  secretKey: string;
}
