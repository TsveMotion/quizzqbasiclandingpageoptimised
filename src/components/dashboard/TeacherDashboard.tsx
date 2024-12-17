'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Assignment {
  id: string;
  title: string;
  submissionsCount: number;
  pendingGrading: number;
}

interface Quiz {
  id: string;
  title: string;
  totalAttempts: number;
  averageScore: number;
}

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  // TODO: Fetch real data from API
  useEffect(() => {
    setAssignments([
      {
        id: '1',
        title: 'Basic Programming Concepts',
        submissionsCount: 15,
        pendingGrading: 5,
      },
      {
        id: '2',
        title: 'Variables and Data Types',
        submissionsCount: 12,
        pendingGrading: 3,
      },
    ]);

    setQuizzes([
      {
        id: '1',
        title: 'Introduction to QB',
        totalAttempts: 45,
        averageScore: 82,
      },
      {
        id: '2',
        title: 'Basic Syntax',
        totalAttempts: 38,
        averageScore: 88,
      },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <section className="flex gap-4">
        <Link
          href="/assignments/create"
          className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg text-center hover:bg-indigo-700 transition-colors"
        >
          Create Assignment
        </Link>
        <Link
          href="/quizzes/create"
          className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg text-center hover:bg-indigo-700 transition-colors"
        >
          Create Quiz
        </Link>
      </section>

      {/* Assignments Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignments Overview</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900">{assignment.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  Total Submissions: {assignment.submissionsCount}
                </p>
                <p className="text-sm text-gray-500">
                  Pending Grading: {assignment.pendingGrading}
                </p>
              </div>
              <div className="mt-3">
                <Link
                  href={`/assignments/${assignment.id}/grade`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Grade Submissions
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quizzes Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quizzes Overview</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900">{quiz.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">
                  Total Attempts: {quiz.totalAttempts}
                </p>
                <p className="text-sm text-gray-500">
                  Average Score: {quiz.averageScore}%
                </p>
              </div>
              <div className="mt-3">
                <Link
                  href={`/quizzes/${quiz.id}/results`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  View Results
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
