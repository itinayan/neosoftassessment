export const taskManagement = (state, action) => {
  state.tasks.push(action.payload);
};
export const taskStageUp = (state, action) => {
  state.tasks = state.tasks.map((task) => {
    console.log("inside redux 2", task);
    if (task.id === action.payload) {return task = {...task, stage:task.stage + 1}};
  });
  console.log("inside redux", state.tasks);
};
