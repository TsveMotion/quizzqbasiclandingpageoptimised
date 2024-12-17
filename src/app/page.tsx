import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const subjects = [
    { name: 'Mathematics', icon: '📐', path: '/subjects/math' },
    { name: 'Science', icon: '🔬', path: '/subjects/science' },
    { name: 'English', icon: '📚', path: '/subjects/english' },
    { name: 'Geography', icon: '🌍', path: '/subjects/geography' },
    { name: 'History', icon: '⏳', path: '/subjects/history' },
    { name: 'Computer Science', icon: '💻', path: '/subjects/computer-science' },
  ];

  const features = [
    {
      title: 'Interactive Learning Quizzes',
      description: 'Engage with our interactive quizzes designed to make learning fun and effective.',
      icon: '🎯',
    },
    {
      title: 'Exam Preparation',
      description: 'Practice with GCSE and SAT prep quizzes to boost your exam performance.',
      icon: '📝',
    },
    {
      title: 'Daily Challenges',
      description: 'Test your knowledge with our daily quiz challenges across various subjects.',
      icon: '🏆',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed performance analytics.',
      icon: '📊',
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Free Interactive Online Quizzes for Students
            </h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed">
              Enhance your learning with our comprehensive collection of educational quizzes in Math, Science, English, and more.
            </p>
            <div className="space-x-6">
              <Link
                href="/register"
                className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Learning Now
              </Link>
              <Link
                href="/about"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">
            Explore Our Subject-Specific Quizzes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <Link
                key={subject.name}
                href={subject.path}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 hover:border-blue-500"
              >
                <div className="text-5xl mb-6">{subject.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{subject.name}</h3>
                <p className="text-gray-600">Practice {subject.name.toLowerCase()} quizzes and improve your knowledge</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-black">
            Why Choose Our Educational Quizzes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Improve Your Grades?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students using our interactive quizzes to enhance their learning experience.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-black text-center">
              The Best Quiz Website for Students
            </h2>
            <div className="space-y-6 text-black">
              <p className="text-lg leading-relaxed">
                Quiz QB offers a comprehensive collection of free online quizzes designed specifically for students. Our platform provides interactive learning experiences across various subjects, including mathematics, science, English grammar, geography, history, and computer science.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're preparing for GCSE exams, SAT tests, or simply want to improve your knowledge, our educational quizzes are tailored to help you succeed. With daily quiz challenges, brain teasers, and subject-specific practice tests, you'll find everything you need to enhance your learning journey.
              </p>
              <p className="text-lg leading-relaxed">
                Our interactive study tools and multiple-choice quizzes make learning engaging and effective. Test your knowledge, track your progress, and improve your grades with Quiz QB's extensive collection of educational resources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
