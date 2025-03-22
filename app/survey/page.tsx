// app/survey/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Survey = {
  id: string;
  title: string;
  hasResponses: boolean;
};

const SurveysPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // if (status === "loading") return; // Wait for session to load
    // if (!session) {
    //   router.push("/signin"); // Redirect if not authenticated
    //   return;
    // }

    const fetchSurveys = async () => {
      try {
        const res = await fetch("/api/surveys", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch surveys");
        }

        const data = await res.json();
        if (!Array.isArray(data.surveys)) {
          throw new Error("Invalid response format");
        }

        setSurveys(data.surveys);
      } catch (err) {
        setError(err.message || "An error occurred while fetching surveys");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [session, status, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
          <Button asChild className="mt-6 w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Your Surveys</h1>
        {surveys.length === 0 ? (
          <p className="text-gray-500">You haven’t created any surveys yet.</p>
        ) : (
          <ul className="space-y-4">
            {surveys.map((survey) => (
              <li key={survey.id} className="flex items-center justify-between">
                <Link
                  href={`/survey/${survey.id}`}
                  className="text-blue-500 hover:underline text-xl font-bold mb-4 text-center cursor-pointer"
                >
                  {survey.title}
                </Link>
                {survey.hasResponses ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </li>
            ))}
          </ul>
        )}
        <Button asChild className="mt-6 w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default SurveysPage;
