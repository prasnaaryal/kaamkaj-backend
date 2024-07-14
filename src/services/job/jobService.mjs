import JobModel from "../../models/Job.js";
import JobApplication from "../../models/JobApplication.js";
import Users from "../../models/User.js";

export const createJob = async (jobData) => {
  try {
    const newJob = new JobModel(jobData); // Ensure correct instantiation
    await newJob.save();
    return newJob;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateJob = async (
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
  companyLogo // Added companyLogo parameter
) => {
  try {
    const job = await JobModel.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    if (jobTitle) {
      job.jobTitle = jobTitle;
    }
    if (companyName) {
      job.companyName = companyName;
    }
    if (category) {
      job.category = category;
    }
    if (jobLocation) {
      job.jobLocation = jobLocation;
    }
    if (experienceLevel) {
      job.experienceLevel = experienceLevel;
    }
    if (responsibilities) {
      job.responsibilities = responsibilities;
    }
    if (requirements) {
      job.requirements = requirements;
    }
    if (minSalary) {
      job.minSalary = minSalary;
    }
    if (employmentType) {
      job.employmentType = employmentType;
    }
    if (maxSalary) {
      job.maxSalary = maxSalary;
    }
    if (description) {
      job.description = description;
    }
    if (companyLogo) {
      job.companyLogo = companyLogo; // Update the company logo
    }

    await job.save();
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllJobs = async () => {
  try {
    const jobs = await JobModel.find({});
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

    const jobs = await JobModel.find(query);
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteJob = async (jobId) => {
  try {
    await JobModel.findByIdAndDelete(jobId);
    return;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobsById = async (jobId) => {
  try {
    const job = await JobModel.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobsByEmail = async (postedBy) => {
  try {
    const jobs = await JobModel.find({ postedBy });
    if (!jobs) {
      throw new Error("No jobs found for the given email");
    }
    return jobs;
  } catch (error) {
    throw new Error(error);
  }
};

export const getJobsByCompany = async (userId) => {
  try {
    console.log(`Finding jobs for company: ${userId}`); // Debugging log

    const jobs = await JobModel.find({ userId }); // Ensure this field matches your schema

    if (!jobs || jobs.length === 0) {
      throw new Error("No jobs found for the given company");
    }
    return jobs;
  } catch (error) {
    console.error(error); // Log the full error
    throw new Error(error.message || "Error retrieving jobs");
  }
};

export const applyJob = async (applicantId, jobId) => {
  try {
    // Check if the applicant exists and is an applicant role
    const applicant = await Users.findById(applicantId);
    if (!applicant || applicant.role !== "applicant") {
      throw new Error("Invalid applicant");
    }

    // Create a new job application
    const application = new JobApplication({
      applicantId,
      jobId,
    });

    // Save the job application to the database
    await application.save();

    return application;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Service function to save a job as favorite for a user.
 * @param {string} userId - The ID of the user.
 * @param {string} jobId - The ID of the job to save as favorite.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} Throws an error if the job or user is not found, or if there is a database error.
 */
export const saveFavoriteJob = async (userId, jobId) => {
  try {
    // Check if the user exists
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the job exists
    const job = await JobModel.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    // Check if the job is already in user's favorites
    if (user.favoriteJobs.includes(jobId)) {
      throw new Error("Job already saved as favorite");
    }

    // Add the job to user's favorite jobs
    user.favoriteJobs.push(jobId);
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Service function to get favorite jobs for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} Array of job objects that are favorites of the user.
 * @throws {Error} Throws an error if the user is not found or if there is a database error.
 */
export const getFavoriteJobs = async (userId) => {
  try {
    // Find the user and populate their favorite jobs
    const user = await Users.findById(userId).populate("favoriteJobs");
    if (!user) {
      throw new Error("User not found");
    }

    return user.favoriteJobs;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Service function to get all applied jobs for the current user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} Array of job application objects.
 * @throws {Error} Throws an error if there is a database error.
 */
export const getAppliedJobsByUser = async (userId) => {
  try {
    const appliedJobs = await JobApplication.find({
      applicantId: userId,
    })
      .populate("jobId")
      .populate("applicantId");
    return appliedJobs;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Service function to get all applied jobs for a company.
 * @returns {Promise<Array>} Array of job application objects.
 * @throws {Error} Throws an error if there is a database error.
 */

export const getAllAppliedJobs = async () => {
  console.log("inside getAllAppliedJobs");
  try {
    const appliedJobs = await JobApplication.find({})
      .populate("applicantId")
      .populate({
        path: "jobId",
        model: JobModel,
      });

    // Transform the results to have a "job" key
    const appliedJobsWithJobKey = appliedJobs.map((app) => {
      return {
        ...app.toObject(), // Convert to plain object
        job: app.jobId, // Add the "job" key
        jobId: undefined, // Optionally remove the original "jobId"
      };
    });

    return appliedJobsWithJobKey;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Service function to get a specific job application by job ID.
 * @param {string} jobId - The ID of the job.
 * @returns {Promise<Object>} The job application object.
 * @throws {Error} Throws an error if there is a database error.
 */
export const getAppliedJobById = async (jobId) => {
  try {
    const appliedJob = await JobApplication.findOne({ jobId: jobId })
      .populate("jobId")
      .populate("applicantId");
    return appliedJob;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getJobsByCompanyName = async (companyName) => {
  try {
    const jobs = await JobModel.find({ companyName });

    if (!jobs) {
      throw new Error("No jobs found for the given company name");
    }

    // Get the job IDs
    const jobIds = jobs.map((job) => job._id);

    // Find the applications for these jobs and populate the applicant details
    const jobApplications = await JobApplication.find({
      jobId: { $in: jobIds },
    }).populate("applicantId");

    // Map applications to their respective jobs
    const jobsWithApplicants = jobs.map((job) => {
      const applicants = jobApplications
        .filter((application) => application.jobId.equals(job._id))
        .map((application) => application.applicantId);

      return {
        ...job.toObject(),
        applicants,
      };
    });

    return jobsWithApplicants;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const unsaveFavoriteJob = async (userId, jobId) => {
  try {
    // Check if the user exists
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the job exists in user's favorites
    const jobIndex = user.favoriteJobs.indexOf(jobId);
    if (jobIndex === -1) {
      throw new Error("Job not found in favorites");
    }

    // Remove the job from user's favorite jobs
    user.favoriteJobs.splice(jobIndex, 1);
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
