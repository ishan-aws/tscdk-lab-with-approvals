#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { TsStack } from '../lib/ts-stack';

const app = new cdk.App();
new TsStack(app, 'TsStack');
