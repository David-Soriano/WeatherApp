export function CardDetailClimate({ title, value, unid }) {
    return (
        <div className="rounded-lg border border-neutral-600 bg-neutral-800 p-3 flex flex-col gap-4 text-neutral-0">
            <h6 className="text-lg font-extralight">{title}</h6>
            <p className="text-3xl font-light">{value}{unid}</p>
        </div>
    );
}