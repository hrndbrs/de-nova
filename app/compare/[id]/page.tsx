import { Navigation } from "@/components/navigation";
import { BarChartCompare } from "@/components/bar-chart-generic";
import { getTestResult } from "@/lib/actions/test-action";
import { base64url } from "@/lib/helpers/string";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

type Person = {
  id: string;
  name: string;
};

export default async function ComparePage({ params }: Props) {
  const { id } = await params;
  const people: Person[] = base64url.decode(id);
  const reports = await Promise.all(
    people.map(async (person) => {
      const report = await getTestResult(person.id);
      if (!report) throw new Error("No report found");
      return {
        name: person.name,
        report,
      };
    }),
  );

  const categories = reports[0].report.results.map((result) => result.title);

  const series = reports.map(({ name, report }) => {
    return {
      name,
      data: report.results.map((result) => result.score),
    };
  });
  const getNamedFacets = (domain: string) =>
    reports.map((report) => {
      const domainResult = report.report.results.find(
        (result) => result.domain === domain,
      );
      return {
        name: report.name,
        facets: domainResult?.facets,
      };
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container-responsive py-8 lg:py-16 space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Overview
        </h1>

        <BarChartCompare max={120} categories={categories} series={series} />
        {reports[0].report.results.map((domain) => (
          <div className="mt-5">
            <Link href={`#${domain.title}`}>
              <h2
                className="text-3xl lg:text-4xl font-bold text-foreground"
                id={domain.title}
              >
                {domain.title}
              </h2>
            </Link>
            <div className="mt-3">{domain.shortDescription}</div>
            <div>
              <BarChartCompare
                max={20}
                categories={categories}
                // @ts-ignore
                series={getNamedFacets(domain.domain).map((d) => ({
                  name: d.name,
                  data: d.facets?.map((f) => f.score),
                }))}
              />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
