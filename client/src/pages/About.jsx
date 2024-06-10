import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.subject) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message) {
      errors.message = 'Message is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      // Simulate form submission (replace this with actual form submission logic)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000);
    }
  };

  return (

    <div className="container mx-auto px-6 py-16">

      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">About Us</h1>
        <p className="text-xl text-gray-600">Connecting you with the perfect properties</p>
        <div className="mt-6">
          <img src="image/4.jpg" alt="Estate Marketplace" className="mx-auto rounded-lg shadow-lg max-w-full h-auto" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At Estate Marketplace, our mission is to connect buyers and sellers in the real estate market with ease and efficiency. We aim to provide a seamless and transparent platform for all your real estate needs.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Our Team</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Our team consists of experienced real estate professionals, tech enthusiasts, and customer service experts. We work together to ensure that you have the best experience whether you're buying, selling, or renting properties.
        </p>
        <div className="flex flex-wrap justify-center space-x-4">
          <div className="w-48 h-48 mb-4">
            <img src="image/avatar2.jpeg" alt="Team Member 1" className="w-full h-full object-cover rounded-full shadow-lg" />
            <p className="text-center mt-2">Muhamyman ALI</p>
            <p className="text-center text-gray-600">CEO</p>
          </div>
          <div className="w-48 h-48 mb-4">
            <img src="image/2.jpg" alt="Team Member 2" className="w-full h-full  object-cover rounded-full shadow-lg" />
            <p className="text-center mt-2">Ans ILyas</p>
            <p className="text-center text-gray-600">CTO</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

       {/* Values Section */}
       <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Our Values</h2>
        <ul className="list-none space-y-4">
          <li className="bg-gray-100 p-6 border-l-4 border-blue-500 shadow-md">
            <strong className="text-blue-500">Trust:</strong> Building trust with our clients through transparent and reliable services.
          </li>
          <li className="bg-gray-100 p-6 border-l-4 border-blue-500 shadow-md">
            <strong className="text-blue-500">Innovation:</strong> Continuously innovating to provide the best real estate solutions.
          </li>
          <li className="bg-gray-100 p-6 border-l-4 border-blue-500 shadow-md">
            <strong className="text-blue-500">Excellence:</strong> Striving for excellence in every interaction and transaction.
          </li>
          <li className="bg-gray-100 p-6 border-l-4 border-blue-500 shadow-md">
            <strong className="text-blue-500">Community:</strong> Supporting and giving back to the communities we serve.
          </li>
        </ul>
      </section>

      {/* History Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Our History</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Since our founding in 20XX, Estate Marketplace has grown from a small startup to a trusted platform in the real estate industry. We are proud of our journey and remain committed to our core values and mission.
        </p>
        </section>

         {/* ------------------------------------------------------------------- */}
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">Contact Us</h1>
        <p className="text-xl text-gray-600">We'd love to hear from you! Reach out to us with any questions or feedback.</p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-4xl mx-auto mb-16">
        {isSubmitted ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your message has been sent successfully.</span>
          </div>
        ) : (
          <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formErrors.name && 'border-red-500'
                }`}
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && <p className="text-red-500 text-xs italic">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formErrors.email && 'border-red-500'
                }`}
                id="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formErrors.subject && 'border-red-500'
                }`}
                id="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
              {formErrors.subject && <p className="text-red-500 text-xs italic">{formErrors.subject}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  formErrors.message && 'border-red-500'
                }`}
                id="message"
                rows="5"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-xs italic">{formErrors.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Contact Information Section */}
      <section className="text-center">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Our Contact Information</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          If you prefer to reach us directly, here are our contact details:
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Email:</strong> <a href="mailto:ansilyas000@gmail.com" className="text-blue-500 hover:underline">ansilyas000@gmail.com</a>
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Address:</strong> 123 Real Estate Ave, Property City, PC 12345
        </p>
      </section>
    </div>
  );
}

export default ContactUs;