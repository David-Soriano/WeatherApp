export function DetailsForecast({ children }) {
    return (
        <section className="text-neutral-0 mt-6">
            <h3 className="mb-4 font-medium">Daily forecast</h3>
            <div className="grid grid-cols-3 gap-4">
                {children}
            </div>
        </section>
    );
}