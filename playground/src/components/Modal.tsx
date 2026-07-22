import { useEffect, useRef, useState } from "react";

export default function Modal() {
  const [open, setOpen] = useState(false);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else {
      openButtonRef.current?.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
    }

    if (e.key === "Tab") {
      e.preventDefault();
      closeButtonRef.current?.focus();
    }
  };

  return (
    <section className="card">
      <h2>Modal Dialog</h2>

      <button
        ref={openButtonRef}
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      {open && (
        <div className="overlay">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onKeyDown={handleKeyDown}
          >
            <h2 id="modal-title">Settings</h2>

            <p>
              This modal follows keyboard accessibility using
              Escape key and focus management.
            </p>

            <button
              ref={closeButtonRef}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}