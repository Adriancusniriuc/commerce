import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
//make sure to set the type the exact same string our reducer is expecting. IT MUST BE THE SAME in order to create the approapriate effects
//use capitals and snake case
