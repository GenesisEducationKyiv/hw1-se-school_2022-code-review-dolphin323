import Ajv from "ajv";
import { FastifySchema } from "fastify";
import { FastifyRouteSchemaDef } from "fastify/types/schema";

function validatorCompiler(
  schemaDefinition: FastifyRouteSchemaDef<FastifySchema>,
  ajv: Ajv
) {
  const { schema } = schemaDefinition;

  const validate = ajv.compile(schema);

  return validate;
}

export { validatorCompiler };
