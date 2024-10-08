"use client"

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaBirthdayCake, FaUser } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

type RegisterFormType = {
    birhday: string;
    postalCode: number;
    name: string;
    surname: string;
    email: string;
}

const Formulaire = () => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [startDate, setStartDate] = useState<any>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormType>();

    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        console.log(data);
    };

    console.log(startDate)

    return (
        <div className="flex flex-col gap-2 text-slate-300 lg:w-[800px] md:w-[500px] max-md:w-[90vw]">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="flex flex-col bg-base-200 rounded-lg shadow-sm p-4 md:p-7 md:px-14 shadow-primary gap-3">
                    <div className="flex flex-col gap-3">
                        {/* TITLE, DATE, HOURLY */}
                        <div className="flex gap-5 flex-col justify-start bg-base-200 p-4 rounded-lg mb-6 md:mb-11 shadow shadow-primary">
                            <div className="max-md:flex justify-center items-center md:ml-2">
                                <p className="text-sm text-primary">Informations générales</p>
                            </div>
                            <div>
                                {/* TITLE */}
                                <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                    <div className="text-accent"><FaUser size={15} /></div>
                                    <input
                                        disabled={submitLoading}
                                        type="text"
                                        placeholder="Titre de l'événement"
                                        {...register("name", {
                                            required: true,
                                            pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
                                            maxLength: 25,
                                        })}
                                    />
                                </label>
                                {errors.name?.type === "pattern" && (
                                    <span className="text-error text-xs">
                                        Le Nom doit être composé de lettres uniquement
                                    </span>
                                )}
                                {errors.name?.type === "required" && (
                                    <span className="text-error text-xs">
                                        Le Nom est obligatoire
                                    </span>
                                )}
                                {errors.name?.type === "maxLength" && (
                                    <span className="text-error text-xs">
                                        Le Nom est trop long
                                    </span>
                                )}
                            </div>
                            <div>
                                {/* DATE */}
                                <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                    <div className="text-accent"><FaBirthdayCake size={15} /></div>
                                    <input aria-label="Date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
                                </label>
                                {errors.birhday?.type === "required" && (
                                    <span className="text-error text-xs">
                                        La date est obligatoire
                                    </span>
                                )}
                            </div>
                            {/* HOURLY */}
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Formulaire