import Users from "../../models/User.js";

const getUserDetails = async (userId) => {
  try {
    // In a real-world scenario, you would query the database to get the user details
    // For this example, we'll assume you have access to the user object based on the userId
    const user = await Users.findById(userId);

    if (!user) {
      throw new Error("User Not Found");
    }

    // Return the user details
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProfileService = async (
  userId,
  fullName,
  title,
  personalWebsite,
  image,
  cv
) => {
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (fullName) user.fullName = fullName;
    if (title) user.title = title;
    if (personalWebsite) user.personalWebsite = personalWebsite;
    if (image) user.image = image;
    if (cv) user.cv = cv;

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCompanyService = async (
  userId,
  fullName,
  companyAddress,
  companyWebsite,
  aboutUs,
  image
) => {
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (fullName) user.fullName = fullName;
    if (companyAddress) user.companyAddress = companyAddress;
    if (companyWebsite) user.companyWebsite = companyWebsite;
    if (aboutUs) user.aboutUs = aboutUs;
    if (image) user.image = image;

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const validateProfileCompletion = async (
  userId,
  profileType = "applicant"
) => {
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error(
        `${
          profileType.charAt(0).toUpperCase() + profileType.slice(1)
        } not found`
      );
    }

    if (profileType === "applicant") {
      if (user.role !== "applicant") {
        throw new Error("Only applicants can apply for jobs");
      }
      return !!(user.fullName && user.title && user.cv && user.image);
    } else if (profileType === "company") {
      if (user.role !== "company") {
        throw new Error("Only companies can post jobs");
      }
      return !!(
        user.fullName &&
        user.companyAddress &&
        user.companyWebsite &&
        user.aboutUs &&
        user.image
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getUserDetails };
