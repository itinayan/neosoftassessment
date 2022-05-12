import {taskManagement,taskStageUp} from './reducers';
import { createSlice } from '@reduxjs/toolkit'

const rootReducer = createSlice({
    name:'taskManagement',
    initialState:{ tasks:[] } ,
    reducers:{ 
        createTask : taskManagement,
        stageUp : taskStageUp,
    }
    });

export const { createTask, stageUp } = rootReducer.actions

export default rootReducer.reducer