declare module "@dimelo/global" {
  export type Maybe<T> = T | null;

  export interface User {
    id: number;
    createdAt: string;
    deletedAt: Maybe<string>;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    password: Maybe<string>;
    passwordResetToken: Maybe<string>;
    telephoneNumber: Maybe<string>;
    updatedAt: Maybe<string>;
    verificationToken: Maybe<string>;
  }
}

declare module "react-google-autocomplete";

declare module "react-super-responsive-table";
declare module "react-dnd-multi-backend";
declare module "use-persisted-reducer" {
  export default (key: string) => useReducer;
  function useReducer<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    initializer?: undefined
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
}
