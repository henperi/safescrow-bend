export interface EmailOrPhone {
  email: string;
  phone: string;
}

export interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  secretKey: string;
  accountType?: string;
}
