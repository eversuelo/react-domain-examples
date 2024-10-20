import { createContext, Dispatch } from 'react';
import { ActivityActions, activityReducer,ActivityState,initialState } from "../reducers/activity-reducers";
import { useReducer } from 'react';
type ActivityProviderProps = {
    children: React.ReactNode
}
type ActivityContextProps={
    state:ActivityState|undefined,
    dispatch:Dispatch<ActivityActions>

}
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps);
export const ActivityProvider = ({children}:ActivityProviderProps)=>{
    const [state, dispatch] = useReducer(activityReducer, initialState);
    return <ActivityContext.Provider value={{
        state,
        dispatch
    }}>
        {children}
    </ActivityContext.Provider>


}