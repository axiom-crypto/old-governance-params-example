import Parameters from "@/components/tokenContract/Parameters";
import Title from "@/components/ui/Title";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Success({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  return (
    <>
      <Title>
        Success
      </Title>
      <div className="flex flex-col items-center text-center gap-4">
        <p>
          {"Vote was successful. New parameters:"}
        </p>
        <Parameters />
        <p className="text-sm">
          You may need to hard refresh the page to see updated values.
        </p>
      </div>
    </>
  )
}
