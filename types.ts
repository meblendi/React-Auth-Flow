
export interface ApiUserResult {
  results: {
    name: {
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
    };
    phone: string;
  }[];
}

export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  pictureUrl: string;
  phone: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  isInitializing: boolean;
}
