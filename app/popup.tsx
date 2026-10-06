export default function Popup({ question, onClose }: { question: string; onClose: () => void }) {
    return (
        <div className="popup-backdrop fixed inset-0 z-10 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="popup-panel relative flex min-h-[50%] max-h-[50%] min-w-[50%] max-w-[50%] flex-col items-center justify-center border border-blue-700 bg-blue-950 p-8 text-white shadow-2xl shadow-black/60">
                <p className="flex max-w-3xl text-wrap text-center text-5xl font-semibold uppercase leading-tight tracking-wide text-shadow-lg">{question}</p>
                <button className="absolute right-3 top-3 border border-orange-300/30 bg-orange-500 px-3 py-2 text-white transition-colors hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300" onClick={onClose}>X</button>
            </div>
        </div>
    );
}   