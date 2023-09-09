// envalid will make sure to tell the typescript that the env variable does exits and is not undefined

import { cleanEnv, str } from "envalid";

// This adds a type check to the env variables.
const env = cleanEnv(process.env, {
    PEXELS_API_KEY: str(),
});

export default env;
