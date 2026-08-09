import db from "./db.js";

const getAllProjects = async () => {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.project_date,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date;
  `;

  const result = await db.query(query);

  return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.project_date,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date
    LIMIT $1;
  `;

  const result = await db.query(query, [numberOfProjects]);

  return result.rows;
};

const getProjectDetails = async (projectId) => {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.project_date,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date
    FROM project
    WHERE organization_id = $1
    ORDER BY project_date;
  `;

  const result = await db.query(query, [organizationId]);

  return result.rows;
};

const updateProject = async (
  id,
  organizationId,
  title,
  description,
  location,
  projectDate
) => {
  const sql = `
    UPDATE project
    SET
      organization_id = $1,
      title = $2,
      description = $3,
      location = $4,
      project_date = $5
    WHERE project_id = $6;
  `;

  await db.query(sql, [
    organizationId,
    title,
    description,
    location,
    projectDate,
    id
  ]);
};

const createProject = async (
  organizationId,
  title,
  description,
  location,
  projectDate
) => {
  const sql = `
    INSERT INTO project (
      organization_id,
      title,
      description,
      location,
      project_date
    )
    VALUES ($1, $2, $3, $4, $5);
  `;

  await db.query(sql, [
    organizationId,
    title,
    description,
    location,
    projectDate
  ]);
};

export {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByOrganizationId,
  updateProject,
  createProject
};