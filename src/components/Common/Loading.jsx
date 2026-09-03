export default function Loading() {
  return (
    <div className="w-full h-screen bg-neo-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4">
          <div className="w-full h-full rounded-full border-4 border-neo-light border-t-neo-primary animate-spin-neo"></div>
        </div>
        <p className="text-neo-dark text-lg font-semibold">Cargando...</p>
        <p className="text-neo-dark text-sm opacity-75 mt-2">Challenge Game</p>
      </div>
    </div>
  );
}
