"use client"

import { subYears } from "date-fns";
import { use, useEffect, useState } from "react";
import { FaBirthdayCake, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


const Formulaire = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [adult, setAdult] = useState<boolean>(false);

    useEffect(() => {
        if (name && surName && email && adult && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name) && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(surName) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError(false);
        } else {
            setError(true);
        }
    }, [name, email, surName, adult]);

    useEffect(() => {
        if (startDate) {
            const [year, month, day] = startDate.split("-").map((el) => parseInt(el));
            const birthDayDate = new Date(year, month, day);
            const adultDate = subYears(new Date(), 18);
            setAdult(birthDayDate <= adultDate);
        }
    }, [startDate])


    return (
        <div className="flex flex-col gap-2 text-slate-300 lg:w-[800px] md:w-[500px] max-md:w-[90vw]">
            <form autoComplete="off">
                <div className="flex flex-col bg-base-200 rounded-lg shadow-sm p-4 md:p-7 md:px-14 shadow-primary gap-3">
                    <div className="flex flex-col gap-3">
                        {/* Name, DATE, HOURLY */}
                        <div className="flex gap-5 flex-col justify-start bg-base-200 p-4 rounded-lg mb-6 md:mb-11 shadow shadow-primary">
                            <div className="max-md:flex justify-center items-center md:ml-2">
                                <p className="text-sm text-primary">Inscription</p>
                            </div>
                            <div>
                                {/* Name */}
                                <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                    <div className="text-accent"><FaUser size={15} /></div>
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        required={true}
                                        maxLength={25}
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </label>
                                <p className="text-error">
                                    {name && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name) && "Le nom est invalide."}
                                </p>
                            </div>
                            <div>
                                {/* Name */}
                                <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                    <div className="text-accent"><FaUser size={15} /></div>
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        required={true}
                                        maxLength={25}
                                        value={surName}
                                        onChange={(event) => setSurName(event.target.value)}
                                    />
                                </label>
                                <p className="text-error">
                                    {surName && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(surName) && "Le prénom est invalide."}
                                </p>
                            </div>
                            <div>
                                {/* Email */}
                                <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                    <div className="text-accent"><IoMdMail size={15} /></div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required={true}
                                        maxLength={40}
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </label>
                                <p className="text-error">
                                    {email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && "L'email est invalide."}
                                </p>
                            </div>
                            <div>
                                {/* DATE */}
                                <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                    <div className="text-accent"><FaBirthdayCake size={15} /></div>
                                    <input aria-label="Date" type="date" onChange={(event) => setStartDate(event.target.value)} required={true} />
                                </label>
                                <p className="text-error">
                                    {startDate && !adult && "Vous devez être majeur pour vous inscrire."}
                                </p>
                            </div>
                            {/* HOURLY */}
                        </div>
                    </div>
                    <div>
                        <button
                            disabled={error}
                            type="button"
                            className="btn btn-primary w-full"
                            onClick={() => console.log(name, surName, startDate)}
                        >
                            Valider
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Formulaire