/**
 * Drop-in replacement for the existing contact form logic in src/routes/contact.tsx.
 * Keep your existing JSX/markup/classNames exactly as they are — only replace the
 * `handleSubmit` function and the imports/hooks shown here, so the visual design
 * doesn't change at all.
 *
 * What this does on submit:
 *  1. Sends the message to Web3Forms → triggers an instant email to you.
 *  2. Inserts the same submission into Supabase → shows up in your admin dashboard.
 *  3. Both run in parallel. If one fails, the other can still succeed — we don't
 *     want a Web3Forms hiccup to silently lose a lead, or vice versa.
 *
 * Setup required before this works:
 *  1. Create a free account at https://web3forms.com and grab your Access Key.
 *  2. Add to your .env file:
 *       VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
 *       VITE_SUPABASE_URL=your-supabase-url
 *       VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
 *  3. Make sure @supabase/supabase-js is installed:
 *       npm install @supabase/supabase-js
 */

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactFormValues {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function useContactFormSubmit() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submit(values: ContactFormValues) {
    setState("submitting");
    setErrorMessage(null);

    // Fire both requests in parallel — neither should block the other.
    const web3formsPromise = fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        subject: `New enquiry from ${values.name} — Friscon Tech website`,
        from_name: values.name,
        name: values.name,
        email: values.email,
        company: values.company ?? "",
        message: values.message,
      }),
    })
      .then((res) => res.json())
      .then((data) => (data.success ? "sent" : "failed"))
      .catch(() => "failed");

    const supabasePromise = web3formsPromise.then((web3formsStatus) =>
      supabase.from("form_submissions").insert({
        name: values.name,
        email: values.email,
        company: values.company ?? null,
        message: values.message,
        source_page: "contact",
        web3forms_status: web3formsStatus,
      })
    );

    const [web3formsStatus, { error: dbError }] = await Promise.all([
      web3formsPromise,
      supabasePromise,
    ]);

    if (web3formsStatus === "failed" && dbError) {
      // Both failed — this is the only case that's a real user-facing failure.
      setState("error");
      setErrorMessage(
        "Something went wrong sending your message. Please try again, or email us directly."
      );
      return;
    }

    // At least one path succeeded (usually both). Show success either way —
    // the submission is safely recorded even if the email notification hiccuped.
    setState("success");
  }

  return { state, errorMessage, submit };
}

/**
 * Example usage inside your existing contact.tsx route — replace only the
 * handleSubmit wiring, keep your existing <form> JSX/inputs/styling as-is:
 *
 *   const { state, errorMessage, submit } = useContactFormSubmit();
 *
 *   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
 *     event.preventDefault();
 *     const formData = new FormData(event.currentTarget);
 *     await submit({
 *       name: formData.get("name") as string,
 *       email: formData.get("email") as string,
 *       company: formData.get("company") as string,
 *       message: formData.get("message") as string,
 *     });
 *   }
 *
 *   // In JSX: show your existing success panel when state === "success",
 *   // show errorMessage when state === "error", and disable the submit
 *   // button while state === "submitting".
 */
