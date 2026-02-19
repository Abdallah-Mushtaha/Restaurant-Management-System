// User roles
export type UserRole = 'admin' | 'cashier' | 'kitchen' ;

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}
