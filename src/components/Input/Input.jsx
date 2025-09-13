import { useState } from "react";

export function Input({ type, placeholder, value, onChange, className }) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={`rounded-lg ${className}`} name={type} id={type} />
    );
}