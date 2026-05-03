export type Auth = {
    email: string;
    password: string;
    businessName?: string;
    user?:{
      id: string;
    };
}