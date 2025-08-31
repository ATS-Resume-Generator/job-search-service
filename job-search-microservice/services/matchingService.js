const _ = require('lodash');

const matchJobsToSkills = (jobs, userSkills) => {
    return jobs.filter(job => {
        const jobSkills = job.skills || [];
        return _.intersection(jobSkills, userSkills).length > 0;
    });
};

module.exports = {
    matchJobsToSkills
};