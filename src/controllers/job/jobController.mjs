import * as JobService from "../../services/job/jobService.mjs";
import { validateProfileCompletion } from "../../services/user/userServices.mjs";
import Users from "../../models/User.js";

export const createJob = async (req, res) => {
  const {
    jobTitle,
    companyName,
    category,
    jobLocation,
    employmentType,
    experienceLevel,
    responsibilities,
    requirements,
    minSalary,
    maxSalary,
    postedBy,
    description,
  } = req.body;
  const { userId: applicantId } = req.User; // Assuming req.User contains the authenticated user details

  try {
    const profileComplete = await validateProfileCompletion(
      applicantId,
      "company"
    );
    if (!profileComplete) {
      return res.status(400).send({
        message: "Please fill out your profile before posting a job",
      });
    }

    const user = await Users.findById(applicantId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const job = await JobService.createJob({
      jobTitle,
      companyName,
      category,
      jobLocation,
      employmentType,
      experienceLevel,
      responsibilities,
      requirements,
      minSalary,
      maxSalary,
      description,
      postedBy,
      companyLogo: user.image, // Assuming profileImage is the field in the user schema for the company logo
    });

    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      jobTitle,
      companyName,
      category,
      jobLocation,
      experienceLevel,
      responsibilities,
      requirements,
      minSalary,
      employmentType,
      maxSalary,
      description,
    } = req.body;
    const { userId: applicantId } = req.User; // Assuming req.User contains the authenticated user details

    const user = await Users.findById(applicantId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const job = await JobService.updateJob(
      jobId,
      jobTitle,
      companyName,
      category,
      jobLocation,
      experienceLevel,
      responsibilities,
      requirements,
      minSalary,
      employmentType,
      maxSalary,
      description,
      user.image
    );

    res.status(200).send(job);
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
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

export const getJobsByCompany = async (req, res) => {
  console.log("User object:", req.User);

  const { userId } = req.User;

  console.log(`Company Name: ${userId}`);

  try {
    const jobs = await JobService.getJobsByCompany(userId);
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

export const applyJob = async (req, res) => {
  const { jobId } = req.body;
  const { userId: applicantId } = req.User; // Assuming req.User contains the authenticated user details
  try {
    // Check if the applicant's profile is filled
    const profileComplete = await validateProfileCompletion(applicantId);
    if (!profileComplete) {
      return res.status(400).send({
        message: "Please fill out your profile before applying for jobs",
      });
    }

    // Apply for the job using the service function
    const application = await JobService.applyJob(applicantId, jobId);

    // Send a success response with the created job application object
    res.status(201).send(application);
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).send({ message: error.message });
  }
};

export const saveFavoriteJob = async (req, res) => {
  const { jobId } = req.body;
  const { userId } = req.User; // Assuming req.User contains the authenticated user details

  try {
    // Call the service function to save the job as favorite for the user
    const user = await JobService.saveFavoriteJob(userId, jobId);

    // Send a success response with the updated user object
    res.status(200).send({ message: "Job saved as favorite", user });
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).send({ message: error.message });
  }
};

export const getFavoriteJobs = async (req, res) => {
  const { userId } = req.User; // Assuming req.User contains the authenticated user details
  try {
    // Call the service function to get favorite jobs for the user
    const favoriteJobs = await JobService.getFavoriteJobs(userId);

    // Send a success response with the array of favorite job objects
    res.status(200).send(favoriteJobs);
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).send({ message: error.message });
  }
};

export const getAppliedJobsByUserController = async (req, res) => {
  const { userId } = req.User;

  try {
    const appliedJobs = await JobService.getAppliedJobsByUser(userId);
    res.status(200).send(appliedJobs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllAppliedJobs = async (req, res) => {
  const { userId } = req.User;

  try {
    const user = await Users.findById(userId);
    if (user.role !== "company") {
      return res.status(403).send({ message: "Forbidden: Access is denied." });
    }

    const appliedJobs = await JobService.getAllAppliedJobs(userId);
    res.status(200).send(appliedJobs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAppliedJobByIdController = async (req, res) => {
  const { jobId } = req.params;

  try {
    const appliedJob = await JobService.getAppliedJobById(jobId);
    res.status(200).send(appliedJob);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getJobsByCompanyName = async (req, res) => {
  const { companyName } = req.params; // Assuming the company name is passed as a route parameter

  try {
    const jobs = await JobService.getJobsByCompanyName(companyName);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unsaveFavoriteJob = async (req, res) => {
  const { jobId } = req.body;
  const { userId } = req.User; // Assuming req.User contains the authenticated user details

  try {
    // Call the service function to unsave the job from user's favorites
    const user = await JobService.unsaveFavoriteJob(userId, jobId);

    // Send a success response with the updated user object
    res.status(200).send({ message: "Job removed from favorites", user });
  } catch (error) {
    // Handle errors and send an appropriate error response
    res.status(500).send({ message: error.message });
  }
};
