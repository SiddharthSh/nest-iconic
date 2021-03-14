import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface IEnvConfig {
  [key: string]: string;
}

export class ConfigurationService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  public getEnvParams() {
    return this.envConfig;
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public getAsString(key: string): string {
    return String(this.get(key));
  }

  public getAsNumber(key: string): number {
    return Number(this.get(key));
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production'])
        .default('development'),
      PORT: Joi.number().default(3000),
      PRODUCT_SERVER: Joi.string(),
      PRODUCT_URL: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
