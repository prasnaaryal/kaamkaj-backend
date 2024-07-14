import * as UserServices from "../../services/user/userServices.mjs";

// eslint-disable-next-line import/prefer-default-export
export const getUserDetails = async (req, res) => {
  const { userId } = req.User;
  try {
    const user = await UserServices.getUserDetails(userId);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { fullName, title, personalWebsite } = req.body;

  try {
    const updatedUser = await UserServices.updateProfileService(
      id,
      fullName,
      title,
      personalWebsite,
      req.files.image[0].location,
      req.files.cv[0].location
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { fullName, companyAddress, companyWebsite, aboutUs } = req.body;

  try {
    const updatedUser = await UserServices.updateCompanyService(
      id,
      fullName,
      companyAddress,
      companyWebsite,
      aboutUs,
      req.files.image[0].location
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
