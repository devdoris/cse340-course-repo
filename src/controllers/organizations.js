import {
  getAllOrganizations,
  getOrganizationDetails,
  updateOrganization,
  createOrganization
} from "../models/organizations.js";

import { validationResult } from "express-validator";

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
    organizationDetails,
    errors: []
  });
};

// Display the new organization form
const showNewOrganizationForm = (req, res) => {
  res.render("new-organization", {
    title: "New Organization",
    errors: [],
    name: "",
    description: "",
    contactEmail: ""
  });
};

// Process the new organization form
const processNewOrganizationForm = async (req, res) => {
  const errors = validationResult(req);

  const {
    name,
    description,
    contactEmail
  } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("new-organization", {
      title: "New Organization",
      errors: errors.array(),
      name,
      description,
      contactEmail
    });
  }

  const logoFilename = "generic-logo.png";

  await createOrganization(
    name,
    description,
    contactEmail,
    logoFilename
  );

  req.session.message =
    "Organization created successfully.";

  res.redirect("/organizations");
};

// Process the edit organization form
const processEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;

  const errors = validationResult(req);

  const {
    name,
    description,
    contactEmail,
    logoFilename
  } = req.body;

  if (!errors.isEmpty()) {
    const organizationDetails =
      await getOrganizationDetails(organizationId);

    organizationDetails.name = name;
    organizationDetails.description = description;
    organizationDetails.contact_email = contactEmail;

    return res.status(400).render("edit-organization", {
      title: "Edit Organization",
      organizationDetails,
      errors: errors.array()
    });
  }

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
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm
};