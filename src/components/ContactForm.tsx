"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm uppercase tracking-wider text-white/60">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border-b border-white/20 bg-transparent py-2 text-lg outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm uppercase tracking-wider text-white/60">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-b border-white/20 bg-transparent py-2 text-lg outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm uppercase tracking-wider text-white/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="border-b border-white/20 bg-transparent py-2 text-lg outline-none focus:border-accent"
        />
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
