import * as aws from "@pulumi/aws";
import { z } from "zod";

type LambdaInput = {
    message: string,
}

// @ts-ignore
const getSchemaValidator = (): z.ZodSchema<LambdaInput> => z.object({
    message: z.string(),
});

const lambda = new aws.lambda.CallbackFunction<
    LambdaInput,
    void>("BROKEN_LAMBDA", {
        runtime: "nodejs14.x",
        callback: async (input) => {
            const payload = getSchemaValidator().parse(input);
            console.log(payload.message);
        },
    });

export const lambdaArn = lambda.arn;