export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 pb-40">
      <div className="container mx-auto">
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Movies
          </h1>
        </div>

        <div className="mt-10">
          <div className="col-span-10">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
              {[...Array(25)].map((_, index) => (
                <li key={index}>
                  <div className="aspect-[2/3] w-full animate-pulse overflow-hidden rounded-md bg-gray-200">
                    <div className="h-full w-full bg-gray-300" />
                  </div>
                  <h3 className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                    <div className="h-4 w-1/2 bg-gray-300" />
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <div className="h-3 w-1/4 bg-gray-300" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
