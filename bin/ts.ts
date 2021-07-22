#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {LambdaApiDev} from '../lib/demo-api'
import {PipelineStack} from "../lib/pipeline-stack";

const app = new cdk.App();
new PipelineStack(app, 'TsPipelineStack')




