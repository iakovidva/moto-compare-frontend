"use client"

import { motorcycleSchema } from "@/constants/motorcycleSchema";
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";
import { z } from "zod";
import { FieldConfig, specConfig } from "@/constants/specConfig";
import { CategoryEnum, ManufacturerEnum } from "@/constants/enums";
import { createMotorcycleRequest } from "@/lib/MotorcycleApi";

type FormSchema = z.infer<typeof motorcycleSchema>;

export default function CreateMotorcyclePage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(motorcycleSchema),
        defaultValues: {
            image: '/images/motorcycles/default.avif',
        }
    });

    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        console.log('Form data submitted:', data);
        createMotorcycleRequest(data);
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log('Form errors:', errors);
            console.log(errors.groupedSpecs);
        }
    }, [errors]);


    return (
        <div className="container mx-auto p-8">

            {/* Modal Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col items-center">
                    <InputBasicInformation register={register} errors={errors} />
                </div>
                <div className="columns-2 space-y-6">
                    {Object.entries(specConfig).map(([category, fields]) => (
                        <InputSpec
                            key={category}
                            category={category}
                            fields={fields as FieldConfig[]}
                            register={register}
                            errors={errors.groupedSpecs?.[category]}
                        />
                    ))}
                </div>
                <div className="text-center">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

type InputSpecProps = {
    category: string,
    fields: FieldConfig[],
    register: UseFormRegister<FormSchema>,
    errors: any,
};

const InputSpec = ({ category, fields, register, errors }: InputSpecProps) => (
    <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden">
        <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white">
            <h2 className="text-lg font-semibold">{category}</h2>
        </div>

        <div className="p-4">
            <ul className="space-y-2">
                {fields.map(({ key, label, type, values }) => (
                    <li key={label} className="flex flex-col border-b pb-2">

                        <div key={key}>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-700">{label}</span>
                            </div>
                            {type === "enum" ? (
                                <select {...register(`groupedSpecs.${category}.${key}`)}>
                                    {values?.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input className="mt-1 w-full border rounded px-2 py-1 bg-gray-100"
                                    {...register(`groupedSpecs.${category}.${key}`)}
                                    type={type === "boolean" ? "checkbox" : type} />
                            )}
                            {errors?.[key] && <p className="text-red-500">{errors[key].message}</p>}
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    </div>
);

// TODO REFACTOR THAT !!!!!!! VAIAK sotos
const InputBasicInformation = ({ register, errors }: { register: UseFormRegister<FormSchema>, errors: any }) => {
    return (
        <>
            <p>Basic information</p>
            <label>manufacturer</label>
            <select {...register("manufacturer")}>
                {ManufacturerEnum.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            <label>model</label>
            <input {...register("model")} />
            {errors?.["model"] && <p className="text-red-500">{errors["model"].message}</p>}

            <label>yearRange</label>
            <input {...register("yearRange")} />
            {errors?.["yearRange"] && <p className="text-red-500">{errors["yearRange"].message}</p>}

            <label>image</label>
            <input {...register("image")} />
            {errors?.["image"] && <p className="text-red-500">{errors["image"].message}</p>}

            <label>category</label>
            <select {...register("category")}>
                {CategoryEnum.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </>
    );
}