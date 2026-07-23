"use client";

import { useState } from "react";
import Image from "next/image";
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
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/Hero/Contact.jpg"
            alt="Contact Mr. Pizza"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gradient)] via-[var(--color-gradient)] to-[var(--color-gradient)]"></div>
        </div>

        <div className="container-padding relative z-10 py-20 lg:py-28 w-full">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-6 block">
              get in touch
            </span>

            <h1 className="font-display text-start text-8xl md:text-9xl md:text-hero-title text-primary-text leading-[0.88] -mt-2">
              LET'S
              <br />
              <span className="text-gold">CONNECT</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-spacing bg-surface">
        <div className="container-padding">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-10">
              <div>
                <h2 className="font-display text-2xl text-primary-text mb-8 uppercase tracking-[1px]">
                  contact information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={item.details}
                      className="flex gap-4 animate-slide-up"
                      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                    >
                        <item.icon className="w-[16px] h-[16px] text-gold mt-1 mr-2" />
                      <div>
                        <p className="font-body text-sm text-primary-text/70">
                          {item.details}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs tracking-[1px] uppercase text-gold hover:text-gold-hover transition-colors inline-block mt-1"
                        >
                          {item.linkText}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-display text-xl text-primary-text mb-5 uppercase tracking-[1px]">
                  opening hours
                </h3>
                <div className="space-y-3">
                  {hours.map((hour, index) => (
                    <div
                      key={hour.days}
                      className="flex justify-between items-center py-3 px-6 bg-surface-elevated border border-border animate-slide-up"
                      style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                    >
                      <span className="font-body text-xs tracking-[1.5px] uppercase text-primary-text">
                        {hour.days}
                      </span>
                      <span className="font-body text-sm text-primary-text/60">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-surface-elevated border border-gold p-8 lg:p-10">
                <h2 className="font-display text-2xl text-primary-text mb-8 uppercase tracking-[1px]">
                  send us a message
                </h2>

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
                    variant="default"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Send Message
                  </Button>

                  <p className="font-body text-xs tracking-[1px] uppercase text-primary-text/50 text-center">
                    By submitting, you agree to our{" "}
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
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-padding text-center">
          <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-6 block">
            prefer to order directly?
          </span>
          <h2 className="font-display text-h2 text-primary-text mb-6 leading-tight">
            skip the form, order via whatsapp
          </h2>
          <p className="font-body text-base text-primary-text/60 mb-10 max-w-xl mx-auto">
            Browse the menu, build your cart, and checkout in under 2 minutes.
            Cash on delivery, no account needed.
          </p>
          <a href="/menu" className="btn-primary inline-flex px-6 py-3">
            Start Your Order
          </a>
        </div>
      </section>
    </div>
  );
}
