import { prisma } from "@/db/prisma";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";


export default async function SurveyDetailPage(props: {
  params: Promise<{ surveyId: string }>;
}) {
  const params = await props.params;
  const { surveyId } = params;

  const survey = await prisma.survey.findUnique({
    where: { id: surveyId },
    include: {
      responses: {
        select: { answers: true },
      },
    },
  });

  if (!survey) {
    return notFound();
  }

  const hasResponses = survey.responses.length > 0;
  const firstResponse = hasResponses ? survey.responses[0] : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{survey.title}</h1>
        <div className="space-y-6">
          {survey.questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-lg font-semibold">
                {index + 1}. {question}
              </h2>
              {hasResponses && firstResponse ? (
                <p className="text-gray-700">
                  Response:{" "}
                  {firstResponse.answers[index] || "No answer provided"}
                </p>
              ) : (
                <p className="text-gray-500 italic">No responses yet</p>
              )}
            </div>
          ))}
        </div>
        <Button asChild className="mt-6 w-full">
          <Link href="/survey">Back to Surveys</Link>
        </Button>
      </div>
    </div>
  );
}
