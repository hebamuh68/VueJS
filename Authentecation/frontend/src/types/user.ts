export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    groups: Group[];
    user_permissions: Permission[];
}

export interface Group {
  id: number;
  name: string;
}

export interface Permission {
  id: number;
  name: string;
}
