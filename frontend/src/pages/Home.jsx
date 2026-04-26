import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
    {/* Hero */}
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        Digital Grievance Redressal System
      </span>
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
        Your Voice, <span className="text-blue-600">Our Priority</span>
      </h1>
      <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
        Submit complaints about public services, track your ticket status, and get timely resolutions — all in one place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition shadow-sm">
          Submit a Grievance
        </Link>
        <Link to="/track"
          className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3 rounded-xl border border-gray-300 transition">
          Track Your Ticket
        </Link>
      </div>
    </div>

    {/* Features */}
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: "📝", title: "Easy Submission", desc: "Submit grievances anonymously or with your account in minutes." },
          { icon: "🔍", title: "Track Status", desc: "Use your unique ticket ID to track progress anytime." },
          { icon: "🔒", title: "Secure & Private", desc: "Your data is safe with us. Submit anonymously without any worry." },
        ].map((f) => (
          <div key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Home;