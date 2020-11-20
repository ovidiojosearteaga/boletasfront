import { IUser } from './iuser';

export interface ITickets {
  id?:number,
  user_id?:number,
  user_data?:IUser,
  created_at?:string,
  updated_at?:string,
}