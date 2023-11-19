import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc, getDoc } from "@firebase/firestore";
import { db, storage } from "../../lib/firebase";
import { uid } from "uid";
import { ref, uploadString } from "@firebase/storage";
import axiosConfig from "../../Hooks/api/axiosConfig";

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
      const response = await axiosConfig.post(
        "/api/projects",
        project,
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

