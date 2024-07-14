import * as ApplicantService from '../../services/applicant/applicantService.mjs';

export const createApplicant = async (req, res) => {
  // products = {productid, quantity}
  // total = total price of all products
  const { jobs,  returnUrl, websiteUrl } = req.body;
  const { userId } = req.User;
  try {
    const applicant = await ApplicantService.createApplicant({
      user: userId,
      jobs,
      returnUrl,
      websiteUrl,
    });
    res.status(201).send(applicant);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



export const getAllApplicants = async (req, res) => {
  try {
    const applicants = await ApplicantService.getAllApplicants();
    res.status(200).send(applicants);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



export const getApplicantById = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const applicant = await ApplicantService.getApplicantById(applicantId);
    res.status(200).send(applicant);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateApplicantStatus = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const { status } = req.body;
    const applicant = await ApplicantService.updateApplicantStatus(applicantId, status);
    res.status(200).send(applicant);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteApplicant = async (req, res) => {
  try {
    const { applicantId } = req.params;
    await ApplicantService.deleteApplicant(applicantId);
    res.status(200).send({ message: 'Applicant deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};