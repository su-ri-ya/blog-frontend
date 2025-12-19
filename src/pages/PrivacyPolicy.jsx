import Header from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: March 2024</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">Introduction</h2>
            <p>
              Voyager Press ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">Information We Collect</h2>
            <p>
              We may collect personal identification information from users in various ways, including when users visit our site, subscribe to our newsletter, or fill out a form. The information collected may include:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Name and email address</li>
              <li>Browser and device information</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Improving our website and content</li>
              <li>Sending newsletters and updates (with your consent)</li>
              <li>Responding to inquiries and support requests</li>
              <li>Analyzing website usage and trends</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our contact page.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-12 text-center text-sm text-muted-foreground">
          <p>© 2024 Voyager Press. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
