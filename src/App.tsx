import {
    ComponentPropsWithoutRef,
    memo,
    useCallback,
    useId,
    useState,
} from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useCookieData } from "./hooks/useCookieData";

function App() {
    const { retrieveData, saveData } = useCookieData();
    const personalDetailsText = [
        "Family name (as in passport)",
        "Given name 1 (as in passport)",
        "Date of birth",
        "Country of birth",
        "Street Name",
        "Suburb",
        "City",
        "Country",
        "Phone (mobile)",
        "Email address",
    ];
    const personalDetailsOption = [
        "Are you represented by an immigration adviser?",
        "Communication method",
        "Do you have a Visa or MasterCard card available for payment?",
    ];
    const identificationText = [
        "Passport Number",
        "Please re-enter Passport Number",
        "Passport Expiry Date",
    ];

    const handleCopy = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Texto copiado", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, []);

    const saveValue = useCallback((value: string, title: string) => {
        saveData(title, value);
    }, []);

    return (
        <>
            <main className="w-full px-5 py-10 space-y-7">
                <h1 className=" text-xl text-center lg:text-5xl font-bold text-blue-950">
                    Formulário - Colinha working holiday visa
                </h1>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-3"
                >
                    <h2 className="px-5 text-2xl font-bold text-blue-950">
                        *PERSONAL*
                    </h2>
                    {personalDetailsText.map((el, index) => {
                        return (
                            <InputText
                                key={index}
                                label={el}
                                defaultValue={retrieveData(el) ?? ""}
                                onChange={(e) => saveValue(e.target.value, el)}
                                onCopy={() =>
                                    handleCopy(retrieveData(el) ?? "")
                                }
                            />
                        );
                    })}
                    {personalDetailsOption.map((el, index) => {
                        return (
                            <InputOption
                                key={index}
                                label={el}
                                defaultValue={retrieveData(el) ?? ""}
                                onChange={(e) => saveValue(e.target.value, el)}
                                onCopy={() =>
                                    handleCopy(retrieveData(el) ?? "")
                                }
                            />
                        );
                    })}
                    <hr className="border-black border-dashed" />
                    <h2 className="px-5 text-2xl font-bold text-blue-950 uppercase">
                        *Identification*
                    </h2>
                    {identificationText.map((el, index) => {
                        return (
                            <InputText
                                key={index}
                                label={el}
                                defaultValue={retrieveData(el) ?? ""}
                                onChange={(e) => saveValue(e.target.value, el)}
                                onCopy={() =>
                                    handleCopy(retrieveData(el) ?? "")
                                }
                            />
                        );
                    })}
                    <hr className="border-black border-dashed" />
                    <h2 className="px-5 text-2xl font-bold text-blue-950 uppercase">
                        *Second Form of Identification*
                    </h2>
                    <InputOption
                        label="Identification Type"
                        defaultValue={retrieveData("Identification Type") ?? ""}
                        onChange={(e) =>
                            saveValue(e.target.value, "Identification Type")
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData("Identification Type") ?? ""
                            )
                        }
                    />
                    <InputText
                        label="Date Document was Issued"
                        defaultValue={
                            retrieveData("Date Document was Issued") ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Date Document was Issued"
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData("Date Document was Issued") ?? ""
                            )
                        }
                    />
                    <hr className="border-black border-dashed" />
                    <h2 className="px-5 text-2xl font-bold text-blue-950 uppercase">
                        *Occupation details*{" "}
                        <span className="text-red-600">
                            PULAR, NÃO PRECISA PREENCHER
                        </span>
                    </h2>
                    <hr className="border-black border-dashed" />
                    <h2 className="px-5 text-2xl font-bold text-blue-950 uppercase">
                        *Health*{" "}
                        <span className="text-red-600">
                            TUDO NÃO, ÚLTIMA SIM - (selecionar opção)
                        </span>
                    </h2>
                    <hr className="border-black border-dashed" />
                    <h2 className="px-5 text-2xl font-bold text-blue-950 uppercase">
                        *Character*{" "}
                        <span className="text-red-600">
                            TUDO NÃO - (selecionar opção)
                        </span>
                    </h2>
                    <hr className="border-black border-dashed" />
                    <h2 className="px-5 text-2xl font-bold text-blue-950 uppercase">
                        *WHS SPECIFIC*{" "}
                        <span className="text-red-600">
                            -Working Holiday Specific-
                        </span>
                    </h2>
                    <InputOption
                        label="Have you previously been issued a New Zealand Working Holiday Visa?"
                        defaultValue={
                            retrieveData(
                                "Have you previously been issued a New Zealand Working Holiday Visa?"
                            ) ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Have you previously been issued a New Zealand Working Holiday Visa?"
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData(
                                    "Have you previously been issued a New Zealand Working Holiday Visa?"
                                ) ?? ""
                            )
                        }
                    />
                    <InputOption
                        label="Do you have sufficient funds available for your Working Holiday in New Zealand? Check the amount of funds you will need here."
                        defaultValue={
                            retrieveData(
                                "Do you have sufficient funds available for your Working Holiday in New Zealand? Check the amount of funds you will need here."
                            ) ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Do you have sufficient funds available for your Working Holiday in New Zealand? Check the amount of funds you will need here."
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData(
                                    "Do you have sufficient funds available for your Working Holiday in New Zealand? Check the amount of funds you will need here."
                                ) ?? ""
                            )
                        }
                    />
                    <InputText
                        label="Please enter the date you intend to travel to New Zealand"
                        defaultValue={
                            retrieveData(
                                "Please enter the date you intend to travel to New Zealand"
                            ) ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Please enter the date you intend to travel to New Zealand"
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData(
                                    "Please enter the date you intend to travel to New Zealand"
                                ) ?? ""
                            )
                        }
                    />
                    <InputOption
                        label="Have you been to NZ before?"
                        defaultValue={
                            retrieveData("Have you been to NZ before?") ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Have you been to NZ before?"
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData("Have you been to NZ before?") ??
                                    ""
                            )
                        }
                    />
                    <InputOption
                        label="Do you have sufficient funds to purchase an outward ticket when you are due to leave New Zealand?"
                        defaultValue={
                            retrieveData(
                                "Do you have sufficient funds to purchase an outward ticket when you are due to leave New Zealand?"
                            ) ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Do you have sufficient funds to purchase an outward ticket when you are due to leave New Zealand?"
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData(
                                    "Do you have sufficient funds to purchase an outward ticket when you are due to leave New Zealand?"
                                ) ?? ""
                            )
                        }
                    />
                    <InputOption
                        label="Do you meet the specific requirements for the scheme you are applying for?"
                        defaultValue={
                            retrieveData(
                                "Do you meet the specific requirements for the scheme you are applying for?"
                            ) ?? ""
                        }
                        onChange={(e) =>
                            saveValue(
                                e.target.value,
                                "Do you meet the specific requirements for the scheme you are applying for?"
                            )
                        }
                        onCopy={() =>
                            handleCopy(
                                retrieveData(
                                    "Do you meet the specific requirements for the scheme you are applying for?"
                                ) ?? ""
                            )
                        }
                    />
                    <hr className="border-black border-dashed" />
                </form>
            </main>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

type InputTextProps = {
    label: string;
    onCopy: () => void;
} & ComponentPropsWithoutRef<"input">;

const InputText = memo(({ label, onCopy, ...props }: InputTextProps) => {
    const [copy, setCopy] = useState(false);
    const id = useId();
    return (
        <fieldset className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className={`select-none col-span-2 font-semibold text-lg w-fit ${
                    copy ? "text-green-800 bg-green-100 line-through" : "text-blue-950"
                }`}
            >
                {label}
            </label>
            <div className="flex gap-3">
                <input
                    id={id}
                    type="text"
                    placeholder={label}
                    className="border p-2 rounded-lg placeholder:text-sm w-full text-gray-900 font-medium"
                    {...props}
                />
                <button
                    onClick={() => {
                        setCopy((prev) => !prev), onCopy();
                    }}
                    type="button"
                    className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors active:bg-blue-950 text-white font-semibold  w-full max-w-24 md:max-w-40"
                >
                    Copiar
                </button>
            </div>
        </fieldset>
    );
});

const InputOption = memo(({ label, onCopy, ...props }: InputTextProps) => {
    const id = useId();
    return (
        <fieldset className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="select-none col-span-2 font-semibold text-lg text-red-500 underline w-fit"
            >
                *{label}
            </label>
            <div className="flex gap-3">
                <input
                    id={id}
                    type=""
                    placeholder={label}
                    className="border p-2 rounded-lg text-sm w-full text-gray-900 font-medium max-w-64 w-fulll"
                    {...props}
                />
            </div>
        </fieldset>
    );
});
export default App;
