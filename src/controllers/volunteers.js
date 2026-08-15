import {
    addVolunteer,
    removeVolunteer
} from "../models/volunteers.js";

// Add the logged-in user as a volunteer
const processVolunteer = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    await addVolunteer(userId, projectId);

    req.session.projectMessage =
        "You are now volunteering for this project.";
    req.session.projectMessageType = "success";
    res.redirect(`/project/${projectId}`);
};

// Remove the logged-in user as a volunteer
const processRemoveVolunteer = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.projectId;

    await removeVolunteer(userId, projectId);

    req.session.projectMessage =
        "You are no longer volunteering for this project.";
    req.session.projectMessageType = "success";
    res.redirect(`/project/${projectId}`);
};

export {
    processVolunteer,
    processRemoveVolunteer
};