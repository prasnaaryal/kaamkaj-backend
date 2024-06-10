import jobModel from "../../models/Job.js";

export const createJob = async (job) => {
  try {
    const newJob = await jobModel(job);
    await newJob.save();
    return newJob;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllJobs = async () => {
  try {
    const jobs = await jobModel.find({});
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobsByQuery = async (searchQuery) => {
  try {
    let query = {}; // Empty query by default

    if (searchQuery) {
      // If a search query is provided, create a regular expression to perform a case-insensitive search
      const searchRegex = new RegExp(searchQuery, "i");
      query = { name: searchRegex }; // Modify the field name ('name' in this case) according to your data model
    }

    const jobs = await jobModel.find(query);
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteJob = async (jobId) => {
  try {
    await jobModel.findByIdAndDelete(jobId);
    return;
  } catch (error) {
    throw new Error(error);
  }
};
export const updateJob = async (
  jobId,
  name,
  category,
  image,
  price,
  description
) => {
  try {
    const job = await jobModel.findById(jobId);
    if (name) {
      job.name = name;
    }
    if (category) {
      job.category = category;
    }
    if (image) {
      job.image = image;
    }
    if (price) {
      job.price = price;
    }
    if (description) {
      job.description = description;
    }
    await job.save();
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobsById = async (jobId) => {
  try {
    const job = await jobModel.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  } catch (error) {
    throw new Error(error);
  }
};