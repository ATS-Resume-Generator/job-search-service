function normalizeJobData(job) {
    return {
        id: job.id || job.jobId,
        title: job.title || job.jobTitle,
        company: job.company || job.employer,
        location: job.location || job.jobLocation,
        description: job.description || job.jobDescription,
        salary: job.salary || job.salaryEstimate,
        experienceLevel: job.experienceLevel || job.level,
        remote: job.remote || job.isRemote,
        datePosted: job.datePosted || job.postedDate,
        source: job.source || job.jobBoard
    };
}

function normalizeJobsData(jobs) {
    return jobs.map(normalizeJobData);
}

module.exports = {
    normalizeJobData,
    normalizeJobsData
};