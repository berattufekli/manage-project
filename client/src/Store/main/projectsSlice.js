import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { collection, updateDoc, deleteDoc, getDocs, doc, setDoc, getDoc } from "@firebase/firestore";
import { db, storage } from "../../lib/firebase";
import { uid } from "uid";
import { ref, uploadString } from "@firebase/storage";

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    const artistsCollection = collection(db, "projects");
    const querySnapshot = await getDocs(artistsCollection);

    const projectsData = [];
    querySnapshot.forEach((doc) => {
      projectsData.push({ ...doc.data() });
    });

    return projectsData;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project, { dispatch, getState }) => {
    try {
      const projectId = uid(24); // Generate a unique project ID (make sure you have the 'uid' function)
      const createdDate = Date.now();

      // Create a reference to the Firebase Firestore document
      const projectData = {
        ...project,
        projectId,
        createdDate,
      };
      const projectDocRef = doc(db, "projects", projectId);
      await setDoc(projectDocRef, projectData);

      // Create a reference to Firebase Storage where you want to upload the image
      const photoRef = ref(storage, `projectPhotos/${project.name}`);

      // Upload the image in base64 format
      await uploadString(photoRef, project.photo, "data_url");

      return { ...projectData, success: true };
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

