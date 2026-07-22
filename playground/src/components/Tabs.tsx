import { useRef, useState } from "react";

const tabs = [
  {
    id: "general",
    label: "General",
    content: "General settings content",
  },
  {
    id: "profile",
    label: "Profile",
    content: "Profile settings content",
  },
  {
    id: "security",
    label: "Security",
    content: "Security settings content",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (event.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    }

    if (event.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (newIndex !== index) {
      setActiveTab(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <section className="card">
      <h2>Tabs</h2>

      <div role="tablist" aria-label="Settings Tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tabs[activeTab].id}-panel`}
        aria-labelledby={`${tabs[activeTab].id}-tab`}
      >
        <p>{tabs[activeTab].content}</p>
      </div>
    </section>
  );
}