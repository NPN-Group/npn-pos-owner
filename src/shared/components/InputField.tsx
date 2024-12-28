type InputFieldProps = {
    id: string;
    name: string;
    type: string;
    value?: string;
    label: string;
    error: string;
    focused: boolean;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    className?: string;
}

export default function InputField({
    id,
    name,
    type,
    value,
    label,
    error,
    focused,
    onChange,
    onFocus,
    onBlur,
    className,
}: InputFieldProps) {
    const shouldMoveLabel = focused || value !== "";

    return (
        <div className="flex flex-col">
            <div className={`relative ${className}`}>
                <label
                    htmlFor={id}
                    className={`absolute left-4 top-3 transition-all duration-300 ease-in-out ${shouldMoveLabel
                        ? "translate-y-[-2.25rem] translate-x-[-1rem] text-sm opacity-80"
                        : ""
                        }`}
                >
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    className={`w-full py-2 px-4 text-lg placeholder:text-base rounded transition-all duration-300 ease-in-out ${error
                        ? "border-[1px] border-red-500 py-2"
                        : "border-gray-300"
                        }`}
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm max-w-[20rem] w-[95%] mx-auto">{error}</p>
            )}
        </div>
    );
};
