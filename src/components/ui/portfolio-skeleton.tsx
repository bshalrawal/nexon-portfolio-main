import { Skeleton } from './skeleton';

export function PortfolioSkeleton() {
  return (
    <section className="bg-white rounded-[50px] -mt-10 relative z-20 py-28 px-4" id="portfolio">
      <div className="container mx-auto">
        <div className="text-left mb-12 max-w-3xl">
          <Skeleton className="h-16 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-2" />
        </div>

        <div className="w-full">
          <div className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-10">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                  <Skeleton className="h-8 w-3/4 mt-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
         <div className="text-center mt-12">
            <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </div>
    </section>
  );
}
