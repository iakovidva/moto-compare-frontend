import { z } from "zod";
import { specConfig } from "./specConfig";
import { CategoryEnum, ManufacturerEnum } from "./enums";

const buildZodSchema = (category: keyof typeof specConfig) => {
    return z.object(
        Object.fromEntries(
            specConfig[category as keyof typeof specConfig].map(({ key, type, min, values, required }) => {
                let schema;
                switch (type) {
                    case "number":
                        schema = z.coerce.number();
                        if (min !== undefined) schema = schema.min(min, `${key} must be at least ${min}`);
                        break;
                    case "boolean":
                        schema = z.boolean().default(false);
                        break;
                    case "enum":
                        if (!values) {
                            throw new Error(`Missing values for enum field: ${key}`);
                        }
                        schema = z.enum(values as [string, ...string[]]); // Ensures correct enum typing
                        break;
                    default:
                        schema = z.string();
                        if (required) {
                            schema = schema.nonempty({message: `Cannot be empty! ${key}`});
                        }
                }
                return [key, schema];
            })
        )
    );
};

export const groupedSpecsSchema = z.object(
    Object.fromEntries(Object.keys(specConfig).map(category => [category, buildZodSchema(category as keyof typeof specConfig)]))
);

export const motorcycleSchema = z.object({
  manufacturer: ManufacturerEnum,
  model: z.string().min(1, "Model is required"),
  yearRange: z.string().nonempty({message: "Year cannot be empty"}),
  image: z.string().nonempty({message: "image cannot be empty"}),
  category: CategoryEnum,
  groupedSpecs: groupedSpecsSchema
});

// ✅ Infer TypeScript type from the Zod schema
// export type MotorcycleDetailsModel = z.infer<typeof motorcycleSchema>;