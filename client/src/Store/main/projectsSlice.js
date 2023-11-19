import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axiosConfig from "../../Hooks/api/axiosConfig";
import axios from "axios";

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    const response = await axiosConfig.get(
      `/api/projects`,
    );

    let { data } = await response.data;
    return data;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project, { dispatch, getState }) => {
    try {
      let formData = new FormData();
      formData.append("projectName", project.projectName);
      formData.append("projectDescription", project.projectDescription);
      formData.append("priority", project.priority);
      formData.append("url", project.url);
      formData.append("team", JSON.stringify(project.team));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          boundary: formData._boundaries,
        },
      };

      const response = await axiosConfig.post(
        "/api/projects",
        formData,
        config
      );

      let { data } = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

const projectsAdapter = createEntityAdapter({
  selectId: (project) => project.projectId,
});

export const {
  selectAll: selectProjects,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state) => state.projects);

const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {

  },
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
    [addProject.fulfilled]: projectsAdapter.addOne,
  },
});

export const {

} = projectsSlice.actions;

export default projectsSlice.reducer;

