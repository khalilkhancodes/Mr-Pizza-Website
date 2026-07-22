"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toaster";
import {
  MapPinIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  SendIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { div } from "framer-motion/client";

const contactInfo = [
  {
    icon: MapPinIcon,
    details: "Narowal, Pakistan",
    link: "https://maps.google.com",
    linkText: "Open in Maps",
  },
  {
    icon: PhoneIcon,
    details: "+92 300 1234567",
    link: "tel:+923001234567",
    linkText: "Call Now",
  },
  {
    icon: EmailIcon,
    details: "info@mrpizza.pk",
    link: "mailto:info@mrpizza.pk",
    linkText: "Send Email",
  },
];

const hours = [
  { days: "Mon - Thu", time: "4:00 PM - 12:00 AM" },
  { days: "Fri - Sat", time: "4:00 PM - 1:00 AM" },
  { days: "Sunday", time: "4:00 PM - 12:00 AM" },
];

export default function ContactPage() {
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to send message");

      setSubmitStatus("success");
      success("Message Sent!", "We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
      error("Failed to Send", "Please try again later or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] lg:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Kitchen_Exterior.png"
            alt="Mr. Pizza restaurant exterior"
            className="w-full h-full object-cover"
          />
          <div className="image-scrim-overlay" />
        </div>

        <div className="container-padding relative z-10 py-16 lg:py-32">
          <div className="max-w-3xl animate-fade-in">
            <span className="font-body label-lg text-gold tracking-widest mb-6 block">
              GET IN TOUCH
            </span>
            <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6">
              Let&apos;s <span className="text-gold">Start a Conversation</span>
            </h1>
            <p className="font-body body-lg text-on-surface-variant">
              Have a question about our menu, a catering inquiry, or just want
              to say hello? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-spacing bg-charcoal">
        <div className="container-padding">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="mt-6">
                <h2 className="font-display text-headline-sm text-cream mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={item.details}
                      className="flex gap-4 animate-slide-up"
                      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                    >
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-charcoal-50 border border-border rounded-soft-sm">
                        <item.icon className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex justify-start flex-col">
                        <p className="font-body text-h5 text-on-surface-variant">
                          {item.details}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-tertiary inline-flex text-h5 pl-0"
                        >
                          {item.linkText}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-display text-headline-sm text-cream mb-4">
                  Opening Hours
                </h3>
                <div className="space-y-3">
                  {hours.map((hour, index) => (
                    <div
                      key={hour.days}
                      className="flex justify-between items-center py-2 px-4 bg-charcoal-50 border border-border rounded-soft-sm animate-slide-up"
                      style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                    >
                      <span className="font-body label-lg text-cream">
                        {hour.days}
                      </span>
                      <span className="font-body body-md text-on-surface-variant">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form — Gold Frame */}
            <div className="lg:col-span-2">
              <div className="card-gold-frame">
                <h2 className="font-display text-headline-lg-mobile lg:text-headline-md text-cream mb-8">
                  Send Us a Message
                </h2>

                {submitStatus === "success" && (
                  <div></div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number (Optional)"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="+92 300 1234567"
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="What's this about?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Textarea
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                  />

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <SendIcon className="w-5 h-5" />
                    Send Message
                  </Button>

                  <p className="font-body label-md text-on-surface-variant/60 text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-gold hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms" className="text-gold hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing bg-background">
        <div className="container-padding text-center">
          <span className="font-body label-lg text-gold tracking-widest mb-4 block">
            PREFER TO ORDER DIRECTLY?
          </span>
          <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6">
            Skip the Form, Order via WhatsApp
          </h2>
          <p className="font-body body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Browse the menu, build your cart, and checkout in under 2 minutes.
            Cash on delivery, no account needed.
          </p>
          <a href="/menu" className="btn-primary inline-flex p-4 px-16">
            Start Your Order
          </a>
        </div>
      </section>
    </div>
  );
}
