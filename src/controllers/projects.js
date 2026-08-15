import {
  getUpcomingProjects,
  getProjectDetails,
  updateProject,
  createProject
} from "../models/projects.js";

import { validationResult } from "express-validator";

import {
  isUserVolunteer
} from "../models/volunteers.js";

import {
  getCategoriesByProject
} from "../models/categories.js";

import {
  getAllOrganizations
} from "../models/organizations.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects =
    await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

  res.render("projects", {
    title: "Upcoming Service Projects",
    projects
  });
};

// Display the new project form
const showNewProjectForm = async (req, res) => {
  const organizations = await getAllOrganizations();

  const today = new Date().toISOString().split("T")[0];

  res.render("new-project", {
    title: "New Project",
    organizations,
    errors: [],
    project: {
      project_date: today
    }
  });
};

// Process the new project form
const processNewProjectForm = async (req, res) => {
  const errors = validationResult(req);

  const {
    organizationId,
    title,
    description,
    location,
    projectDate
  } = req.body;

  if (!errors.isEmpty()) {
    const organizations = await getAllOrganizations();

    return res.status(400).render("new-project", {
      title: "New Project",
      organizations,
      errors: errors.array(),
      project: {
        organization_id: organizationId,
        title,
        description,
        location,
        project_date: projectDate
      }
    });
  }

  await createProject(
    organizationId,
    title,
    description,
    location,
    projectDate
  );

  req.session.message =
    "Project created successfully.";

  res.redirect("/projects");
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;

  const project =
    await getProjectDetails(projectId);

  const categories =
    await getCategoriesByProject(projectId);

  let isVolunteer = false;

  if (req.session.user) {
    isVolunteer = await isUserVolunteer(
      req.session.user.user_id,
      projectId
    );
  }

  const projectMessage = req.session.projectMessage;
const projectMessageType = req.session.projectMessageType;

delete req.session.projectMessage;
delete req.session.projectMessageType;

res.render("project", {
    title: project.title,
    project,
    categories,
    isVolunteer,
    projectMessage,
    projectMessageType
});
};

// Display the edit project form
const showEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const project =
    await getProjectDetails(projectId);

  const organizations =
    await getAllOrganizations();

  const projectDate =
    project.project_date instanceof Date
      ? project.project_date.toISOString().split("T")[0]
      : String(project.project_date).split("T")[0];

  res.render("edit-project", {
  title: "Edit Project",
  project,
  projectDate,
  organizations,
  errors: []
});
};

// Process the edit project form
const processEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const errors = validationResult(req);

  const {
    organizationId,
    title,
    description,
    location,
    projectDate
  } = req.body;

  if (!errors.isEmpty()) {
  const project = await getProjectDetails(projectId);
  const organizations = await getAllOrganizations();

  project.organization_id = organizationId;
  project.title = title;
  project.description = description;
  project.location = location;
  project.project_date = projectDate;

  return res.status(400).render("edit-project", {
    title: "Edit Project",
    project,
    projectDate: projectDate || "",
    organizations,
    errors: errors.array()
  });
}

  await updateProject(
    projectId,
    organizationId,
    title,
    description,
    location,
    projectDate
  );

  req.session.message =
    "Project updated successfully.";

  res.redirect(`/project/${projectId}`);
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm
};