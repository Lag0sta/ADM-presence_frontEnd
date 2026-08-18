interface props {
    studentFile: any;
    setUpdate: (value: boolean) => void
}
function StudentFile({ studentFile, setUpdate }: props) {

    return (
            <div className="w-full px-3 flex flex-col justify-between">
            <div className="w-full  flex justify-between items-center">
                <span className="text-md font-semibold">Apellido: </span>
                <span className=" text-end pr-2 py-1 my-2 ">
                    {studentFile.apellido}
                </span>
            </div>
            <div className="w-full flex justify-between items-center">
                <span className="text-md font-semibold">Nom: </span>
                <span className="text-end pr-2 py-1 my-2 ">
                    {studentFile.name}
                </span>
            </div>
            <div className="flex flex-col w-full mb-4">    
                    <div className=" items-center flex justify-between my-2">
                        <span className="text-md font-semibold">Catégorie d'age: </span>
                        <span className="text-md pr-2">{studentFile.age_Group}</span>
                    </div>
                </div>
            
                <div className="flex flex-col w-full mb-4">

                    <div className=" items-center flex justify-between my-2">
                        <span className="text-md font-semibold">Type d'abonnement: </span>

                        <span className="text-md pr-2">{studentFile.subscription?.plan}</span>
                    </div>
                    {studentFile.subscription?.plan === "trimestriel" &&
                        <div className=" items-center flex justify-between my-2">
                            <span className="text-md font-semibold">date de fin :</span>
                            <span className="text-md pr-2">{new Date(studentFile?.subscription?.endDate || "")
                                .toLocaleDateString("fr-FR", { timeZone: "UTC" })
                                .replaceAll("/", "-")}</span>
                        </div>
                    }
                    {studentFile.subscription?.plan === "carte" &&
                        <div className=" items-center flex justify-between my-2">
                            <span className="text-md font-semibold">points restants :</span>
                            <span className="text-md pr-2">{studentFile.subscription?.pointsLeft}</span>
                        </div>
                    }
                    <div className=" items-center flex justify-between my-2">
                        <span className="text-md font-semibold">Restant à payer: </span>

                        <span className="text-md pr-2">{studentFile.subscription?.amount2Pay} €</span>
                    </div>
                </div>
            
                <button className="bg-gray-900 text-[#FFCB00] rounded-full py-1 px-2 ml-2 hover:bg-gray-800 hover:text-[#FFCB00] transition-colors duration-300 disabled:bg-[#FFCB00] disabled:text-gray-500 disabled:border-2 disabled:border-white "
                    onClick={() => setUpdate(true)}
                >modifier</button>   
            </div>
    )
}

export default StudentFile
