export function Input({type, placeholder, value, className}){
    return (
        <input type={type} placeholder={placeholder} value={value} className={`rounded-lg ${className}`}/>
    );
}