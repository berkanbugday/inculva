export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface Site {
  id: string;
  name: string;
  domain: string;
  ownerId: string;
  createdAt: string;
}
