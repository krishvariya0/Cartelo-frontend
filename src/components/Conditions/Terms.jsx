import { Link } from "react-router";

function TermsOfUse() {
  return (
    <div className="w-full flex justify-center mt-14 mb-24 px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-lg p-8 relative">

        {/* 🔙 TOP BACK BUTTON */}
        <Link
          to="/signup"
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 
          px-3 py-1.5 rounded-md text-sm font-medium transition"
        >
          ← Back
        </Link>

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Cartelo – Terms of Use
        </h1>

        {/* CONTENT */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By using Cartelo, you agree to follow all terms listed here. If you do
              not accept these terms, please stop using the platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
            <p>
              Provide accurate information, avoid fraud, and use Cartelo only for
              legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Account & Security</h2>
            <p>
              You are responsible for everything done using your account. Notify us if
              there is suspicious activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Product Information</h2>
            <p>
              While we try to maintain accuracy, product details may sometimes vary due
              to technical or stock issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Orders & Payments</h2>
            <p>
              You agree that the information you provide while ordering is correct and
              that payment is valid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Prohibited Activities</h2>
            <p>
              Fraud, hacking, or misuse of Cartelo services is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Privacy Protection</h2>
            <p>
              Your data is protected as per our{" "}
              <span className="text-blue-600 cursor-pointer"> <Link to="/privacypolicy">  Privacy Policy </Link> </span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
            <p>
              Cartelo is not responsible for losses caused by technical issues, delays,
              or errors beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Updating Terms</h2>
            <p>
              These terms may be updated anytime. Continued usage means you agree to
              the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p>
              For support email:{" "}
              <span className="text-blue-600">support@cartelo.com</span>
            </p>
          </section>
        </div>

        {/* BOTTOM BACK BUTTON */}
        <div className="text-center mt-10">
          <Link
            to="/signup"
            className="inline-block bg-gray-700 text-white px-6 py-3 rounded-md 
            text-sm font-medium hover:bg-gray-600 transition"
          >
            Go Back to Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default TermsOfUse;
