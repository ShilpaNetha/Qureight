import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { uploadImage } from "../../services/ApiClient";
import { toast } from "react-toastify";
import Loader from "../loader";

const validationSchema = Yup.object({
  file: Yup.mixed().required("Please upload an image file"),
});

const Upload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState(false);
  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.file) {
          setLoading(true);
          // await uploadImage(values.file); // mocking API for 6 seconds atm can be changed to 60 seconds
          // similary we can pool this API as well by making setInterval for every 5 seconds for asyncronous flow
          toast.warn("Image successfully uploaded");
          setTimeout(() => {
            setCat(true);
            setLoading(false);
            toast.success("Image processed");
          }, 6000);
        }
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        console.error("Error occurred:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="max-w-2xl mx-auto mt-10 text-center h-screen">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG or JPEG (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/jpeg"
              onChange={(e) => {
                const selectedFile = e.target.files ? e.target.files[0] : null;
                void formik.setFieldValue("file", selectedFile);
              }}
              className="hidden"
            />
          </label>
        </div>
        {loading && <Loader />}
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
        >
          Submit
        </button>
        {formik.touched.file && formik.errors.file && (
          <div className="text-red-500">{formik.errors.file}</div>
        )}
      </div>
    </form>
  );
};

export default Upload;
