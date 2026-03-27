import { CheckCircle, Clock, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

export function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoading(true);
    setError("");
    try {
      await actor.submitContactMessage(form.name, form.email, form.message);
      setSent(true);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-20">
      {/* Header */}
      <div
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #4E1029 0%, #6B1A3A 100%)",
        }}
      >
        <div className="absolute inset-6 border border-gold/15 pointer-events-none" />
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-gold/50" />
          <p className="font-body text-gold tracking-[0.3em] uppercase text-xs">
            Get in Touch
          </p>
          <div className="h-px w-8 bg-gold/50" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-white">
          Contact Us
        </h1>
      </div>

      <div className="w-full px-6 lg:px-12 xl:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl text-burgundy-deep mb-4">
              We'd love to hear from you
            </h2>
            <p className="font-body text-gray-500 leading-relaxed mb-10">
              Whether you have a question about our pieces, need help with
              sizing, or want to share feedback, our team is always here to
              help.
            </p>
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "nexanouri@gmail.com" },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "London, United Kingdom",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold" size={18} />
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-gray-400">
                      {label}
                    </p>
                    <p className="font-body text-gray-700 font-medium">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-10 p-6 border border-gold/30"
              style={{
                background: "linear-gradient(135deg, #4E1029 0%, #6B1A3A 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-gold" size={18} />
                <h3 className="font-display text-lg text-gold">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-2 font-body text-sm text-white/60">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="text-gold-light">9am – 6pm GMT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gold-light">10am – 4pm GMT</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-gold" />
                </div>
                <h3 className="font-display text-3xl text-burgundy-deep mb-3">
                  Message Sent!
                </h3>
                <p className="font-body text-gray-500">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { key: "name", label: "Your Name", type: "text" },
                  { key: "email", label: "Email Address", type: "email" },
                  { key: "subject", label: "Subject", type: "text" },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      htmlFor={f.key}
                      className="block font-body text-xs uppercase tracking-widest text-burgundy mb-1 font-semibold"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.key}
                      type={f.type}
                      required
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [f.key]: e.target.value }))
                      }
                      className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-burgundy transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-body text-xs uppercase tracking-widest text-burgundy mb-1 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-burgundy transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p className="text-red-500 font-body text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold py-4 tracking-[0.15em] shadow-lg shadow-gold/20"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
