const mongoose = require('mongoose');

const { ModelSchema, RefSchema } = require('./schemas');

const Schema = new mongoose.Schema({
  jobID: Boolean,
  workflowRef: RefSchema,
});

Schema.add(ModelSchema);

module.exports = mongoose.model('WorkflowRun', Schema);
