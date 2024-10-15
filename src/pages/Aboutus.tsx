const AboutUs = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4">
        <h1 className="text-center text-3xl font-bold">About Phonz</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Company Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-7">
            Welcome to <strong>Phonz</strong>, your number one source for the
            latest in mobile phones and accessories. We're dedicated to
            providing you with the best products, with a focus on reliability,
            customer service, and uniqueness.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-7">
            At <strong>Phonz</strong>, our mission is simple: to make shopping
            for phones enjoyable, stress-free, and affordable. We aim to bring
            the newest technology to your hands, keeping you connected with the
            world.
          </p>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              Customer First - We always put our customers at the center of
              everything we do.
            </li>
            <li className="mb-2">
              Innovation - Bringing the latest and best technology.
            </li>
            <li className="mb-2">
              Quality - We ensure the products we sell are durable and reliable.
            </li>
          </ul>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example team member */}
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-lg">Jane Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-lg">John Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-bold text-lg">Emily Stone</h3>
              <p className="text-gray-600">Marketing Head</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4 text-center">
        <p>&copy; 2024 Phonz. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
