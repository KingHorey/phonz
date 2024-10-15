import Navbar from "@/layout/Navbar";

const FAQ = () => {
  const faqsList = [
    {
      label: "Payment",
      qas: [
        {
          q: "What payment methods do you accept?",
          a: "We accept major credit cards, PayPal, and several other secure payment methods to ensure a seamless shopping experience.",
        },
        {
          q: "Is it safe to use my credit card on your website?",
          a: "Absolutely! We use SSL encryption to protect your data during transactions, ensuring your information remains secure.",
        },
        {
          q: "Can I change my payment method after placing an order?",
          a: "Unfortunately, once an order is placed, you cannot change the payment method. Please contact our support team for assistance.",
        },
      ],
    },
    {
      label: "Account",
      qas: [
        {
          q: "How do I create an account?",
          a: "To create an account, click on 'Sign Up' on our homepage, fill out the necessary information, and follow the prompts to complete your registration.",
        },
        {
          q: "I forgot my password. How can I reset it?",
          a: "You can reset your password by clicking the 'Forgot Password?' link on the login page and following the instructions sent to your email.",
        },
        {
          q: "How can I update my account information?",
          a: "To update your account information, log in to your account, navigate to 'Account Settings,' and edit the necessary fields.",
        },
      ],
    },
    {
      label: "Shipping",
      qas: [
        {
          q: "What are your shipping options?",
          a: "We offer standard, expedited, and overnight shipping options. You can choose your preferred shipping method during checkout.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to select international locations. Please check our shipping policy for more details on specific countries.",
        },
        {
          q: "How can I track my order?",
          a: "Once your order has shipped, you will receive a tracking number via email to monitor its delivery status.",
        },
      ],
    },
    {
      label: "Returns & Refunds",
      qas: [
        {
          q: "What is your return policy?",
          a: "You can return items within 30 days of receiving your order for a full refund, provided the items are unused and in their original packaging.",
        },
        {
          q: "How do I initiate a return?",
          a: "To initiate a return, please contact our customer service team with your order details, and they will guide you through the process.",
        },
        {
          q: "When can I expect my refund?",
          a: "Refunds are processed within 5-7 business days after we receive your returned item.",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="max-w-lg">
            <h3 className="mt-3 text-gray-800 text-3xl font-extrabold sm:text-4xl">
              Frequently asked questions
            </h3>
            <div className="mt-3 text-gray-600 dark:text-gray-400">
              <p>
                Can’t find the answer you’re looking for? feel free to{" "}
                <a
                  className="text-indigo-600 font-semibold whitespace-nowrap"
                  href="support@floatui.com"
                >
                  contact us
                </a>
                .
              </p>
            </div>
          </div>
          <div className="mt-12 divide-y sm:mt-20">
            {faqsList.map((list, idx) => (
              <div key={idx} className="py-5 gap-x-12 first:pt-0 sm:flex">
                <div className="max-w-sm pt-8 pb-6 sm:pt-0 lg:flex-grow">
                  <h4 className="text-gray-500 font-semibold">{list.label}</h4>
                </div>
                <ul className="flex-1 space-y-6 sm:last:pb-6 sm:space-y-8">
                  {list.qas.map((item, idx) => (
                    <li key={idx}>
                      <summary className="flex items-center justify-between font-semibold text-gray-700">
                        {item.q}
                      </summary>
                      <p
                        dangerouslySetInnerHTML={{ __html: item.a }}
                        className="mt-3 text-gray-600 leading-relaxed"
                      ></p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
