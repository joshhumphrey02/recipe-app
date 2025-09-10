import { Header } from "../shared/header";

export function Hero() {
  return (
    <div
      style={{ backgroundImage: "url(/banner.jpg)" }}
      className="h-96 w-full flex flex-col bg-cover bg-no-repeat"
    >
      <div className="flex-1 flex flex-col bg-black/40 px-4 md:px-8 py-2 md:py-4 gap-4">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-3xl md:text-4xl text-white ">Recipes</h1>
        </div>
      </div>
    </div>
  );
}
