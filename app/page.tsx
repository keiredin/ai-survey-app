// import { Button } from "@/components/ui/button";

// const HomePage = () => {
//   return <Button>Button</Button>;
// };

// export default HomePage;

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
  answers?: string[];
};

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [surveyId, setSurveyId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const generateQuestions = async (data: FormData) => {
    setLoading(true); // Start loading
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.title }),
      });
      const { title: surveyTitle, questions, surveyId } = await res.json();
      setTitle(surveyTitle);
      setQuestions(questions);
      setSurveyId(surveyId);
      setSubmitted(false);
      toast("Questions generated successfully!", {
        dismissible: true,
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // const submitAnswers = async (data: FormData) => {
  //   await fetch("/api/submit-response", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       surveyId,
  //       answers: data.answers,
  //     }),
  //   });
  //   setSubmitted(true);
  //   reset();
  //   setQuestions([]);
  // };

  const submitAnswers = async (data: FormData) => {
    setLoading(true); // Start loading
    try {
      await fetch("/api/submit-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId,
          answers: data.answers,
        }),
      });
      setSubmitted(true);
      reset();
      setQuestions([]);
      setTitle("");
      toast("Survey responses submitted successfully!", {
        dismissible: true,
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to submit answers. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="  flex items-center justify-center p-4">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Survey Generator
        </h1>

        {!questions || !questions.length ? (
          <form
            onSubmit={handleSubmit(generateQuestions)}
            className="space-y-4"
          >
            <div>
              <input
                {...register("title", { required: true })}
                placeholder="Enter survey title"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 "
              />
            </div>
            {/* <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Generate Questions
            </button> */}

            <Button
              type="submit"
              className="w-full"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Generating..." : "Generate Questions"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(submitAnswers)} className="space-y-4">
            <h2 className="text-xl font-semibold">{`Here are five engaging questions for a survey based on the topic " ${title} "`}</h2>
            {questions.map((q, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700">
                  {q}
                </label>
                <input
                  {...register(`answers.${i}`, { required: true })}
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2"
                />
              </div>
            ))}
            {/* <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
            >
              Submit Answers
            </button> */}

            <Button
              type="submit"
              className="w-full"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Submitting..." : "Submit Answers"}
            </Button>
          </form>
        )}

        {/* {submitted && (
          <p className="mt-4 text-green-600 text-center animate-fade-in">
            Survey responses submitted successfully!
          </p>
        )} */}
      </div>
    </div>
  );
}
