/* Instruments */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBackendInstance } from "../../../api/axios-instance";
import { CompilationResult } from "src/models/editor";

export const fetchToken = createAsyncThunk<string>(
  "api/fetchToken",
  async () => {
    const data = {
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    };
    const response = await axiosBackendInstance.post("/token", data);
    return response.data;
  }
);

export const executeCode = createAsyncThunk<CompilationResult, any>(
  "api/executeCode",
  async (codeData) => {
    const data = {
      ...codeData,
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    };
    const response = await axiosBackendInstance.post("/execute", data);
    return response.data;
  }
);
