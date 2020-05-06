import ErrorUtils from '../grpc-utils-DEPRECATED/error-utils';

import getProject from './getProject';
import getWorkflow from './getWorkflow';
import registerProject from './registerProject-DEPRECATED';
import registerTasks from './registerTasks-DEPRECATED';
import registerWorker from './registerWorker';
import registerWorkflows from './registerWorkflows';
import routeWorkerDirectives from './routeWorkerDirectives';
import runWorkflow from './runWorkflow';

// prettier-ignore

export default {
  getProject: ErrorUtils.handleCallbackEndpointError(getProject),
  getWorkflow: ErrorUtils.handleCallbackEndpointError(getWorkflow),
  registerProject: ErrorUtils.handleCallbackEndpointError(registerProject),
  registerTasks: ErrorUtils.handleStreamEndpointError(registerTasks),
  registerWorker: ErrorUtils.handleCallbackEndpointError(registerWorker),
  registerWorkflows: ErrorUtils.handleStreamEndpointError(registerWorkflows),
  routeWorkerDirectives: ErrorUtils.handleStreamEndpointError(routeWorkerDirectives),
  runWorkflow: ErrorUtils.handleCallbackEndpointError(runWorkflow),
};