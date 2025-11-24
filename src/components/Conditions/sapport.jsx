import { Link } from "react-router";

function PrivacyPolicy() {
  return (
    <div className="w-full flex justify-center mt-14 mb-24 px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-lg p-8 relative">

        {/* 🔙 BACK BUTTON */}
        <Link
          to="/signup"
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 
          px-3 py-1.5 rounded-md text-sm font-medium transition"
        >
          ← Back
        </Link>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Cartelo – Privacy Policy
        </h1>

        {/* CONTENT */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Your privacy is important to us. This Privacy Policy explains how Cartelo 
              collects, stores, uses, and protects your personal information.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <p>We may collect the following information:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Name, email, phone number</li>
              <li>Login details (password is encrypted)</li>
              <li>Delivery address and order history</li>
              <li>Device and browser information</li>
              <li>Usage patterns and preferences</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
            <p>Your data is used for:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Creating and managing your account</li>
              <li>Processing orders and payments</li>
              <li>Improving user experience</li>
              <li>Sending notifications & offers</li>
              <li>Enhancing shopping experience</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
            <p>
              Cartelo **never sells your data**.  
              We may share information only with:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Delivery partners</li>
              <li>Payment gateways</li>
              <li>Trusted third-party tools (analytics, security)</li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We use encryption, secure servers, and modern security practices to protect 
              your personal information from unauthorized access.
            </p>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <p>You can request to:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Update or correct your personal details</li>
              <li>Download your stored account data</li>
              <li>Request account deletion</li>
              <li>Opt-out of promotional messages</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Cookies & Tracking</h2>
            <p>
              Cartelo uses cookies to enhance browsing, save preferences, and personalize 
              your shopping experience.
            </p>
          </section>

          {/* SECTION 8 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">8. Changes to Policy</h2>
            <p>
              This Privacy Policy may be updated as needed. Continuing to use Cartelo 
              means you agree to the updated terms.
            </p>
          </section>

          {/* SECTION 9 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <p>
              If you have any questions regarding privacy, email us at:  
              <span className="text-blue-600"> support@cartelo.com</span>
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

export default PrivacyPolicy;
