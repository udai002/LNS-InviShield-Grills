interface ICustomInput{
    title:string , 
    type:"text" | "password" | "email",
    icon?:React.ReactNode ;
    value?:string ;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomInput({title , type , icon , value , onChange}:ICustomInput){
    return (
      <div className="flex items-center gap-2 bg-gray-100 px-4  rounded-lg border border-gray-300 focus-within:border-black transition-colors mt-5">
        {icon && <span className="text-gray-600">{icon}</span>}
        <input
          type={type}
          placeholder={title}
          value={value}
          onChange={onChange}
          className="bg-transparent outline-none text-black placeholder-gray-500 flex-1 py-4"
        />
      </div>
    );
}
