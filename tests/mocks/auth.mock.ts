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

export const authorization = {
  invalidToken:
    'eYJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidW5pcXVlSWQiOiJ5dGZHbjJWayIsImVtYWlsIjoicGllbnJ5M2dAZ21haWwuY29tIiwicGhvbmUiOiIrMjM0ODA2NzI3MjE3NSIsIlByb2ZpbGUiOnsiZmlyc3ROYW1lIjoiSGVucnkgUCIsImxhc3ROYW1lIjoibGFzdE5hbWUifSwiYWNjb3VudFR5cGUiOiJDdXN0b21lciIsInNlY3JldEtleSI6ImVjRDFfeEE4LXBpZW5yeTNnQGdtYWlsLmNvbSIsImlhdCI6MTU4MTcxMDQ1OSwiZXhwIjoxNTgxNzEwNDYxfQ.jQC5ZawmTqTqiz3Ok0i3yM3FdE7guNklEGlUOKY-jIU',
  expiredToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidW5pcXVlSWQiOiJ5dGZHbjJWayIsImVtYWlsIjoicGllbnJ5M2dAZ21haWwuY29tIiwicGhvbmUiOiIrMjM0ODA2NzI3MjE3NSIsIlByb2ZpbGUiOnsiZmlyc3ROYW1lIjoiSGVucnkgUCIsImxhc3ROYW1lIjoibGFzdE5hbWUifSwiYWNjb3VudFR5cGUiOiJDdXN0b21lciIsInNlY3JldEtleSI6ImVjRDFfeEE4LXBpZW5yeTNnQGdtYWlsLmNvbSIsImlhdCI6MTU4MTcxMDQ1OSwiZXhwIjoxNTgxNzEwNDYxfQ.jQC5ZawmTqTqiz3Ok0i3yM3FdE7guNklEGlUOKY-jIU',
  validToken: '',
};
