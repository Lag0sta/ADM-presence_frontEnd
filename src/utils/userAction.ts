import type { loadUserData, getURData } from "../types/userType";
import { getUser } from "../store/reducers/user";
import { getUserRequest } from "../api/userRequest";


export async function loadUser(loadUserData : loadUserData) {

    const { apellido, token, dispatch } = loadUserData
      try {
        const getURData = { apellido, token };
        const user = await getUserRequest(getURData);

        if (!user.result) {
          console.error("Error fetching user:", user.message);
          return;
        }
        dispatch(getUser(user.data));

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }