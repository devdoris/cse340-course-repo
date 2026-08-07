import {
  getAllOrganizations,
  getOrganizationDetails,
  updateOrganization
} from "../models/organizations.js";

import {
  getProjectsByOrganizationId
} from "../models/projects.js";

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();

  res.render("organizations", {
    title: "Our Partner Organizations",
    organizations
  });
};

const showOrganizationDetailsPage = async (req, res) => {
  const organizationId = req.params.id;

  const organizationDetails =
    await getOrganizationDetails(organizationId);

  const projects =
    await getProjectsByOrganizationId(organizationId);

  res.render("organization", {
    title: "Organization Details",
    organizationDetails,
    projects
  });
};

// Display the edit organization form
const showEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;

  const organizationDetails =
    await getOrganizationDetails(organizationId);

  res.render("edit-organization", {
    title: "Edit Organization",
    organizationDetails
  });
};

// Process the edit organization form
const processEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;

  const {
    name,
    description,
    contactEmail,
    logoFilename
  } = req.body;

  await updateOrganization(
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
  );

  req.session.message =
  "Organization updated successfully.";

  res.redirect(`/organization/${organizationId}`);
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showEditOrganizationForm,
  processEditOrganizationForm
};