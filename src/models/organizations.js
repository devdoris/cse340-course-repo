import db from "./db.js";

const getAllOrganizations = async () => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    ORDER BY name;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getOrganizationDetails = async (organizationId) => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    WHERE organization_id = $1;
  `;

  const result = await db.query(query, [organizationId]);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const updateOrganization = async (
  id,
  name,
  description,
  contactEmail,
  logoFilename
) => {
  const sql = `
    UPDATE organization
    SET
      name = $1,
      description = $2,
      contact_email = $3,
      logo_filename = $4
    WHERE organization_id = $5;
  `;

  await db.query(sql, [
    name,
    description,
    contactEmail,
    logoFilename,
    id
  ]);
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  updateOrganization
};