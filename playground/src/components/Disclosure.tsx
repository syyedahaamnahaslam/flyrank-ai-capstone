import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="component">
      <h2>Disclosure</h2>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
      >
        {isOpen ? "Hide Details" : "Show Details"}
      </button>

      {isOpen && (
        <div id="disclosure-content">
          <p>
            This disclosure component was built using React + TypeScript.
          </p>
        </div>
      )}
    </section>
  );
}