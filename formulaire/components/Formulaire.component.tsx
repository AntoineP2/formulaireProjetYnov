"use client"

import { subYears } from "date-fns";
import { useEffect, useState } from "react";
import { FaBirthdayCake, FaUser } from "react-icons/fa";
import { IoMdHome, IoMdMail, IoMdPin } from "react-icons/io";
import { toast } from "sonner";


const Formulaire = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [surName, setSurName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [adresse, setAdresse] = useState<string>("");
    const [codePostal, setCodePostal] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [adult, setAdult] = useState<boolean>(true);

    useEffect(() => {
        if (name && adresse && codePostal && surName && email && adult && startDate && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name) && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(surName) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setError(false);
        } else {
            setError(true);
        }
    }, [name, email, surName, adult, adresse, codePostal, startDate]);

    useEffect(() => {
        if (startDate) {
            const [year, month, day] = startDate.split("-").map((el) => parseInt(el));
            const birthDayDate = new Date(year, month, day);
            const adultDate = subYears(new Date(), 18);
            setAdult(birthDayDate <= adultDate);
        }
    }, [startDate])

    const handleSubmit = () => {
        toast.success("Inscription réussie !")
        setName("");
        setEmail("");
        setSurName("");
        setStartDate("");
        setAdresse("");
        setCodePostal("");
    }


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
                            {/* Adresse */}
                            <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                <div className="text-accent"><IoMdHome size={15} /></div>
                                <input
                                    type="text"
                                    placeholder="Adresse"
                                    required={true}
                                    maxLength={100}
                                    value={adresse}
                                    onChange={(event) => setAdresse(event.target.value)}
                                />
                            </label>

                            {/* Code Postal */}
                            <label className="input input-bordered input-sm input-primary bg-base-300 flex items-center gap-2">
                                <div className="text-accent"><IoMdPin size={15} /></div>
                                <input
                                    type="text"
                                    placeholder="Code postal"
                                    required={true}
                                    maxLength={5}
                                    pattern="\d{5}"
                                    title="Le code postal doit être composé de 5 chiffres"
                                    value={codePostal}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        if (/^\d{0,5}$/.test(value)) { // Permet uniquement les chiffres et un max de 5 caractères
                                            setCodePostal(value);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            disabled={error}
                            type="button"
                            className="btn btn-primary w-full"
                            onClick={handleSubmit}
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