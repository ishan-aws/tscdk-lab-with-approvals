import {Construct, Stack, StackProps} from "@aws-cdk/core";
import {Repository} from "@aws-cdk/aws-codecommit";
import {Artifact} from "@aws-cdk/aws-codepipeline";
import {CdkPipeline, SimpleSynthAction} from "@aws-cdk/pipelines";
import {CodeCommitSourceAction} from "@aws-cdk/aws-codepipeline-actions";
import {TsAppDevStage, TsAppProdStage} from "./pipeline-stages";

export class PipelineStack extends Stack {


    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const repo = new Repository(this, 'TSWorkshopRepo', {
            repositoryName: 'TSWorkshopRepo'
        })

        const sourceArtifact = new Artifact();

        const cloudAssemblyArtifact = new Artifact();

        const sourceAction = new CodeCommitSourceAction({
            actionName: 'TsCodeCommit',
            output: sourceArtifact,
            repository: repo
        })

        const synthAction = SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            buildCommand: 'npm run build'
        })

        const pipeline = new CdkPipeline(this, 'TSPipeline', {
            pipelineName: 'TSPipeline',
            cloudAssemblyArtifact,
            sourceAction,
            synthAction
        })


        pipeline.addApplicationStage(new TsAppDevStage(this, 'TsAppDevStage', {}))

        const prod = pipeline.addApplicationStage(new TsAppProdStage(this, 'TsAppProdStage', {}), {
            manualApprovals: true // Add manual approval step
        })

        // Alternate method
        // prod.addManualApprovalAction():
    }
}