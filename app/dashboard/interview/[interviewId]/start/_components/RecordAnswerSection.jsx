'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Log results from speech-to-text
  useEffect(() => {
    console.log('Speech Results:', results);
    results.forEach((result) => {
      setUserAnswer((prev) => prev + result?.transcript + ' ');
    });
  }, [results]);

  // Log userAnswer updates
  useEffect(() => {
    console.log('Current userAnswer:', userAnswer);
    if (!isRecording && userAnswer.trim().length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const extractValidJson = (text) => {
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned);
    } catch {
      try {
        const match = text.match(/{[\s\S]*}/);
        if (match) return JSON.parse(match[0]);
      } catch (err) {
        console.error('Regex-based JSON parse failed:', err);
      }
      return null;
    }
  };

  const StartStopRecording = async () => {
    if (isRecording) {
      console.log('Stopping recording...');
      stopSpeechToText();
    } else {
      console.log('Starting recording...');
      setUserAnswer('');
      setResults([]);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    // Ensure you're extracting the question as a string from the object
    const questionObj = mockInterviewQuestion?.[activeQuestionIndex];

    // Extract question text from multiple possible keys to be resilient to casing
    const questionText = questionObj?.question || questionObj?.Question || '';

    // Ensure questionObj exists and contains the correct properties
    if (!questionObj || !questionText || typeof questionText !== 'string') {
      toast.error('Invalid question format. Cannot save.');
      console.error('Invalid question:', questionObj);
      return;
    }

    const feedbackPrompt = `Question: ${questionText},
    User Answer: ${userAnswer}.
    Based on the question and user answer, provide rating (1–10) and short feedback (3–5 lines) 
    in strict JSON format with fields: "rating" (number) and "feedback" (string).
    Do not include markdown or explanations.`;

    try {
      setLoading(true);
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      console.log('AI Raw Response:', responseText);

      const JsonFeedbackResp = extractValidJson(responseText);

      if (
        !JsonFeedbackResp ||
        typeof JsonFeedbackResp.rating !== 'number' ||
        typeof JsonFeedbackResp.feedback !== 'string'
      ) {
        toast.error('AI returned invalid feedback. Please try again.');
        setLoading(false);
        return;
      }

      const payload = {
        mockIdRef: interviewData?.mockId,
        question: questionText,  // Pass the correct question text here
        correctAns: questionObj?.answer || questionObj?.Answer || '',
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      };

      console.log('Saving Payload:', payload);

      const resp = await db.insert(UserAnswer).values(payload);

      if (resp) {
        toast.success('User answer recorded successfully');
        setUserAnswer('');
        setResults([]);
      } else {
        toast.error('Failed to record answer. Try again.');
      }
    } catch (err) {
      console.error('Final Catch Error:', err);
      toast.error('Error while saving your answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      {/* Webcam Feed */}
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative'>
        <Image
          src={'/webcam.png'}
          width={200}
          height={200}
          className='absolute'
          alt='Webcam Overlay'
        />
        <Webcam
          key={activeQuestionIndex}
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      {/* Live Transcript Display */}
      <div className='mt-5 max-w-xl px-4 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Live Transcript:</h3>
        <p className='text-gray-700 bg-gray-100 p-3 rounded'>{userAnswer || 'No answer yet...'}</p>
      </div>

      {/* Recording Toggle Button */}
      <Button disabled={loading} variant='outline' className='my-10' onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className='text-primary flex gap-2 items-center'>
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;


