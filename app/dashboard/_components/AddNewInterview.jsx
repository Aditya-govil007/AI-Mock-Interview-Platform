"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db"; // Ensure you import db here
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Depending on Job Position, Job Description & Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview Questions along with Answers in JSON format. Give Question and Answers as Field in JSON.";

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = await result.response.text();

      // Log the raw response for debugging purposes
      console.log("Raw AI response:", MockJsonResp);

      // Clean and sanitize the JSON response
      // MockJsonResp = MockJsonResp.replace('```json', '')
      //   .replace('```','')
      //   .trim();

      MockJsonResp = MockJsonResp.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

      // Remove markdown code block formatting
      MockJsonResp = MockJsonResp
        .replace(/```json\s*/i, '')
        .replace(/```$/, '')
        .trim();

      // Try to extract valid JSON content from a potentially messy string
      const firstBrace = MockJsonResp.indexOf('{');
      const lastBrace = MockJsonResp.lastIndexOf('}');
      const firstBracket = MockJsonResp.indexOf('[');
      const lastBracket = MockJsonResp.lastIndexOf(']');

      if (firstBracket !== -1 && lastBracket !== -1) {
        MockJsonResp = MockJsonResp.substring(firstBracket, lastBracket + 1);
      } else if (firstBrace !== -1 && lastBrace !== -1) {
        MockJsonResp = MockJsonResp.substring(firstBrace, lastBrace + 1);
      }


      let parsedResponse;
      try {
        parsedResponse = JSON.parse(MockJsonResp);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        console.log("Cleaned AI response:", MockJsonResp.slice(0, 500));
        setLoading(false);
        return; // Exit if the JSON parsing fails
      }

      // Log the parsed questions and answers in a readable format
      console.log("Parsed AI response:");
      console.log("parsedResponse:", parsedResponse);

      if (Array.isArray(parsedResponse)) {
        parsedResponse.forEach(item => {
          console.log(item);
        });
      } else {
        console.error("Unexpected response format:", parsedResponse);
      }


      parsedResponse.forEach((item, index) => {
        console.log(`Q${index + 1}: ${item.Question || item.question}`);
        console.log(`A${index + 1}: ${item.Answer || item.answer}`);
      });

      // Normalize parsedResponse to consistent lowercase keys for storage and UI
      const normalized = parsedResponse.map((item) => ({
        question: item.Question || item.question || '',
        answer: item.Answer || item.answer || '',
        year: item.year || item.Year || null,
        round: item.round || item.Round || '',
        difficulty: item.difficulty || item.Difficulty || '',
        tags: item.tags || item.Tags || [],
        ...Object.keys(item || {}).reduce((acc, key) => {
          const lower = key.toLowerCase();
          if (!['question', 'answer', 'year', 'round', 'difficulty', 'tags'].includes(lower)) acc[lower] = item[key];
          return acc;
        }, {}),
      }));

      setJsonResponse(normalized);

      if (normalized && normalized.length > 0) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(normalized), // Convert to string for storage
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress || "",
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID: ", resp);
        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        console.error("Error: Parsed response is invalid");
      }
    }
    catch (error) {
      console.error("Error in AI response handling:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your Job role/position, Job description
                    and Years of Experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc."
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
