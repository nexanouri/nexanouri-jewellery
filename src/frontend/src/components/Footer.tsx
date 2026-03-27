import { ChevronUp, Heart } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

type Page =
  | "home"
  | "catalogue"
  | "about"
  | "contact"
  | "cart"
  | "checkout"
  | "admin"
  | "product";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const LOGO_SRC =
  "/assets/uploads/1000460224-removebg-preview-019d2bd4-2ec6-729a-bb32-2a4de41f8d52-1.png";

export function Footer({ onNavigate }: FooterProps) {
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !email) return;
    try {
      await actor.subscribeNewsletter(email);
      setSubStatus("success");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const col1 = [
    { label: "About NexaNouri", page: "about" as Page },
    { label: "Careers", page: "about" as Page },
    { label: "Press Releases", page: "about" as Page },
  ];
  const col2 = [
    { label: "Sell on NexaNouri", page: "admin" as Page },
    { label: "Affiliate Program", page: "about" as Page },
    { label: "Advertise Products", page: "about" as Page },
  ];
  const col3 = [
    { label: "NexaNouri Pay", page: "checkout" as Page },
    { label: "Gift Cards", page: "catalogue" as Page },
    { label: "Rewards", page: "about" as Page },
  ];
  const col4 = [
    { label: "Your Account", page: "about" as Page },
    { label: "Your Orders", page: "about" as Page },
    { label: "Returns & Replacements", page: "contact" as Page },
    { label: "Help", page: "contact" as Page },
  ];

  return (
    <footer style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}>
      {/* Back to top */}
      <button
        type="button"
        data-ocid="footer.button"
        className="w-full flex items-center justify-center gap-2 py-3 text-sm text-white font-medium"
        style={{ background: "#37475A" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp size={16} /> Back to top
      </button>

      {/* Main footer */}
      <div style={{ background: "var(--amz-nav)" }}>
        <div className="w-full px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Get to Know Us
              </h4>
              <div className="flex flex-col gap-2">
                {col1.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="text-left text-sm hover:underline"
                    style={{
                      color: "#DDD",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Make Money with Us
              </h4>
              <div className="flex flex-col gap-2">
                {col2.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="text-left text-sm hover:underline"
                    style={{
                      color: "#DDD",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Payment Products
              </h4>
              <div className="flex flex-col gap-2">
                {col3.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="text-left text-sm hover:underline"
                    style={{
                      color: "#DDD",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Col 4 + Newsletter */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Let Us Help You
              </h4>
              <div className="flex flex-col gap-2 mb-6">
                {col4.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="text-left text-sm hover:underline"
                    style={{
                      color: "#DDD",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Newsletter */}
              {subStatus === "success" ? (
                <p
                  className="text-sm"
                  style={{ color: "var(--amz-star)" }}
                  data-ocid="newsletter.success_state"
                >
                  ✓ Subscribed!
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-2"
                  data-ocid="newsletter.panel"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    data-ocid="newsletter.input"
                    className="px-3 py-2 text-sm rounded"
                    style={{
                      background: "white",
                      color: "#111",
                      border: "1px solid #555",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    data-ocid="newsletter.submit_button"
                    className="amz-btn-primary w-full"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: "var(--amz-dark)" }}>
        <div
          className="w-full py-6 flex flex-col items-center gap-3"
          style={{ borderTop: "1px solid #3a4553" }}
        >
          <img
            src={LOGO_SRC}
            alt="NexaNouri"
            className="h-9 w-auto object-contain"
          />

          <div
            className="flex flex-wrap justify-center gap-4 text-xs"
            style={{ color: "#999" }}
          >
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="hover:underline"
              style={{
                color: "#999",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Conditions of Use
            </button>
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="hover:underline"
              style={{
                color: "#999",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Privacy Notice
            </button>
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="hover:underline"
              style={{
                color: "#999",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Interest-Based Ads
            </button>
          </div>

          <p className="text-xs" style={{ color: "#999" }}>
            &copy; {currentYear} NexaNouri.com, Inc. or its affiliates
          </p>

          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "#666" }}
          >
            Built with <Heart size={10} style={{ color: "var(--amz-star)" }} />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--amz-teal)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
