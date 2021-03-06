import {
  Dictionary,
  FieldConfig,
  SimpleValidator,
  SimpleValidatorConfig,
  ValidatorContext
} from "calidation";
import { KLAGE_TYPE } from "../types/serviceklage";
import { vars } from "../Config";

/*
  Form validators
 */

export type ExtraFieldsConfig = Dictionary<FieldConfig & ExtraFieldConfig>;
export interface ExtraFieldConfig {
  isValidTidsrom?: SimpleValidator;
  isValidFeiltyper?: SimpleValidator;
  isValidMelding?: SimpleValidator;
}

export const extraValidators: Validators = {
  isValidTidsrom: (config: SimpleValidatorConfig) => (value: {
    FORMIDDAG: boolean;
    ETTERMIDDAG: boolean;
  }) => (!(value.FORMIDDAG || value.ETTERMIDDAG) ? config.message : null),

  isValidFeiltyper: (config: SimpleValidatorConfig) => (value: KLAGE_TYPE[]) =>
    !value.length ? config.message : null,

  isValidMelding: (config: SimpleValidatorConfig) => (value: string) =>
    value.length > vars.maksLengdeMelding ? config.message : null
};

export const sjekkForFeil = (submitted: boolean, error: string | null) =>
  submitted && error ? error : undefined;

/*
  Overridden types
 */

export type SimpleValidators = Dictionary<
  (config: SimpleValidatorConfig) => (value: any) => string | null
>;

export interface CustomValidator {
  message: (values: object) => string;
  validateIf?: ((context: ValidatorContext) => boolean) | boolean;
}

export type Validators = Dictionary<
  (
    config: SimpleValidatorConfig & CustomValidator,
    context: ValidatorContext
  ) => (value: any) => string | null
>;
