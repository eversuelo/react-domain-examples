import { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'delete-activeId', payload: { id: Activity['id'] } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'restart-app' } |
    { type: 'edit-activity', payload: { newActivity: Activity } };

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}
const localStorageActivities=()=>{
    const activities =localStorage.getItem("activities");
    return activities? JSON.parse(activities):[];
}
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    let updatedActivities: Activity[] = [];
    switch (action.type) {
        case 'save-activity':
            if (state.activeId !== '') {
                updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);
            } else {
                updatedActivities = [...state.activities, action.payload.newActivity];
            }
            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            }
            break;
        case 'set-activeId':

            return {
                ...state,
                activeId: action.payload.id
            }
            break;
        case 'delete-activeId':
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id),
                activeId: ''
            }
            break;
            case "restart-app":
                return {
                    activities:[],
                    activeId:""
                }
        default:
            console.log('Activity no registrada');
            break;
    }

}