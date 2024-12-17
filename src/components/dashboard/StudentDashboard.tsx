'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submitted: boolean;
}

interface Quiz {
  id: string;
  title: string;
  attempts: number;
  bestScore: number;
}

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // TODO: Fetch real data from API
  useEffect(() => {
    // Simulated data for now
    setAssignments([
      {
        id: '1',
        title: 'Basic Programming Concepts',
        dueDate: '2024-01-01',
        submitted: false,
      },
      {
        id: '2',
        title: 'Variables and Data Types',
        dueDate: '2024-01-15',
        submitted: true,
      },
    ]);

    setQuizzes([
      {
        id: '1',
        title: 'Introduction to QB',
        attempts: 2,
        bestScore: 85,
      },
      {
        id: '2',
        title: 'Basic Syntax',
        attempts: 1,
        bestScore: 90,
      },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Assignments Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Assignments</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900">{assignment.title}</h3>
              <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
              <div className="mt-2">
                {assignment.submitted ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Submitted
                  </span>
                ) : (
                  <Link
                    href={`/assignments/${assignment.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Start Assignment
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quizzes Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Quizzes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900">{quiz.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  Attempts: {quiz.attempts}
                </p>
                <p className="text-sm text-gray-500">
                  Best Score: {quiz.bestScore}%
                </p>
              </div>
              <div className="mt-3">
                <Link
                  href={`/quizzes/${quiz.id}`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Take Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
