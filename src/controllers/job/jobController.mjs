import * as JobService from "../../services/job/jobService.mjs";

export const createJob = async (req, res) => {
  const { jobTitle,
    companyName,
    category,
    jobLocation,
    employmentType,
    experienceLevel,
    responsibilites,
    minSalary,
    maxSalary,
    postedBy,

    description,} = req.body;
  try {
    const job = await JobService.createJob({
      jobTitle,
      companyName,
      category,
      jobLocation,
      employmentType,
      postedBy,

      experienceLevel,
      responsibilites,
      minSalary,
      maxSalary,
      description,
    });
    res.status(201).send(job);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const getJobsByQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const jobs = await JobService.getJobsByQuery(query);
    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    await JobService.deleteJob(jobId);
    res.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { jobTitle,
      companyName,
      category,
      jobLocation,
      experienceLevel,
      responsibilites,
      minSalary,
      employmentType,


      maxSalary,
      description, } = req.body;
    const job = await JobService.updateJob(
      jobId,
      jobTitle,
      companyName,
      category, employmentType,
      category,

      jobLocation,
      experienceLevel,
      responsibilites,
      minSalary,
      maxSalary,
      description,
    );
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const getJobsById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobService.getJobsById(jobId);
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getJobsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const jobs = await JobService.getJobsByEmail(email);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};