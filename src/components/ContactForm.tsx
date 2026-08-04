"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { status: "idle" };

type ContactFormProps = {
  theme?: "dark" | "light";
};

export function ContactForm({ theme = "dark" }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );
  const light = theme === "light";
  const labelClass = `text-sm uppercase tracking-wider ${
    light ? "text-black/60" : "text-white/60"
  }`;
  const fieldClass = `bg-transparent py-2 text-lg outline-none focus:border-accent ${
    light ? "border-b border-black/20" : "border-b border-white/20"
  }`;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={fieldClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={fieldClass} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit bg-accent px-8 py-3 font-display text-xl uppercase tracking-wide text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send"}
      </button>

      {state.status === "success" && (
        <p className="text-accent">{state.message}</p>
      )}
      {state.status === "error" && (
        <p className="text-red-400">{state.message}</p>
      )}
    </form>
  );
}
