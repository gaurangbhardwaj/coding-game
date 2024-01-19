/* Instruments */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBackendInstance } from "../../../api/axios-instance";
import { Challenge } from "../../../models";

export const fetchChallenges = createAsyncThunk<Challenge[]>(
  "api/fetchChallenges",
  async () => {
    const response = await axiosBackendInstance.get("challenges");
    return response.data as Challenge[];
  }
);
