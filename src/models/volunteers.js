import db from "./db.js";

// Add a user as a volunteer for a project
const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING user_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows[0];
};

// Remove a user from a project
const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(query, [userId, projectId]);
};

// Get all projects a user has volunteered for
const getProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name
        FROM volunteer v
        JOIN project p
            ON v.project_id = p.project_id
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE v.user_id = $1
        ORDER BY p.project_date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

// Check if a user is already volunteering for a project
const isUserVolunteer = async (userId, projectId) => {
    const query = `
        SELECT *
        FROM volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

export {
    addVolunteer,
    removeVolunteer,
    getProjectsByUserId,
    isUserVolunteer
};