interface SignUpData {
  phone: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType?: string;
}

export const invalidSignupData: SignUpData = {
  phone: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const validSignupData: SignUpData = {
  phone: '08067272175',
  email: 'henry@gmail.com',
  password: '12324242',
  firstName: 'Henry',
  lastName: 'Pere',
};
