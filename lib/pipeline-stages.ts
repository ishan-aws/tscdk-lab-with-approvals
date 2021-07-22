import * as cdk from '@aws-cdk/core'
import {Construct, StageProps} from "@aws-cdk/core";
import {LambdaApiDev} from "./demo-api";

export class TsAppDevStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props);
        // @ts-ignore
        this.service = new LambdaApiDev(this, 'TsAppDevStage');
    }
}


export class TsAppProdStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props);
        // @ts-ignore
        this.service = new LambdaApiDev(this, 'TsAppProdStage');
    }
}