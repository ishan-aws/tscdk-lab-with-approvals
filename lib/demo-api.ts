import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import * as apigw from '@aws-cdk/aws-apigateway'
import { setFlagsFromString } from 'v8';


export class LambdaApiDev extends cdk.Stack {

    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
    
        const func = new lambda.Function(this, 'TsLambdaDev', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lib/lambda'),
            handler: "hello.handler"
        })

        const api = new apigw.LambdaRestApi(this, "TS-SampleApi-Dev", {
            handler:func,
            deployOptions: {
                stageName: 'v1'
            }
        })
        
        new cdk.CfnOutput(this, "TS-DevFuncArn", {value: func.functionArn});
        new cdk.CfnOutput(this, 'TS-DevApiEndpoint', {value: api.url})
    
      }

}

export class LambdaApiProd extends cdk.Stack {

    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
    
        const func = new lambda.Function(this, 'TsLambdaProd', {
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 1024, // 1GB prod
            code: lambda.Code.fromAsset('lib/lambda'),
            handler: "hello.handler"
        })

        const api = new apigw.LambdaRestApi(this, "TS-SampleApi-Prod", {
            handler:func,
            deployOptions: {
                stageName: 'v1'
            }
        })
        
        new cdk.CfnOutput(this, "TS-ProdFuncArn", {value: func.functionArn});
        new cdk.CfnOutput(this, 'TS-ProdApiEndpoint', {value: api.url})
    
      }

}


